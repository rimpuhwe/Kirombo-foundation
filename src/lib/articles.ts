import { supabase } from "./supabase";

export type ArticleStatus = "draft" | "published";

export interface ArticleAuthor {
  id: string;
  name: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: unknown;
  cover_image_url: string | null;
  inline_images: string[];
  status: ArticleStatus;
  author_id: string | null;
  author: ArticleAuthor | null;
  category: string | null;
  view_count: number;
  like_count: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ArticleSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string | null;
  category: string | null;
  published_at: string | null;
}

export interface ArticleInput {
  title: string;
  slug: string;
  excerpt: string;
  content: unknown;
  cover_image_url: string | null;
  inline_images: string[];
  category: string | null;
}

const ARTICLE_COLUMNS =
  "id, title, slug, excerpt, content, cover_image_url, inline_images, status, author_id, category, view_count, like_count, published_at, created_at, updated_at, author:profiles(id, name)";

function fail(context: string, error: unknown): never {
  console.error(`[articles] ${context}:`, error);
  throw new Error(`${context} failed. Please try again.`);
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function listArticles(status?: ArticleStatus): Promise<Article[]> {
  let query = supabase.from("articles").select(ARTICLE_COLUMNS).order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  if (error) fail("Loading articles", error);
  return (data ?? []) as unknown as Article[];
}

export async function getArticleById(id: string): Promise<Article> {
  const { data, error } = await supabase.from("articles").select(ARTICLE_COLUMNS).eq("id", id).single();
  if (error || !data) fail("Loading article", error);
  return data as unknown as Article;
}

export async function getPublishedArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_COLUMNS)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) fail("Loading article", error);
  return data as unknown as Article | null;
}

export interface ArticlesPage {
  articles: ArticleSummary[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Listing-page query — only the columns the Press Room cards need, never the
 * full Lexical content. Paginated and ordered by creation date (newest
 * first) so ordering is stable and independent of frontend array order, and
 * so it stays correct as the table grows to hundreds/thousands of rows
 * (uses `range()` rather than fetching everything and slicing client-side).
 */
export async function listPublishedArticlesPage(page: number, pageSize = 5): Promise<ArticlesPage> {
  const currentPage = Math.max(1, Math.floor(page) || 1);
  const from = (currentPage - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("articles")
    .select("id, title, slug, excerpt, cover_image_url, category, published_at", { count: "exact" })
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .range(from, to);
  if (error) fail("Loading press room articles", error);

  const totalCount = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return {
    articles: (data ?? []) as ArticleSummary[],
    currentPage,
    pageSize,
    totalCount,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}

export async function createArticle(
  input: ArticleInput,
  status: ArticleStatus,
  authorId: string
): Promise<Article> {
  const { data, error } = await supabase
    .from("articles")
    .insert({
      ...input,
      status,
      author_id: authorId,
      published_at: status === "published" ? new Date().toISOString() : null,
    })
    .select(ARTICLE_COLUMNS)
    .single();
  if (error || !data) fail("Creating article", error);
  return data as unknown as Article;
}

export async function updateArticle(
  id: string,
  input: Partial<ArticleInput>,
  status?: ArticleStatus
): Promise<Article> {
  const payload: Record<string, unknown> = { ...input };

  if (status) {
    payload.status = status;
    // Publishing sets published_at only the first time, preserving publish
    // history across later edits/republishes. Unpublishing leaves it as-is.
    if (status === "published") {
      const current = await getArticleById(id);
      payload.published_at = current.published_at ?? new Date().toISOString();
    }
  }

  const { data, error } = await supabase
    .from("articles")
    .update(payload)
    .eq("id", id)
    .select(ARTICLE_COLUMNS)
    .single();
  if (error || !data) fail("Updating article", error);
  return data as unknown as Article;
}

export async function setArticleStatus(id: string, status: ArticleStatus): Promise<Article> {
  return updateArticle(id, {}, status);
}

export async function deleteArticle(id: string): Promise<void> {
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) fail("Deleting article", error);
}

export async function incrementArticleViews(id: string): Promise<void> {
  const { error } = await supabase.rpc("increment_article_views", { article_id: id });
  if (error) console.error("[articles] Incrementing views failed:", error);
}

export async function incrementArticleLikes(id: string): Promise<void> {
  const { error } = await supabase.rpc("increment_article_likes", { article_id: id });
  if (error) fail("Liking this article", error);
}
