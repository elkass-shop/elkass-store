-- ELKASS 7.0 Stage 3 — Supabase Production
-- Uruchom w SQL Editor po podstawowym skrypcie tabel.
-- Skrypt jest bezpieczny: dodaje brakujące kolumny i polityki.

alter table if exists products add column if not exists slug text;
alter table if exists products add column if not exists oldPrice text;
alter table if exists products add column if not exists old_price text;
alter table if exists products add column if not exists category_id text;
alter table if exists products add column if not exists sale_mode text default 'inquiry';
alter table if exists products add column if not exists specs jsonb default '{}'::jsonb;
alter table if exists products add column if not exists parameters jsonb default '{}'::jsonb;
alter table if exists products add column if not exists definitions jsonb default '[]'::jsonb;
alter table if exists products add column if not exists images jsonb default '[]'::jsonb;
alter table if exists products add column if not exists updated_at timestamptz default now();

alter table if exists categories add column if not exists slug text;
alter table if exists categories add column if not exists fallback text;
alter table if exists categories add column if not exists premiumDescription text;
alter table if exists categories add column if not exists showOnHome boolean default false;
alter table if exists categories add column if not exists updated_at timestamptz default now();

alter table if exists media add column if not exists label text;
alter table if exists media add column if not exists url text;
alter table if exists media add column if not exists target text;
alter table if exists media add column if not exists updated_at timestamptz default now();

alter table if exists glossary add column if not exists updated_at timestamptz default now();
alter table if exists promotions add column if not exists product_id text;
alter table if exists promotions add column if not exists updated_at timestamptz default now();

alter table if exists categories enable row level security;
alter table if exists products enable row level security;
alter table if exists promotions enable row level security;
alter table if exists media enable row level security;
alter table if exists glossary enable row level security;
alter table if exists settings enable row level security;

drop policy if exists "elkass public read categories" on categories;
drop policy if exists "elkass public write categories" on categories;
drop policy if exists "elkass public read products" on products;
drop policy if exists "elkass public write products" on products;
drop policy if exists "elkass public read promotions" on promotions;
drop policy if exists "elkass public write promotions" on promotions;
drop policy if exists "elkass public read media" on media;
drop policy if exists "elkass public write media" on media;
drop policy if exists "elkass public read glossary" on glossary;
drop policy if exists "elkass public write glossary" on glossary;
drop policy if exists "elkass public read settings" on settings;
drop policy if exists "elkass public write settings" on settings;

create policy "elkass public read categories" on categories for select using (true);
create policy "elkass public write categories" on categories for all using (true) with check (true);
create policy "elkass public read products" on products for select using (true);
create policy "elkass public write products" on products for all using (true) with check (true);
create policy "elkass public read promotions" on promotions for select using (true);
create policy "elkass public write promotions" on promotions for all using (true) with check (true);
create policy "elkass public read media" on media for select using (true);
create policy "elkass public write media" on media for all using (true) with check (true);
create policy "elkass public read glossary" on glossary for select using (true);
create policy "elkass public write glossary" on glossary for all using (true) with check (true);
create policy "elkass public read settings" on settings for select using (true);
create policy "elkass public write settings" on settings for all using (true) with check (true);

insert into settings(key,value) values
('cloud-production', '{"stage":"7.0-stage3","bucket":"elkass-media","ready":true}'::jsonb)
on conflict (key) do update set value = excluded.value;
