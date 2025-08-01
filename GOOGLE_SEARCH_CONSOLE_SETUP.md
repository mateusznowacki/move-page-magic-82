# Google Search Console Setup Guide

## 1. Weryfikacja własności strony

### Metoda 1: Meta Tag (Zalecana)
1. Przejdź do [Google Search Console](https://search.google.com/search-console)
2. Dodaj nową własność: `https://meisterumzuege24.de`
3. Wybierz metodę weryfikacji "HTML tag"
4. Skopiuj kod weryfikacyjny (np. `<meta name="google-site-verification" content="abc123..." />`)
5. Zastąp `YOUR_VERIFICATION_CODE` w pliku `index.html` rzeczywistym kodem
6. Wdróż zmiany na serwerze
7. Kliknij "Verify" w Google Search Console

### Metoda 2: Plik HTML
1. Pobierz plik weryfikacyjny z Google Search Console
2. Umieść go w folderze `public/` jako `google123abc.html`
3. Wdróż na serwerze
4. Sprawdź dostępność pod `https://meisterumzuege24.de/google123abc.html`

## 2. Dodanie sitemap.xml

1. Po weryfikacji przejdź do "Sitemaps" w menu bocznym
2. Dodaj sitemap: `https://meisterumzuege24.de/sitemap.xml`
3. Kliknij "Submit"

## 3. Konfiguracja ustawień

### Ustawienia międzynarodowe
1. Przejdź do "International targeting"
2. Dodaj hreflang tags dla wszystkich wersji językowych:
   - `de` (Niemiecki) - domyślny
   - `pl` (Polski)
   - `en` (Angielski)
   - `es` (Hiszpański)

### Ustawienia robots.txt
1. Sprawdź czy `robots.txt` jest poprawnie indeksowany
2. Zweryfikuj czy sitemap jest dostępny

## 4. Monitorowanie wydajności

### Sprawdź indeksowanie
1. Użyj "URL Inspection" aby sprawdzić status poszczególnych stron
2. Monitoruj "Coverage" aby zobaczyć błędy indeksowania

### Analiza wydajności
1. Sprawdź "Performance" aby zobaczyć dane o ruchu organicznym
2. Monitoruj "Core Web Vitals" dla wydajności strony

## 5. Dodatkowe ustawienia

### Enhanced reporting
1. Włącz "Enhanced reporting" dla lepszych danych
2. Skonfiguruj "Data streams" jeśli planujesz używać Google Analytics

### Security & Manual actions
1. Regularnie sprawdzaj "Security & Manual actions"
2. Upewnij się, że nie ma żadnych ręcznych akcji przeciwko stronie

## 6. Regularne zadania

### Co tydzień:
- Sprawdź raporty wydajności
- Monitoruj błędy indeksowania
- Sprawdź nowe linki zwrotne

### Co miesiąc:
- Aktualizuj sitemap.xml
- Sprawdź Core Web Vitals
- Analizuj słowa kluczowe

## 7. Przydatne linki

- [Google Search Console](https://search.google.com/search-console)
- [Google Search Console Help](https://support.google.com/webmasters/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

## 8. Ważne uwagi

- Upewnij się, że strona jest dostępna przez HTTPS
- Sprawdź czy wszystkie strony mają unikalne tytuły i opisy
- Monitoruj prędkość ładowania strony
- Regularnie aktualizuj treść na stronie 