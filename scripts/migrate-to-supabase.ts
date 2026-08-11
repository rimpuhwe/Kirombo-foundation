/**
 * One-off migration: old Railway/Postgres `Post` table -> Supabase `articles` table.
 *
 * Run this once, locally, AFTER `supabase/schema.sql` has been applied to the
 * new Supabase project and at least one row exists in `profiles` (see
 * README.md for how to create the first admin/writer).
 *
 * Required env vars:
 *   OLD_DATABASE_URL          - connection string for the existing Postgres DB (Railway)
 *   SUPABASE_URL               - new Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY  - service role key (bypasses RLS for this script
 *                                 only — this key must never be committed or
 *                                 shipped to the frontend)
 *   MIGRATION_AUTHOR_ID        - profiles.id to attribute migrated articles to
 *
 * Usage (values kept in a local, gitignored .env.migration file):
 *   npx tsx --env-file=.env.migration scripts/migrate-to-supabase.ts
 */
import { Client } from "pg";
import { createClient } from "@supabase/supabase-js";
import { JSDOM } from "jsdom";
import { createHeadlessEditor } from "@lexical/headless";
import { $generateNodesFromDOM } from "@lexical/html";
import { $getRoot, $insertNodes } from "lexical";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { ImageNode } from "../src/components/editor/nodes/ImageNode";

const OLD_DATABASE_URL = process.env.OLD_DATABASE_URL;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const MIGRATION_AUTHOR_ID = process.env.MIGRATION_AUTHOR_ID;

if (!OLD_DATABASE_URL || !SUPABASE_URL || !SERVICE_ROLE_KEY || !MIGRATION_AUTHOR_ID) {
  console.error(
    "Missing required env vars. Set OLD_DATABASE_URL, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and MIGRATION_AUTHOR_ID " +
      "(a row in `profiles` to attribute migrated articles to)."
  );
  process.exit(1);
}

interface OldPost {
  id: string;
  title: string;
  description: string;
  content: string;
  coverImage: string | null;
  category: string | null;
  status: "DRAFT" | "PUBLISHED";
  views: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractInlineImages(html: string): string[] {
  const matches = [...html.matchAll(/<img[^>]+src=["']([^"'>]+)["']/gi)];
  return [...new Set(matches.map((m) => m[1]))];
}

function htmlToLexicalJson(editor: ReturnType<typeof createHeadlessEditor>, html: string): unknown {
  const dom = new JSDOM(html || "<p></p>");
  editor.update(
    () => {
      const nodes = $generateNodesFromDOM(editor, dom.window.document as unknown as Document);
      const root = $getRoot();
      root.clear();
      root.select();
      $insertNodes(nodes);
    },
    { discrete: true }
  );
  return editor.getEditorState().toJSON();
}

async function main() {
  const pgClient = new Client({ connectionString: OLD_DATABASE_URL });
  await pgClient.connect();

  const supabase = createClient(SUPABASE_URL!, SERVICE_ROLE_KEY!);

  const editor = createHeadlessEditor({
    namespace: "Migration",
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, AutoLinkNode, ImageNode, HorizontalRuleNode],
    onError: (error) => console.error(error),
  });

  const { data: existing, error: existingError } = await supabase.from("articles").select("slug");
  if (existingError) throw existingError;
  const usedSlugs = new Set<string>((existing ?? []).map((row: { slug: string }) => row.slug));

  const { rows } = await pgClient.query<OldPost>(`SELECT * FROM "Post" ORDER BY "createdAt" ASC`);
  console.log(`Found ${rows.length} posts in the old database.`);

  let migrated = 0;
  let failed = 0;

  for (const post of rows) {
    try {
      const base = generateSlug(post.title) || post.id;
      let slug = base;
      let suffix = 2;
      while (usedSlugs.has(slug)) {
        slug = `${base}-${suffix++}`;
      }
      usedSlugs.add(slug);

      const content = htmlToLexicalJson(editor, post.content);
      const status = post.status === "PUBLISHED" ? "published" : "draft";

      const { error } = await supabase.from("articles").insert({
        title: post.title,
        slug,
        excerpt: post.description,
        content,
        cover_image_url: post.coverImage,
        inline_images: extractInlineImages(post.content),
        status,
        author_id: MIGRATION_AUTHOR_ID,
        category: post.category,
        view_count: post.views,
        like_count: post.likes,
        published_at: status === "published" ? post.createdAt.toISOString() : null,
        created_at: post.createdAt.toISOString(),
        updated_at: post.updatedAt.toISOString(),
      });

      if (error) throw error;
      migrated++;
      console.log(`  migrated "${post.title}" -> /press/${slug}`);
    } catch (err) {
      failed++;
      console.error(`  FAILED "${post.title}" (${post.id}):`, err);
    }
  }

  await pgClient.end();
  console.log(`\nDone. Migrated ${migrated}/${rows.length} posts (${failed} failed).`);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
