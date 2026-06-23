# ELKASS 7.0 Stage 2 — CMS Clean Foundation

## Cel
Uporządkować CMS bez kasowania starych plików i bez ryzyka rozwalenia działającej strony.

## Dodano jedną właściwą ścieżkę obsługi
- `admin/product-wizard-clean.html`
- `admin/category-manager-clean.html`
- `admin/media-manager-clean.html`
- `admin/glossary-manager-clean.html`
- `admin/commerce-manager-clean.html`
- `admin/theme-manager-clean.html`

## Panel główny
Na `/admin/` dodany jest nowy ekran szybkiego startu, który wskazuje właściwe narzędzia.

## Dlaczego nie usuwam jeszcze starych managerów
Stare pliki zostają jako backup. Od tej wersji nie trzeba ich używać. Usuwanie zrobimy dopiero po potwierdzeniu, że clean manager działa poprawnie.

## Kolejny etap
Stage 3:
- Supabase Production,
- storage `elkass-media`,
- wpisanie API URL i anon key,
- test zapisu z clean managerów.
