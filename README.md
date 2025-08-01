# Meister Umzüge 24 - Professional Moving Services

Professional moving services website for 6 German federal states with 587 cities coverage.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes sitemap generation)
- `npm run build:dev` - Build for development
- `npm run build:prod` - Clean build with production dependencies
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run generate-sitemap` - Generate sitemap.xml
- `npm run optimize-images` - Check image optimization status
- `npm run analyze` - Analyze bundle size
- `npm run clean` - Clean build artifacts

## 🏗️ Project Structure

```
├── public/                 # Static assets
│   ├── data/cities/       # City data JSON files
│   ├── optimized/         # Optimized images (WebP)
│   └── sitemap.xml        # Generated sitemap
├── scripts/               # Build scripts
│   ├── generate-sitemap.cjs
│   └── optimize-images.cjs
├── src/                   # Source code
│   ├── components/        # React components
│   ├── contexts/          # React contexts
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilities
│   ├── pages/            # Page components
│   └── ui/               # UI components
└── dist/                 # Build output
```

## 🎯 Features

- **Multi-language support** (DE, EN, PL, ES)
- **SEO optimized** with dynamic meta tags
- **Responsive design** with Tailwind CSS
- **PWA ready** with service worker
- **City-specific pages** for 587 German cities
- **Automatic sitemap generation**
- **Image optimization** (WebP format)
- **Bundle optimization** with code splitting

## 🔧 Build Optimization

The project includes several optimizations:

- **Code splitting** with manual chunks
- **Image optimization** to WebP format
- **CSS minification** and code splitting
- **JavaScript minification** with Terser
- **Automatic sitemap generation**
- **Bundle analysis** tools

## 📊 Performance

- **Bundle size**: ~1.8MB (gzipped: ~500KB)
- **Cities covered**: 587 cities in 6 German states
- **SEO pages**: 602 total URLs in sitemap
- **Image savings**: 80-99% reduction with WebP

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
