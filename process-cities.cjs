const fs = require('fs');
const path = require('path');

// Funkcja do tworzenia slug z nazwy
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[äöüß]/g, (match) => {
      const replacements = { 'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss' };
      return replacements[match];
    })
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

// Funkcja do grupowania miast według landów
function groupCitiesByState(cities) {
  const grouped = {};
  
  cities.forEach(city => {
    const state = city.state;
    if (!grouped[state]) {
      grouped[state] = [];
    }
    
    // Dodaj tylko name i slug
    grouped[state].push({
      name: city.name,
      slug: createSlug(city.name)
    });
  });
  
  return grouped;
}

// Funkcja do zapisywania plików
function saveStateFiles(groupedCities) {
  const outputDir = path.join(__dirname, 'public', 'data', 'cities');
  
  // Upewnij się, że katalog istnieje
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Zapisz pliki dla każdego landu
  Object.keys(groupedCities).forEach(state => {
    const stateSlug = createSlug(state);
    const filename = `${stateSlug}.json`;
    const filepath = path.join(outputDir, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(groupedCities[state], null, 2));
    console.log(`Zapisano: ${filename} (${groupedCities[state].length} miast)`);
  });
  
  // Zapisz plik ze wszystkimi miastami
  const allCities = Object.values(groupedCities).flat();
  const allCitiesPath = path.join(outputDir, 'all-cities.json');
  fs.writeFileSync(allCitiesPath, JSON.stringify(allCities, null, 2));
  console.log(`Zapisano: all-cities.json (${allCities.length} miast)`);
}

// Funkcja do wczytywania danych z pliku
function loadCitiesFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Błąd podczas wczytywania pliku ${filePath}:`, error.message);
    return null;
  }
}

// Główna funkcja
function processCities(inputFile = null) {
  console.log('Przetwarzanie danych miast...');
  
  let cities;
  
  if (inputFile && fs.existsSync(inputFile)) {
    console.log(`Wczytywanie danych z pliku: ${inputFile}`);
    cities = loadCitiesFromFile(inputFile);
    if (!cities) {
      console.error('Nie udało się wczytać danych z pliku.');
      return;
    }
  } else {
    // Użyj przykładowych danych
    console.log('Używanie przykładowych danych...');
    cities = [
      {
        "area": "160.85",
        "coords": {
          "lat": "50.77556",
          "lon": "6.08361"
        },
        "district": "Aachen",
        "name": "Aachen",
        "population": "248878",
        "state": "North Rhine-Westphalia"
      },
      {
        "area": "219.35",
        "coords": {
          "lat": "51.22556",
          "lon": "6.78278"
        },
        "district": "Düsseldorf",
        "name": "Düsseldorf",
        "population": "619294",
        "state": "North Rhine-Westphalia"
      },
      {
        "area": "405.02",
        "coords": {
          "lat": "50.93333",
          "lon": "6.95"
        },
        "district": "Cologne",
        "name": "Cologne",
        "population": "1085664",
        "state": "North Rhine-Westphalia"
      },
      {
        "area": "281.05",
        "coords": {
          "lat": "52.51667",
          "lon": "13.38333"
        },
        "district": "Berlin",
        "name": "Berlin",
        "population": "3669491",
        "state": "Berlin"
      },
      {
        "area": "310.43",
        "coords": {
          "lat": "48.13513",
          "lon": "11.58198"
        },
        "district": "Munich",
        "name": "Munich",
        "population": "1484226",
        "state": "Bavaria"
      },
      {
        "area": "755.22",
        "coords": {
          "lat": "53.55056",
          "lon": "9.99333"
        },
        "district": "Hamburg",
        "name": "Hamburg",
        "population": "1841179",
        "state": "Hamburg"
      }
    ];
  }
  
  console.log(`Przetwarzanie ${cities.length} miast...`);
  
  // Grupuj miasta według landów
  const groupedCities = groupCitiesByState(cities);
  
  // Zapisz pliki
  saveStateFiles(groupedCities);
  
  console.log('Zakończono przetwarzanie!');
}

// Sprawdź argumenty wiersza poleceń
const inputFile = process.argv[2];

// Uruchom skrypt
processCities(inputFile); 