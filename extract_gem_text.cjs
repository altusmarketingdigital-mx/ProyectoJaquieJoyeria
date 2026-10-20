const fs = require('fs');
const html = fs.readFileSync('our_materials.html', 'utf8');

// The page structure has Elementor sections / widgets. Let's extract each gem card/section.
// Let's inspect where "Diamante", "Esmeralda", "Zafiro", "Rubí", "Moissanita", "Apatita", "Amatista", "Peridoto", "Turmalina", "Morganita", "Aguamarina", "Topacio" appear and their accompanying text.

const gemNames = [
  'Diamante',
  'Esmeralda',
  'Zafiro',
  'Rubí',
  'Moissanita',
  'Apatita',
  'Amatista',
  'Peridoto',
  'Turmalina',
  'Morganita',
  'Aguamarina',
  'Topacio'
];

gemNames.forEach(gem => {
  console.log(`\n=================== ${gem.toUpperCase()} ===================`);
  // Find text around the gem name
  const regex = new RegExp(`(<h[2-4][^>]*>\\s*${gem}\\s*<\\/h[2-4]>[\\s\\S]*?)(?=<h[2-4]|$)`, 'i');
  const match = html.match(regex);
  if (match) {
    // clean HTML
    const text = match[1]
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    console.log(text.substring(0, 500));
  } else {
    console.log('Not found with simple heading regex');
  }
});
