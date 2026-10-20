const fs = require('fs');
const html = fs.readFileSync('our_materials.html', 'utf8');

// Find all text and images for the gems
const gems = [
  { name: 'Diamante', type: 'Piedra Preciosa', key: 'diamante', imgMatch: 'DIAMANTE' },
  { name: 'Esmeralda', type: 'Piedra Preciosa', key: 'esmeralda', imgMatch: 'ESMERALDA' },
  { name: 'Zafiro', type: 'Piedra Preciosa', key: 'zafiro', imgMatch: 'ZAFIRO' },
  { name: 'Rubí', type: 'Piedra Preciosa', key: 'rubi', imgMatch: 'RUBI' },
  { name: 'Moissanita', type: 'Piedra Semi preciosa', key: 'moissanita', imgMatch: 'MOISSANITA' },
  { name: 'Apatita', type: 'Piedra Semi preciosa', key: 'apatita', imgMatch: 'APATITA' },
  { name: 'Amatista', type: 'Piedra Semi preciosa', key: 'amatista', imgMatch: 'AMATISTA' },
  { name: 'Peridoto', type: 'Piedra Semi preciosa', key: 'peridoto', imgMatch: 'PERIDOTO' },
  { name: 'Turmalina', type: 'Piedra Semi preciosa', key: 'turmalina', imgMatch: 'TURMALINA' },
  { name: 'Morganita', type: 'Piedra Semi preciosa', key: 'morganita', imgMatch: 'MORGANITA' },
  { name: 'Aguamarina', type: 'Piedra Semi preciosa', key: 'aguamarina', imgMatch: 'AGUAMARINA' },
  { name: 'Topacio', type: 'Piedra Semi preciosa', key: 'topacio', imgMatch: 'TOPACIO' },
];

// Let's find image URLs in HTML
gems.forEach(g => {
  const reg = new RegExp(`src="([^"]*${g.imgMatch}[^"]*)"`, 'i');
  const m = html.match(reg);
  g.imgUrl = m ? m[1] : '';
});

console.log(JSON.stringify(gems, null, 2));

// Check intro or top banner text in our_materials.html
const introRegex = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
console.log('H1:', html.match(introRegex));
