# ELKASS 7.0.1 UX FIX

## Poprawki według testów

### Sekcja promocji
- Nowy wygląd premium.
- Zdjęcia mają stały rozmiar i `object-fit: contain`.
- Hero promocji prowadzi do karty produktu.
- Miniatury prowadzą do kart produktów.
- Stara sekcja promo jest ukrywana, aby nie dublować.

### Produkt
- Kafle usług ELKASS przeniesione pod opis produktu.
- Pod ceną zostają cechy/parametry produktu.
- Maksymalnie 8 kafli cech.
- Dodana sekcja komentarzy kategorii 3–5 losowych opinii.
- Komentarze nie drukują się w PDF.
- Galeria produktu obsługuje wiele zdjęć z pola `images`.

### Kreator produktu
- Poprawka nazewnictwa:
  - `Opis / cechy produktu` → `Cechy produktu`
  - `Parametry produktu` → `Opis produktu`
- Dodane pole galerii produktu:
  - `Galeria produktu — zdjęcia po przecinku`

### Mobile / sezonowe
- Ograniczenie animacji sezonowych na mobile.
- Mniejsza przezroczystość i niższy z-index.
- Blokada poziomego scrolla.

### Supabase
Dodano:
`supabase/schema-701-ux-fix-comments.sql`

Zawiera:
- tabela `category_comments`,
- pola promocji,
- pola galerii produktu.
