const fs = require('fs');

const html = fs.readFileSync('our_materials.html', 'utf8');

// Search headings, paragraphs, images in our_materials.html
// Let's find sections or headings like Diamante, Moissanita, Zafiro, Esmeralda, Rubí, etc.
const headings = html.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi) || [];
console.log('--- HEADINGS ---');
headings.forEach(h => {
  const clean = h.replace(/<[^>]+>/g, '').trim();
  if (clean) console.log(clean);
});

// Let's also look for images associated with materials/gemas
const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/gi;
let match;
const images = [];
while ((match = imgRegex.exec(html)) !== null) {
  images.push(match[1]);
}
console.log('--- IMAGES SAMPLE ---', images.slice(0, 20));
