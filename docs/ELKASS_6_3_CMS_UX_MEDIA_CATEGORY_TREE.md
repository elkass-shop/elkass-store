# ELKASS 6.3 CMS UX + MEDIA + CATEGORY TREE

## Zrobione
- Wyczyściłem strukturę paczki: bez zagnieżdżonego `elkass-store-main`.
- Dodałem `admin/media-manager-63.html` — prosty panel do grafik dla laika.
- Dodałem `categories/category-tree.json`.
- Dodałem silnik kategorii/podkategorii: kafel pokazuje maksymalnie 3 podkategorie i automatyczny przycisk.
- Kategorie preferują JPG, ale mają fallback SVG.
- Usprawniony ekran główny admina: na górze najważniejsze funkcje.

## Grafiki kategorii
Preferowane pliki:
- `assets/categories/rtv.jpg`
- `assets/categories/agd.jpg`
- `assets/categories/agd-zabudowa.jpg`
- `assets/categories/male-agd.jpg`
- `assets/categories/komputery-telefony.jpg`
- `assets/categories/serwis.jpg`

Jeśli JPG nie istnieje, strona pokaże SVG.

## Rozmiary
- Kategorie/podkategorie: `1600x1200`
- Hero: `1800x720`
- Post: `1080x1080`
- Relacja: `1080x1920`
