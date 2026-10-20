const fs = require('fs');
const https = require('https');
const path = require('path');

const gems = [
  { name: 'Diamante', file: 'diamante.jpg', url: '/wp-content/uploads/2024/07/DIAMANTE.jpg' },
  { name: 'Esmeralda', file: 'esmeralda.jpg', url: '/wp-content/uploads/2024/07/ESMERALDA.jpg' },
  { name: 'Zafiro', file: 'zafiro.jpg', url: '/wp-content/uploads/2024/07/ZAFIRO-1.jpg' },
  { name: 'Rubí', file: 'rubi.jpg', url: '/wp-content/uploads/2024/07/RUBI.jpg' },
  { name: 'Moissanita', file: 'moissanita.jpg', url: '/wp-content/uploads/2024/07/MOISSANITA.jpg' },
  { name: 'Apatita', file: 'apatita.jpg', url: '/wp-content/uploads/2024/07/APATITA.jpg' },
  { name: 'Amatista', file: 'amatista.jpg', url: '/wp-content/uploads/2024/07/AMATISTA.jpg' },
  { name: 'Peridoto', file: 'peridoto.jpg', url: '/wp-content/uploads/2024/07/PERIDOTO.jpg' },
  { name: 'Turmalina', file: 'turmalina.jpg', url: '/wp-content/uploads/2024/07/TURMALINA.jpg' },
  { name: 'Morganita', file: 'morganita.jpg', url: '/wp-content/uploads/2024/07/MORGANITA.jpg' },
  { name: 'Aguamarina', file: 'aguamarina.jpg', url: '/wp-content/uploads/2024/07/AGUAMARINA.jpg' },
  { name: 'Topacio', file: 'topacio.jpg', url: '/wp-content/uploads/2024/07/TOPACIO.jpg' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const fullUrl = url.startsWith('http') ? url : 'https://www.jacquelinetapiajoyeria.com' + url;
    https.get(fullUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to get ${fullUrl}: ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

async function run() {
  const destDir = path.join(__dirname, 'public', 'images', 'gemas');
  for (const g of gems) {
    const dest = path.join(destDir, g.file);
    console.log(`Downloading ${g.name} -> ${g.file}...`);
    try {
      await download(g.url, dest);
      console.log(`Saved ${g.file}`);
    } catch (e) {
      console.error(`Error downloading ${g.file}:`, e.message);
    }
  }
  console.log('All downloads finished.');
}

run();
