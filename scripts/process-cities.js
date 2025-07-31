import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Wczytaj dane z gotowego pliku JSON
const citiesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../temp-cities/germany.json'), 'utf8'));

// Mapowanie nazw landów na niemieckie
const stateMapping = {
  'Baden-Württemberg': 'Baden-Württemberg',
  'Bavaria': 'Bayern',
  'Berlin': 'Berlin',
  'Brandenburg': 'Brandenburg',
  'Bremen': 'Bremen',
  'Hamburg': 'Hamburg',
  'Hesse': 'Hessen',
  'Lower Saxony': 'Niedersachsen',
  'Mecklenburg-Vorpommern': 'Mecklenburg-Vorpommern',
  'Mecklenburg-Western Pomerania': 'Mecklenburg-Vorpommern',
  'North Rhine-Westphalia': 'Nordrhein-Westfalen',
  'Rhineland-Palatinate': 'Rheinland-Pfalz',
  'Saarland': 'Saarland',
  'Saxony': 'Sachsen',
  'Saxony-Anhalt': 'Sachsen-Anhalt',
  'Schleswig-Holstein': 'Schleswig-Holstein',
  'Thuringia': 'Thüringen'
};

// Funkcja do tworzenia slug
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

// Grupuj miasta według landów
const citiesByState = {};

citiesData.forEach(city => {
  const germanState = stateMapping[city.state];
  if (!germanState) {
    console.warn(`Nieznany land: ${city.state}`);
    return;
  }

  if (!citiesByState[germanState]) {
    citiesByState[germanState] = [];
  }

  // Filtruj tylko miasta z populacją >= 20,000 (Mittelstädte i Großstädte)
  if (parseInt(city.population) >= 20000) {
    citiesByState[germanState].push({
      name: city.name,
      slug: createSlug(city.name),
      population: parseInt(city.population),
      district: city.district,
      coords: city.coords,
      area: parseFloat(city.area)
    });
  }
});

// Sortuj miasta w każdym landzie według populacji (malejąco)
Object.keys(citiesByState).forEach(state => {
  citiesByState[state].sort((a, b) => b.population - a.population);
});

// Zapisz dane do plików JSON
const outputDir = path.join(__dirname, '../public/data/cities');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Zapisz wszystkie miasta razem
fs.writeFileSync(
  path.join(outputDir, 'all-cities.json'),
  JSON.stringify(citiesByState, null, 2)
);

// Zapisz osobne pliki dla każdego landu
Object.keys(citiesByState).forEach(state => {
  const stateSlug = createSlug(state);
  fs.writeFileSync(
    path.join(outputDir, `${stateSlug}.json`),
    JSON.stringify(citiesByState[state], null, 2)
  );
});

// Statystyki
console.log('Przetworzono miasta:');
Object.keys(citiesByState).forEach(state => {
  console.log(`${state}: ${citiesByState[state].length} miast`);
});

console.log(`\nPliki zapisane w: ${outputDir}`); 