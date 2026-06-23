# ELKASS 7.0 Stage 3 — Supabase Production Ready

## Cel
Przygotowanie realnego przejścia na chmurę po etapach:
- Stage 1: karta produktu premium + PDF
- Stage 2: clean CMS
- Stage 3: produkcyjny most Supabase

## Dodano
- `js/elkass-703-supabase-production.js`
- `admin/cloud-production-setup.html`
- `supabase/schema-703-production.sql`
- odświeżony `cloud-config.js`

## Kolejność uruchomienia
1. W Supabase SQL Editor uruchom:
   `supabase/schema-703-production.sql`
2. W Supabase Storage utwórz bucket:
   `elkass-media`
   jako publiczny.
3. W GitHub uzupełnij:
   `cloud-config.js`
4. Ustaw:
   `enabled: true`
5. Wejdź:
   `/admin/cloud-production-setup.html`
6. Kliknij:
   `Test zapisu ustawień`

## Uwaga bezpieczeństwa
Polityki w tym etapie pozwalają czytać i zapisywać publicznie, bo projekt jest przygotowywany do prostego CMS bez logowania.
Docelowo w kolejnym etapie warto dodać logowanie admina.
