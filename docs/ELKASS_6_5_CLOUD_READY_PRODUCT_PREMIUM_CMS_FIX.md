# ELKASS 6.5 CLOUD READY + PRODUCT PREMIUM + CMS FIX

## Zrobione
- Panel mobilny/stacjonarny naprawiony pod Chrome „wersja na komputer”.
- Na górze panelu dodano Szybki start:
  - Dodaj produkt krok po kroku,
  - Kategorie i podkategorie,
  - Grafiki i media,
  - Biblioteka terminów.
- Przywrócono kreator dodawania produktu krok po kroku.
- Dodano produkt premium:
  - duża karta produktu,
  - cena,
  - opis,
  - cechy,
  - kafle: szybki transport, raty 0%, fachowe doradztwo.
- Dodano Bibliotekę terminów:
  - hasło,
  - definicja,
  - przygotowane pod wizualne wstawianie na stronę.
- Dodano Cloud Ready:
  - `cloud-config.js`,
  - `js/elkass-65-cloud-client.js`,
  - fallback lokalny,
  - gotowy schemat Supabase.

## Jak uruchomić chmurę
1. Utwórz projekt Supabase.
2. W SQL Editor wklej `supabase/schema.sql`.
3. Utwórz publiczny bucket storage: `elkass-media`.
4. Wpisz URL i anon key w `cloud-config.js`.
5. Zmień `enabled: false` na `enabled: true`.

## Migracja na firmową domenę
Dane będą w Supabase, więc frontend można przenieść z Vercel na własną domenę bez utraty produktów, kategorii i grafik.
