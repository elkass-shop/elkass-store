-- ELKASS 6.6 CLOUD FOUNDATION — Supabase schema

create table if not exists products (
  id text primary key,
  slug text unique,
  name text not null,
  category text,
  price text,
  oldPrice text,
  image text,
  badge text,
  lead text,
  description text,
  features jsonb default '[]'::jsonb,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists categories (
  id text primary key,
  parent_id text,
  name text not null,
  image text,
  fallback text,
  premiumDescription text,
  active boolean default true,
  showOnHome boolean default false,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists promotions (
  id text primary key,
  title text not null,
  product_id text,
  badge text,
  active boolean default true,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists media (
  id text primary key,
  label text,
  type text,
  path text,
  url text,
  target text,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists settings (
  id text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

create table if not exists glossary (
  id text primary key,
  term text not null,
  definition text not null,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Storage:
-- W panelu Supabase utwórz publiczny bucket: elkass-media.
