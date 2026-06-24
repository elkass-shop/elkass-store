-- ELKASS 7.0.2 FINAL UX — promocje, badge, galeria, komentarze

alter table if exists products add column if not exists promo_active boolean default false;
alter table if exists products add column if not exists promo_role text default '';
alter table if exists products add column if not exists promo_badges jsonb default '[]'::jsonb;
alter table if exists products add column if not exists discount text default '';
alter table if exists products add column if not exists images jsonb default '[]'::jsonb;

create table if not exists category_comments (
  id text primary key,
  category_key text not null,
  author text,
  city text,
  rating integer default 5,
  comment text not null,
  active boolean default true,
  created_at timestamptz default now()
);

alter table if exists category_comments enable row level security;

drop policy if exists "elkass public read category comments" on category_comments;
drop policy if exists "elkass public write category comments" on category_comments;

create policy "elkass public read category comments" on category_comments for select using (true);
create policy "elkass public write category comments" on category_comments for all using (true) with check (true);

insert into settings(key,value) values
('final-ux-702', '{"premiumPromotion":true,"premiumBadges":true,"categoryComments":true,"productGallery":true}'::jsonb)
on conflict (key) do update set value = excluded.value;
