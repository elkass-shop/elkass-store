# ELKASS 7.0 FINAL PRE-CLOUD

## Domknięcie przed chmurą

### Panel dla laika
- Stały pasek na górze panelu.
- Przycisk `Powrót do sklepu`.
- Szybkie linki: Podgląd, Produkt, Kategorie, Grafiki, Chmura.

### Dodawanie produktu krok po kroku
Dodano sekcję:
`Wklej dane producenta`

System rozpoznaje:
- parametry w formacie `Parametr: wartość`,
- funkcje w formacie `Nazwa - opis`,
- opis tekstowy,
- znane terminy typu No Frost, LED, Wi-Fi.

Po kliknięciu:
`Rozpoznaj i ułóż opis`
pokazuje podgląd.

Po kliknięciu:
`Wstaw do produktu`
uzupełnia:
- opis,
- cechy,
- parametry techniczne,
- definicje/funkcje.

### PDF produktu
Na wydruku/PDF jest:
- nagłówek ELKASS Olesno,
- dane kontaktowe,
- miejsce na QR,
- pełny opis produktu,
- parametry techniczne,
- porada eksperta ELKASS.

### Supabase
Dodano:
`supabase/schema-704-final-precloud.sql`

Po uruchomieniu dodaje pola pod:
- automatycznie rozpoznane parametry,
- definicje,
- tryb sprzedaży,
- auto-formatowanie.

## Następny krok
Po wgraniu tej paczki:
1. Sprawdź panel.
2. Sprawdź kreator produktu.
3. Sprawdź product.html i druk/PDF.
4. Uruchamiamy chmurę Supabase.
