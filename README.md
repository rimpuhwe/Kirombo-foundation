## Abdallah Kiromba Foundation – Website

The official website for the Abdallah Kiromba Foundation, a non-profit organization dedicated to supporting vulnerable children, orphans, and underserved communities across Rwanda.
This platform showcases the Foundation's mission, programs, impact stories, and opportunities for donors and partners to get involved.

## About the Foundation

The Abdallah Kiromba Foundation was established to continue the legacy of Abdallah Kiromba through impactful community programs grounded in compassion, education, and sustainable charity.
Our work spans more than 14 districts, serving orphans, vulnerable children, and families in need through:

- Education Support Programs
- Orphan Care & Child Protection
- Sadaqah Jariyah & Islamic Charity Initiatives
- Community Development Projects

## Features

1. Hero sections with custom tag, title, and descriptions
2. Dynamic "What We Do" page featuring all program pillars
3. A Press Room with a CMS-managed news/blog feed
4. Reusable components for cards, sections, and buttons
5. Fully responsive design
6. Clean code structure for scalability

## Architecture

This is a **frontend-only Vite + React application**. There is no custom backend
server you host yourself — the app talks directly to [Supabase](https://supabase.com)
(Postgres database + Auth) from the browser using the official
`@supabase/supabase-js` client, and to [Cloudinary](https://cloudinary.com)
for image hosting via an unsigned upload preset.

A small number of privileged operations (creating a writer's login, sending
transactional email) need a secret API key that must never reach the
browser. For those, and only those, the app calls **Supabase Edge
Functions** — serverless functions that are part of the Supabase platform
itself (deployed with the Supabase CLI, secrets stored as Supabase secrets),
not a separately hosted server.

```
Vite + React  →  @supabase/supabase-js  →  Supabase (Database + Auth)
                                          ↘  Supabase Edge Functions → Brevo (email)
                                          ↘  Cloudinary (image uploads)
```

- **Public site**: all marketing pages, plus a Press Room (`/press`) that
  reads only *published* articles from Supabase, and a "Join the Mission"
  form that emails the Foundation via Brevo.
- **Admin CMS** (`/admin`): a sign-in-protected dashboard for writing,
  editing, publishing, and managing Press Room articles, using a
  [Lexical](https://lexical.dev)-based rich text editor. Admins can also
  invite new writers from a "Writers" tab.
- **Security**: enforced both in the UI (protected routes) and, more
  importantly, at the database level via Postgres Row Level Security (RLS) —
  see `supabase/schema.sql`. The frontend only ever holds the public
  `anon` Supabase key; the service-role key and the Brevo API key live only
  as Edge Function secrets and are never shipped to the browser.

## Tech Stack

- Vite / React / TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (Postgres, Auth, Row Level Security, Edge Functions)
- Lexical (rich text editor for the Press Room CMS)
- Cloudinary (image hosting)
- Brevo (transactional email, sent from Edge Functions)

## Getting Started

### Clone the repository

```
git clone https://github.com/rimpuhwe/Kirombo-foundation.git
cd Kirombo-foundation
```

### Install dependencies

```
npm install
```

### Configure environment variables

Copy `.env.example` to `.env` and fill in the values (see below for where to
get each one):

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

(Email — the "Join the Mission" form and writer-invite emails — is sent
server-side by Edge Functions via Brevo, so there's no client-side email
config anymore.)

Never put real credentials in the repository — `.env` is gitignored.

### Run the development server

```
npm run dev
```

### Build for production

```
npm run build
```

### Deploy

The app is a static Vite build (`npm run build` outputs to `dist/`) — deploy
it to any static host. `vercel.json` is already set up for Vercel (SPA
rewrites). Set the environment variables above in your hosting provider's
dashboard; there is no backend service to deploy.

---

## Press Room CMS setup

### 1. Create a Supabase project

Create a free project at [supabase.com](https://supabase.com/dashboard). From
**Project Settings → API**, copy the **Project URL** and **anon/public key**
into `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.

### 2. Apply the database schema

Open the Supabase **SQL Editor** and run the contents of
[`supabase/schema.sql`](./supabase/schema.sql). This creates:

- **`profiles`** — authorized CMS writers/admins (id = the matching
  `auth.users.id`, name, email, role). Publicly readable (to show author
  names on articles); writable only via the Supabase dashboard/SQL editor
  (service role), never from the frontend — there is no public sign-up.
- **`articles`** — id (uuid), title, slug (unique), excerpt, `content`
  (jsonb — a serialized Lexical editor state), `cover_image_url`,
  `inline_images` (Cloudinary URLs referenced in the content, for future
  cleanup), status (`draft` / `published`), `author_id`, category,
  `view_count`, `like_count`, `published_at`, `created_at`, `updated_at`.
  Indexed on `slug`, `status`, `published_at`, `author_id`, and the
  composite `(status, published_at)` used by the public listing query.
- **Row Level Security policies**: the public can only `SELECT` articles
  where `status = 'published'`. All writes (insert/update/delete), and
  reading drafts, require the authenticated user to have a row in
  `profiles` — there is no `USING (true)` write policy anywhere.
- Two `SECURITY DEFINER` RPC functions, `increment_article_views` and
  `increment_article_likes`, so the public can bump view/like counters
  without needing a direct `UPDATE` grant on the table.

### 3. Deploy the Edge Functions

Install the [Supabase CLI](https://supabase.com/docs/guides/cli), then from
the project root:

```
supabase login
supabase link --project-ref <your-project-ref>
supabase functions deploy create-writer
supabase functions deploy send-contact-email
```

Set the secrets they need (these are Supabase secrets, not `VITE_*` env
vars — they never reach the browser):

```
supabase secrets set BREVO_API_KEY=your-brevo-api-key
supabase secrets set BREVO_SENDER_EMAIL=no-reply@yourdomain.org
supabase secrets set BREVO_SENDER_NAME="Abdallah Kiromba Foundation"
supabase secrets set SITE_URL=https://www.abdallahkirombafoundation.org
supabase secrets set CONTACT_RECIPIENT_EMAIL=abdallahkirombafoundation@gmail.com
```

`SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` are
injected automatically by the platform — you don't set those yourself.

Get a `BREVO_API_KEY` from [Brevo](https://app.brevo.com) (SMTP & API →
API Keys), and verify `BREVO_SENDER_EMAIL` as a sender/domain in Brevo, or
sending will fail.

### 4. Create the first admin

There is no public sign-up. The first admin is created with the seed
script (credentials are passed as env vars on the command line so they
never touch disk or git):

```
SUPABASE_URL="https://xxxx.supabase.co" \
SUPABASE_SERVICE_ROLE_KEY="..." \
SEED_ADMIN_EMAIL="admin@example.com" \
SEED_ADMIN_PASSWORD="a-strong-password" \
npx tsx scripts/seed-admin.ts
```

They can then sign in at `/admin/login` and should change that password
from **Settings → Change Password**.

### 5. Adding more writers

Once signed in as an admin, use the **Writers** tab in `/admin` — enter a
name and email, and the app:

1. Calls the `create-writer` Edge Function, which verifies the caller is an
   admin (checked server-side, not just hidden in the UI).
2. Generates a strong random password and creates their Supabase Auth user.
3. Adds their `profiles` row with `role = 'writer'`.
4. Emails them their credentials via Brevo, with a branded message and a
   button linking to `/admin/login`.

If the email fails to send, the generated password is shown once in the UI
so it can be shared manually — admins and writers have equal article
permissions; only admins can add new writers.

### 6. Set up Cloudinary image uploads

Article cover images and inline content images are uploaded directly from
the browser to Cloudinary using an **unsigned upload preset** (no API secret
is ever exposed in the frontend):

1. In the Cloudinary dashboard, go to **Settings → Upload → Upload presets**
   and add a new preset with **Signing Mode: Unsigned**.
2. Set `VITE_CLOUDINARY_CLOUD_NAME` (your Cloudinary cloud name) and
   `VITE_CLOUDINARY_UPLOAD_PRESET` (the preset name you just created).

Uploads are validated client-side (image types only, 10MB max) before being
sent to Cloudinary.

### 7. (Optional) Migrate existing articles from the old backend

If you're migrating from the previous Express/Prisma backend, use the
one-off script in [`scripts/migrate-to-supabase.ts`](./scripts/migrate-to-supabase.ts).
It reads every row from the old `Post` table, converts the stored HTML into
serialized Lexical JSON, and inserts it into the new `articles` table,
preserving views/likes/timestamps/status. See the comment at the top of that
file for the required environment variables and usage.

### How the CMS works

- **Writing**: `/admin` → Articles tab → a title, auto-generated (editable)
  slug, excerpt, cover image, category, and the Lexical rich text editor.
  "Save as Draft" or "Publish" — publishing sets `published_at` once and
  keeps it on later edits/republishes so publish history is preserved.
- **Content format**: article bodies are stored as serialized Lexical editor
  state (JSON), not raw HTML — this is what the schema's `content` jsonb
  column holds. The public Press Room renders it through a read-only Lexical
  composer (`src/components/editor/ArticleRenderer.tsx`), so only known,
  safe node types are ever rendered — no `dangerouslySetInnerHTML`.
- **Images inside articles**: clicking the image button in the editor
  toolbar uploads directly to Cloudinary and inserts a resizable image node
  at the cursor.
- **Publishing**: only `published` articles are visible on the public
  `/press` listing and `/press/:slug` detail pages; this is enforced by RLS,
  not just the UI.
- **Roles**: `admin` and `writer` have identical article permissions
  (write, edit, publish, unpublish, delete). Only `admin` can access the
  Writers tab and invite new writers — enforced inside the `create-writer`
  Edge Function, not just by hiding the tab in the UI.

