-- ELKASS 7.0 FINAL PRE-CLOUD
-- Dodatkowe kolumny pod automatyczne parametry, definicje i tryb sprzedaży.

alter table if exists products add column if not exists specs jsonb default '{}'::jsonb;
alter table if exists products add column if not exists parameters jsonb default '{}'::jsonb;
alter table if exists products add column if not exists definitions jsonb default '[]'::jsonb;
alter table if exists products add column if not exists images jsonb default '[]'::jsonb;
alter table if exists products add column if not exists sale_mode text default 'inquiry';
alter table if exists products add column if not exists autoFormatted boolean default false;

insert into settings(key,value) values
('final-precloud', '{"version":"7.0","readyForCloud":true,"productParser":true,"pdfDescription":true}'::jsonb)
on conflict (key) do update set value = excluded.value;
