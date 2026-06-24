# ELKASS 7.0.7 HOTFIX — Category Routing

## Cel
Naprawa tylko routingu kategorii i podkategorii bez ruszania promocji, hero i produktu.

## Zrobione
- Kafle głównych kategorii prowadzą do `category.html?cat=...`.
- `RTV` pokazuje podkategorie RTV.
- `AGD` pokazuje podkategorie AGD.
- `AGD do zabudowy` pokazuje podkategorie zabudowy.
- `Komputery i telefony`, `Małe AGD`, `Serwis` mają własne podkategorie.
- Stara sekcja „Oferta sklepu / Najpopularniejsze kategorie” na stronie kategorii jest ukrywana, jeśli przeszkadza.
- Nie zmieniono promocji, karty produktu ani panelu.

## Test
- kliknij RTV na stronie głównej,
- powinno otworzyć `category.html?cat=rtv`,
- powinny pojawić się kafle: Telewizory, Audio, Soundbary, Multimedia.
