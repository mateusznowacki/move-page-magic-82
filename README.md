# MP Transporte und Umzüge - Website

Profesjonalna strona internetowa firmy przeprowadzkowej MP Transporte und Umzüge z siedzibą w Berlinie.

## 🚀 Funkcje

- **Wielojęzyczność**: Polski, Niemiecki, Angielski, Hiszpański
- **Responsywny design**: Dostosowany do wszystkich urządzeń
- **Mapy interaktywne**: Mapbox z obszarami działania
- **Formularz kontaktowy**: Integracja z WhatsApp
- **SEO zoptymalizowany**: Strukturalne dane i meta tagi
- **Strony prawne**: Polityka prywatności, regulamin, polityka cookies

## 🛠️ Technologie

- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- Mapbox GL JS
- Lucide React Icons

## 📦 Instalacja

```bash
# Klonowanie repozytorium
git clone [repository-url]
cd meisterumzuege24.de

# Instalacja zależności
npm install

# Uruchomienie w trybie deweloperskim
npm run dev
```

## 🐳 Docker Deployment

### Podstawowy deployment

```bash
# Budowanie obrazu
docker build -t meisterumzuege24 .

# Uruchomienie kontenera
docker run -d -p 80:80 --name meisterumzuege24-web meisterumzuege24
```

### Z docker-compose

```bash
# Uruchomienie aplikacji
docker-compose up -d

# Z SSL (wymaga certyfikatów w folderze ./ssl)
docker-compose --profile ssl up -d
```

### Struktura plików SSL

```
ssl/
├── cert.pem    # Certyfikat SSL
└── key.pem     # Klucz prywatny
```

## 🌐 Dostępne ścieżki

- `/` - Strona główna
- `/dienstleistungen` - Usługi
- `/einsatzgebiete` - Obszary działania
- `/angebot` - Wycena
- `/privacy-policy` - Polityka prywatności
- `/terms-of-service` - Regulamin
- `/cookie-policy` - Polityka cookies

## 🔧 Konfiguracja

### Zmienne środowiskowe

```bash
# Mapbox API Key
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token

# Google Analytics
VITE_GA_MEASUREMENT_ID=your_ga_id
```

### Nginx konfiguracja

Aplikacja używa nginx jako serwera produkcyjnego z:
- Kompresją gzip
- Cache'owaniem statycznych plików
- Nagłówkami bezpieczeństwa
- Obsługą SPA routing
- Health check endpoint

## 📊 Monitoring

- Health check: `GET /health`
- Logi nginx: `/var/log/nginx/`
- Docker logs: `docker logs meisterumzuege24-web`

## 🔒 Bezpieczeństwo

- Nagłówki bezpieczeństwa (HSTS, XSS Protection, etc.)
- Rate limiting
- Blokowanie dostępu do ukrytych plików
- SSL/TLS konfiguracja

## 📝 Licencja

Wszystkie prawa zastrzeżone - MP Transporte und Umzüge 2025
