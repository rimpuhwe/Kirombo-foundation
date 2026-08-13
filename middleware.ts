// This app is a client-rendered Vite SPA (see index.html — a single
// <div id="root"> filled in by src/main.tsx). Social-media crawlers
// (facebookexternalhit, Twitterbot, WhatsApp, LinkedInBot, ...) never
// execute JavaScript — they fetch the raw HTML and read whatever <meta>
// tags are already there. That means react-helmet's per-article tags
// (see src/pages/PressDetail.tsx) are invisible to them; they only ever
// see the static, generic tags baked into index.html at build time
// (foundation name + logo), regardless of which article was shared. This
// is the actual root cause of "every shared link shows the site logo".
//
// This Vercel Routing Middleware intercepts requests to /press/:slug made
// by those specific crawlers, fetches the article from Supabase, and
// returns a small HTML document with correct per-article Open Graph /
// Twitter meta tags. Real visitors (anyone whose User-Agent doesn't match
// a known crawler) are untouched — next() passes them straight through to
// the normal SPA, so the app's behavior and design are unchanged.
import { next } from "@vercel/functions";
import { buildArticleSocialImageUrl, FALLBACK_SOCIAL_IMAGE } from "./src/lib/socialImage";

export const config = {
  matcher: "/press/:slug",
};

const SOCIAL_CRAWLER_USER_AGENT =
  /facebookexternalhit|Facebot|Twitterbot|LinkedInBot|WhatsApp|TelegramBot|Slackbot|Discordbot|SkypeUriPreview|Pinterest\/|redditbot|vkShare/i;

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const SITE_NAME = "Abdallah Kiromba Foundation";

interface ArticleMeta {
  title: string;
  excerpt: string;
  cover_image_url: string | null;
}

async function fetchPublishedArticle(slug: string): Promise<ArticleMeta | null> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;

  const endpoint =
    `${SUPABASE_URL}/rest/v1/articles` +
    `?slug=eq.${encodeURIComponent(slug)}&status=eq.published` +
    `&select=title,excerpt,cover_image_url&limit=1`;

  try {
    const response = await fetch(endpoint, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    });
    if (!response.ok) return null;
    const rows = (await response.json()) as ArticleMeta[];
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderCrawlerHtml(article: ArticleMeta, pageUrl: string): string {
  const title = article.title;
  const description = article.excerpt;
  const image = buildArticleSocialImageUrl(article.cover_image_url) || FALLBACK_SOCIAL_IMAGE;

  const t = escapeHtml(title);
  const d = escapeHtml(description);
  const i = escapeHtml(image);
  const u = escapeHtml(pageUrl);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${t} | ${SITE_NAME}</title>
<meta name="description" content="${d}" />
<link rel="canonical" href="${u}" />

<meta property="og:type" content="article" />
<meta property="og:title" content="${t}" />
<meta property="og:description" content="${d}" />
<meta property="og:image" content="${i}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="${u}" />
<meta property="og:site_name" content="${SITE_NAME}" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${t}" />
<meta name="twitter:description" content="${d}" />
<meta name="twitter:image" content="${i}" />

<meta http-equiv="refresh" content="0; url=${u}" />
</head>
<body>
<a href="${u}">${t}</a>
</body>
</html>`;
}

export default async function middleware(request: Request) {
  if (request.method !== "GET" && request.method !== "HEAD") return next();

  const userAgent = request.headers.get("user-agent") ?? "";
  if (!SOCIAL_CRAWLER_USER_AGENT.test(userAgent)) return next();

  const url = new URL(request.url);
  const slug = url.pathname.replace(/^\/press\//, "");
  const article = await fetchPublishedArticle(slug);

  // Unknown/unpublished slug — let the SPA render its normal "not found" state.
  if (!article) return next();

  return new Response(renderCrawlerHtml(article, url.toString()), {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
