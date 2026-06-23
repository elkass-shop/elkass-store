-- ELKASS 6.7 Priority A+B — Cloud ready schema/policies/seeds
-- Uruchom po podstawowym schema.sql, jeżeli tabela już istnieje — nic nie zepsuje.

alter table if exists categories enable row level security;
alter table if exists products enable row level security;
alter table if exists promotions enable row level security;
alter table if exists media enable row level security;
alter table if exists glossary enable row level security;
alter table if exists settings enable row level security;

drop policy if exists "public read categories" on categories;
drop policy if exists "public write categories" on categories;
drop policy if exists "public read products" on products;
drop policy if exists "public write products" on products;
drop policy if exists "public read promotions" on promotions;
drop policy if exists "public write promotions" on promotions;
drop policy if exists "public read media" on media;
drop policy if exists "public write media" on media;
drop policy if exists "public read glossary" on glossary;
drop policy if exists "public write glossary" on glossary;
drop policy if exists "public read settings" on settings;
drop policy if exists "public write settings" on settings;

create policy "public read categories" on categories for select using (true);
create policy "public write categories" on categories for all using (true) with check (true);
create policy "public read products" on products for select using (true);
create policy "public write products" on products for all using (true) with check (true);
create policy "public read promotions" on promotions for select using (true);
create policy "public write promotions" on promotions for all using (true) with check (true);
create policy "public read media" on media for select using (true);
create policy "public write media" on media for all using (true) with check (true);
create policy "public read glossary" on glossary for select using (true);
create policy "public write glossary" on glossary for all using (true) with check (true);
create policy "public read settings" on settings for select using (true);
create policy "public write settings" on settings for all using (true) with check (true);

insert into settings(key,value) values
('layout', '{"mode":"classic","premiumReady":true}'::jsonb),
('cloud', '{"version":"6.7","storageBucket":"elkass-media"}'::jsonb)
on conflict (key) do update set value = excluded.value;
