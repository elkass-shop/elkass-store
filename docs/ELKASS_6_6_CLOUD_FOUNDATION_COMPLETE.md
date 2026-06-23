# ELKASS 6.6 CLOUD FOUNDATION COMPLETE

## Cel paczki
Kompletne ujednolicenie fundamentu przed realnym przejściem na chmurę.

## Zrobione
- Jeden wspólny klient danych: `js/elkass-66-cloud-foundation.js`.
- Konfiguracja chmury: `cloud-config.js`.
- Supabase schema: `supabase/schema.sql`.
- Kategorie nie prowadzą już do promocji, tylko do `category.html?cat=...`.
- Strona kategorii pokazuje podkategorie.
- Stabilizacja sekcji kategorii, żeby nie migała w ciężkich motywach Boże Narodzenie/Zima.
- Panel CMS ma uproszczony Szybki Start.
- Panel CMS ma mniej animacji sezonowych niż strona sklepu, żeby był czytelny i szybki.
- Media Manager / Product Wizard / Glossary Manager zostają jako narzędzia dla laika.
- Karta produktu premium zostaje z poprzedniego etapu.
- Projekt nadal działa bez chmury w trybie local fallback.

## Co dalej
Po wgraniu tej paczki można aktywować Supabase:
1. Utwórz projekt Supabase.
2. W SQL Editor wklej `supabase/schema.sql`.
3. Utwórz publiczny bucket `elkass-media`.
4. W `cloud-config.js` wpisz `supabaseUrl` i `supabaseAnonKey`.
5. Zmień `enabled: false` na `enabled: true`.

## Migracja na firmową domenę
Dane będą w Supabase, więc frontend można później przenieść na dowolną domenę/hosting.
