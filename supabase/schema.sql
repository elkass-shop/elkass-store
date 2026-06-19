-- ELKASS ENTERPRISE 2.0 — Supabase schema
-- Uruchom w Supabase: SQL Editor -> New query -> Run.

create extension if not exists "uuid-ossp";

create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.subcategories (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references public.categories(id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  image_url text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  unique(category_id, slug)
);

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  brand text,
  category_id uuid references public.categories(id) on delete set null,
  subcategory_id uuid references public.subcategories(id) on delete set null,
  short_description text,
  description text,
  price numeric(12,2) not null default 0,
  discount_percent numeric(5,2) default 0,
  promo_label text,
  availability text default 'available',
  main_image_url text,
  gallery jsonb default '[]'::jsonb,
  parameters jsonb default '[]'::jsonb,
  placement jsonb default '{"home":false,"new":false,"weekly":false,"daily":false,"blackFriday":false,"bestseller":false}'::jsonb,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.promotions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  banner_url text,
  starts_at timestamptz,
  ends_at timestamptz,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default uuid_generate_v4(),
  title text,
  description text,
  image_url text not null,
  category text default 'Sklep',
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.partners (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  logo_url text,
  website_url text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(),
  author text not null,
  city text,
  rating int default 5 check (rating between 1 and 5),
  text text not null,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

-- Storage buckets:
insert into storage.buckets (id, name, public)
values 
  ('products', 'products', true),
  ('gallery', 'gallery', true),
  ('banners', 'banners', true),
  ('logos', 'logos', true)
on conflict (id) do nothing;

-- Demo RLS: public read, authenticated write.
alter table public.categories enable row level security;
alter table public.subcategories enable row level security;
alter table public.products enable row level security;
alter table public.promotions enable row level security;
alter table public.gallery_items enable row level security;
alter table public.partners enable row level security;
alter table public.reviews enable row level security;
alter table public.site_settings enable row level security;

create policy "public read categories" on public.categories for select using (true);
create policy "public read subcategories" on public.subcategories for select using (true);
create policy "public read products" on public.products for select using (true);
create policy "public read promotions" on public.promotions for select using (true);
create policy "public read gallery" on public.gallery_items for select using (true);
create policy "public read partners" on public.partners for select using (true);
create policy "public read reviews" on public.reviews for select using (true);
create policy "public read settings" on public.site_settings for select using (true);

create policy "auth write categories" on public.categories for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write subcategories" on public.subcategories for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write products" on public.products for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write promotions" on public.promotions for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write gallery" on public.gallery_items for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write partners" on public.partners for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write reviews" on public.reviews for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write settings" on public.site_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
