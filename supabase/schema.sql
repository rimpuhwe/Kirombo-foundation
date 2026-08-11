-- Kirombo Foundation — Press Room CMS schema for Supabase
--
-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query)
-- on a fresh project. Safe to re-run individual sections if something fails
-- partway, but it is not written to be idempotent end-to-end.

-- ────────────────────────────────────────────────────────────────────────
-- Extensions
-- ────────────────────────────────────────────────────────────────────────
create extension if not exists pgcrypto; -- gen_random_uuid()

-- ────────────────────────────────────────────────────────────────────────
-- Types
-- ────────────────────────────────────────────────────────────────────────
do $$
begin
  if not exists (select 1 from pg_type where typname = 'article_status') then
    create type article_status as enum ('draft', 'published');
  end if;
end $$;

-- ────────────────────────────────────────────────────────────────────────
-- profiles — authorized CMS writers/admins.
--
-- There is no public sign-up. Accounts are created either by:
--   - the `create-writer` Edge Function (admin-only, used by the "Add
--     writer" button in /admin — see supabase/functions/create-writer), or
--   - manually: Supabase Dashboard → Authentication → Users → Add user, then
--       insert into public.profiles (id, name, email, role)
--       values ('<the new auth user's uuid>', 'Full Name', 'email@example.com', 'admin');
--
-- role is 'admin' or 'writer'. Both can write/publish articles; only 'admin'
-- may invite new writers (enforced inside the create-writer Edge Function).
-- ────────────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  email text not null,
  role text not null default 'writer',
  created_at timestamptz not null default now()
);

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'profiles_role_check'
  ) then
    alter table public.profiles
      add constraint profiles_role_check check (role in ('admin', 'writer'));
  end if;
end $$;

alter table public.profiles enable row level security;

drop policy if exists "Profiles are publicly readable" on public.profiles;
create policy "Profiles are publicly readable"
  on public.profiles for select
  using (true);

-- No insert/update/delete policies on profiles for anon/authenticated: rows
-- are only ever written by code holding the service-role key — either the
-- `create-writer` Edge Function or the project owner via the SQL editor.

-- ────────────────────────────────────────────────────────────────────────
-- articles
-- ────────────────────────────────────────────────────────────────────────
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null,
  excerpt text not null,
  content jsonb not null,                 -- serialized Lexical editor state
  cover_image_url text,
  inline_images text[] not null default '{}', -- Cloudinary URLs referenced inside content
  status article_status not null default 'draft',
  author_id uuid references public.profiles (id) on delete set null,
  category text,
  view_count integer not null default 0,
  like_count integer not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint articles_slug_unique unique (slug)
);

create index if not exists idx_articles_status on public.articles (status);
create index if not exists idx_articles_published_at on public.articles (published_at desc);
create index if not exists idx_articles_author_id on public.articles (author_id);
create index if not exists idx_articles_status_published_at
  on public.articles (status, published_at desc);
-- slug already has a unique index from the constraint above

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_articles_updated_at on public.articles;
create trigger trg_articles_updated_at
  before update on public.articles
  for each row
  execute function public.set_updated_at();

alter table public.articles enable row level security;

-- Public visitors can only read published articles.
drop policy if exists "Public can read published articles" on public.articles;
create policy "Public can read published articles"
  on public.articles for select
  using (status = 'published');

-- Authorized CMS users (anyone with a profiles row) can read everything,
-- including drafts.
drop policy if exists "Authorized users can read all articles" on public.articles;
create policy "Authorized users can read all articles"
  on public.articles for select
  using (exists (select 1 from public.profiles where id = auth.uid()));

-- Writes are restricted to authorized CMS users only — never USING (true).
drop policy if exists "Authorized users can insert articles" on public.articles;
create policy "Authorized users can insert articles"
  on public.articles for insert
  with check (exists (select 1 from public.profiles where id = auth.uid()));

drop policy if exists "Authorized users can update articles" on public.articles;
create policy "Authorized users can update articles"
  on public.articles for update
  using (exists (select 1 from public.profiles where id = auth.uid()))
  with check (exists (select 1 from public.profiles where id = auth.uid()));

drop policy if exists "Authorized users can delete articles" on public.articles;
create policy "Authorized users can delete articles"
  on public.articles for delete
  using (exists (select 1 from public.profiles where id = auth.uid()));

-- ────────────────────────────────────────────────────────────────────────
-- Public view/like counters — exposed only through SECURITY DEFINER RPCs so
-- anonymous visitors never need a direct UPDATE policy on articles.
-- ────────────────────────────────────────────────────────────────────────
create or replace function public.increment_article_views(article_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.articles
  set view_count = view_count + 1
  where id = article_id and status = 'published';
end;
$$;

create or replace function public.increment_article_likes(article_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.articles
  set like_count = like_count + 1
  where id = article_id and status = 'published';
end;
$$;

revoke all on function public.increment_article_views(uuid) from public;
revoke all on function public.increment_article_likes(uuid) from public;
grant execute on function public.increment_article_views(uuid) to anon, authenticated;
grant execute on function public.increment_article_likes(uuid) to anon, authenticated;
