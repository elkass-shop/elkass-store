# ELKASS 6.5.2 Category Routing + Media Stability

## Poprawiono
- Kafle w sekcji `Oferta sklepu / Najpopularniejsze kategorie` nie prowadzą już do `#promocje`.
- Kafle prowadzą do:
  - `category.html?cat=rtv`
  - `category.html?cat=agd`
  - `category.html?cat=agd-zabudowa`
  - `category.html?cat=male-agd`
  - `category.html?cat=komputery-telefony`
  - `category.html?cat=serwis`
- Strona kategorii pokazuje podkategorie.
- Jeżeli dana podkategoria nie ma kolejnego poziomu, strona pokazuje miejsce na produkty.
- Ograniczono miganie sekcji kategorii w ciężkich motywach sezonowych, szczególnie Boże Narodzenie i Zima.
- W panelu wygaszono sezonowe animacje, żeby CMS działał stabilniej.

## Grafiki
- Prosta zmiana grafik w każdym miejscu będzie w pełni możliwa po aktywacji chmury.
- Bez chmury Media Manager pokazuje gdzie podmienić plik.
- Po Supabase grafiki będą zapisywane przez panel do storage `elkass-media`.
