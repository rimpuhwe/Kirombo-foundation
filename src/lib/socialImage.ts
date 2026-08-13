// Dynamic per-article social-share image, built from the article's existing
// Cloudinary cover image via URL transformations — no separate image-
// generation step or storage needed. Used by both the client (PressDetail's
// <Helmet> tags) and middleware.ts (social crawlers, which never execute
// JavaScript and so never see react-helmet's tags — see middleware.ts for
// why that split is necessary).
//
// Kept free of import.meta.env / DOM APIs so it can be bundled into the
// Vercel Edge Middleware runtime as well as the Vite client bundle.

// The foundation logo lives in a different Cloudinary account (dcgmi6w24,
// per index.html) than article cover images (VITE_CLOUDINARY_CLOUD_NAME).
// Cloudinary overlay-by-public-ID (`l_<id>`) only works within the same
// account, so the logo watermark below is added via `l_fetch:<base64
// url>`, which can pull in an image from any remote URL regardless of
// account — verified directly against Cloudinary (base64 is required; a
// plain percent-encoded URL 400s).
const LOGO_URL = "https://res.cloudinary.com/dcgmi6w24/image/upload/v1764227923/logo_fbe3pg.png";

function base64Encode(value: string): string {
  // btoa is a standard Web API available in browsers, Node 18+, and the
  // Vercel Edge runtime — this module must run in all three.
  return btoa(value);
}

// A branded 1200x630 canvas (foundation green, logo padded/centered) used
// only when an article has no cover image at all.
export const FALLBACK_SOCIAL_IMAGE =
  "https://res.cloudinary.com/dcgmi6w24/image/upload/w_1200,h_630,c_pad,b_rgb:0f766e,q_auto,f_auto/logo_fbe3pg.png";

const CLOUDINARY_URL_PATTERN =
  /^https:\/\/res\.cloudinary\.com\/([^/]+)\/image\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+(?:\?.*)?$/;

/**
 * Builds a portrait-editorial-style social card (1200x630 — a landscape
 * canvas every platform's crawler accepts) from an article's Cloudinary
 * cover image: blurred fill background, the sharp cover image inset and
 * centered, and a subtle logo watermark top-left. The title itself isn't
 * baked into the image — every platform already renders og:title as text
 * next to the card, so a second copy burned into the photo (behind a
 * translucent box) just covered the picture. Falls back to a branded
 * canvas when there's no cover image, or to the raw cover URL if it isn't
 * a Cloudinary asset (so a preview still shows *something* rather than
 * breaking).
 *
 * Each overlay is TWO chained transformation segments: one for the
 * overlay's own crop/size, and a separate one (right before
 * fl_layer_apply) for where it lands on the canvas. Putting the
 * positioning g_/x_/y_ in the SAME segment as the crop params (as an
 * earlier version of this did) makes Cloudinary consume them as crop
 * instructions instead, so every overlay silently lands center — verified
 * directly against Cloudinary by comparing both forms.
 */
export function buildArticleSocialImageUrl(coverImageUrl: string | null | undefined): string {
  if (!coverImageUrl) return FALLBACK_SOCIAL_IMAGE;

  const match = coverImageUrl.match(CLOUDINARY_URL_PATTERN);
  if (!match) return coverImageUrl;

  const [, cloudName, publicId] = match;
  const overlayId = publicId.replace(/\//g, ":");
  const encodedLogo = base64Encode(LOGO_URL);

  const transformations = [
    // Blurred, darkened fill background at the social-card canvas size.
    "w_1200,h_630,c_fill,g_auto,e_blur:1200,e_brightness:-15",
    // The sharp cover image, portrait-fitted, then centered on top.
    `l_${overlayId},w_820,h_630,c_fill,g_auto`,
    "fl_layer_apply,g_center",
    // Foundation logo watermark, sized, then placed top-left, subtly.
    `l_fetch:${encodedLogo},w_150,o_92`,
    "fl_layer_apply,g_north_west,x_36,y_36",
    "f_auto,q_auto",
  ].join("/");

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`;
}
