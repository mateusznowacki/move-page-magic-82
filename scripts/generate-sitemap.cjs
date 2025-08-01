const fs = require('fs');
const path = require('path');

// Konfiguracja
const BASE_URL = 'https://meisterumzuege24.de';
const OUTPUT_FILE = 'public/sitemap.xml';

// Główne strony
const mainPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/services', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  { url: '/quote', priority: '0.9', changefreq: 'weekly' },
  { url: '/staedte', priority: '0.9', changefreq: 'weekly' },
  { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { url: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
  { url: '/cookie-policy', priority: '0.3', changefreq: 'yearly' }
];

// Kraje związkowe
const states = [
  { slug: 'berlin', name: 'Berlin' },
  { slug: 'brandenburg', name: 'Brandenburg' },
  { slug: 'mecklenburg-western-pomerania', name: 'Mecklenburg-Vorpommern' },
  { slug: 'saxony', name: 'Sachsen' },
  { slug: 'saxony-anhalt', name: 'Sachsen-Anhalt' },
  { slug: 'thuringia', name: 'Thüringen' }
];

// Funkcja do generowania XML sitemap
function generateSitemapXML(urls) {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const urlsetClose = '</urlset>';
  
  const urlEntries = urls.map(url => {
    const lastmod = new Date().toISOString().split('T')[0];
    return `  <url>
    <loc>${BASE_URL}${url.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
  }).join('\n');
  
  return xmlHeader + urlsetOpen + urlEntries + '\n' + urlsetClose;
}

// Funkcja do ładowania miast z pliku JSON
function loadCities(stateSlug) {
  try {
    const filePath = path.join(__dirname, '..', 'public', 'data', 'cities', `${stateSlug}.json`);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Błąd podczas ładowania miast dla ${stateSlug}:`, error.message);
    return [];
  }
}

// Główna funkcja
async function generateSitemap() {
  console.log('Generowanie sitemap...');
  
  const allUrls = [...mainPages];
  
  // Dodaj strony krajów związkowych
  states.forEach(state => {
    allUrls.push({
      url: `/staedte/${state.slug}`,
      priority: '0.8',
      changefreq: 'weekly'
    });
  });
  
  // Dodaj strony miast
  for (const state of states) {
    const cities = loadCities(state.slug);
    
    cities.forEach(city => {
      allUrls.push({
        url: `/staedte/${state.slug}/${city.slug}`,
        priority: '0.7',
        changefreq: 'monthly'
      });
    });
    
    console.log(`Dodano ${cities.length} miast dla ${state.name}`);
  }
  
  // Generuj XML
  const sitemapXML = generateSitemapXML(allUrls);
  
  // Zapisz plik
  fs.writeFileSync(OUTPUT_FILE, sitemapXML, 'utf8');
  
  console.log(`Sitemap wygenerowana: ${OUTPUT_FILE}`);
  console.log(`Łącznie URL-i: ${allUrls.length}`);
  console.log(`- Główne strony: ${mainPages.length}`);
  console.log(`- Kraje związkowe: ${states.length}`);
  console.log(`- Miasta: ${allUrls.length - mainPages.length - states.length}`);
}

// Uruchom skrypt
generateSitemap().catch(console.error); 