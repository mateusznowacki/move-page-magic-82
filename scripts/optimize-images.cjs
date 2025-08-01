const fs = require('fs');
const path = require('path');

// Konfiguracja
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, 'optimized');

// Sprawdź czy katalog optimized istnieje
if (!fs.existsSync(OPTIMIZED_DIR)) {
  fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
  console.log('Utworzono katalog optimized/');
}

// Lista obrazów do optymalizacji
const images = [
  'hero-image-1.jpg',
  'hero-image-2.jpg', 
  'hero-image-3.jpg',
  'meister-umzunge-logo.png',
  'movecompany-in-action.png'
];

console.log('Sprawdzanie obrazów...');

images.forEach(image => {
  const sourcePath = path.join(PUBLIC_DIR, image);
  const optimizedPath = path.join(OPTIMIZED_DIR, image.replace(/\.(jpg|png)$/, '.webp'));
  
  if (fs.existsSync(sourcePath)) {
    const stats = fs.statSync(sourcePath);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`✓ ${image} (${sizeInMB} MB)`);
    
    // Sprawdź czy istnieje już zoptymalizowana wersja
    if (fs.existsSync(optimizedPath)) {
      const optStats = fs.statSync(optimizedPath);
      const optSizeInMB = (optStats.size / (1024 * 1024)).toFixed(2);
      const savings = ((stats.size - optStats.size) / stats.size * 100).toFixed(1);
      console.log(`  → ${path.basename(optimizedPath)} (${optSizeInMB} MB, -${savings}%)`);
    } else {
      console.log(`  → Brak zoptymalizowanej wersji`);
    }
  } else {
    console.log(`✗ ${image} - nie znaleziono`);
  }
});

console.log('\nAby zoptymalizować obrazy, użyj:');
console.log('npm install -g imagemin-cli imagemin-webp');
console.log('imagemin public/*.{jpg,png} --out-dir=public/optimized --plugin=webp'); 