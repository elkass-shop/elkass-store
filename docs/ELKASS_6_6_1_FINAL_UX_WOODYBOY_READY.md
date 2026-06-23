# ELKASS 6.6.1 FINAL UX + WOODYBOY READY

## Cel
Dopiąć strukturę i UX przed jednym czystym wdrożeniem do Supabase.

## Zrobione
- Ujednolicony układ sekcji standard/sezony.
- Stabilizacja Hero, kategorii i mobile/desktop.
- Kategorie prowadzą do `category.html?cat=...`.
- Strona kategorii pokazuje podkategorie.
- Gdy nie ma kolejnego poziomu, pokazuje miejsce na produkty.
- Panel CMS ma Szybki Start na górze.
- Panel mobilny ma menu i nie powinien rozjeżdżać się w Chrome desktop mode.
- Kreator produktu krok po kroku jest dostępny.
- Media Manager pokazuje wszystkie miejsca grafik.
- Biblioteka terminów działa jako baza haseł i definicji.
- Karta produktu premium jest aktywna.
- Galeria ma przygotowane strzałki/lewo-prawo.
- Chmura Supabase zostaje gotowa, ale jeszcze nie wymuszona.
- Projekt WOODYBOY ma wpisany moduł template do budowania kolejnych sklepów/witryn.

## Następny krok
Po wgraniu i sprawdzeniu tej paczki można zrobić czyste wdrożenie Supabase:
1. SQL schema.
2. Storage bucket.
3. Wpisanie kluczy do `cloud-config.js`.
4. Test zapisu produktu z panelu.
