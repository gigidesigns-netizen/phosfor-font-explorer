const fontMap = {
  'Aether 5 Pixel': 'PhosforAether5Pixel',
  'Aether 6 Medium': 'PhosforAether6Medium',
  'Aether 7 Bold': 'PhosforAether7Bold'
};

const fontFileMap = {
  'Aether 5 Pixel': 'fonts/Phosfor-Aether5Pixel.otf',
  'Aether 6 Medium': 'fonts/Phosfor-Aether6Medium.otf',
  'Aether 7 Bold': 'fonts/Phosfor-Aether7Bold.otf'
};

const dropdown = document.getElementById('fontSelector');
const grid = document.querySelector('.grid');
const inspector = document.getElementById('inspector');
const canvas = document.getElementById('glyphCanvas');
const ctx = canvas.getContext('2d');
const slider = document.getElementById('sizeSlider');

let currentFont = null;
let fontSize = 36;

// Handle dropdown change
dropdown.addEventListener('change', () => {
  const selected = dropdown.value;
  document.documentElement.style.setProperty('--font-family', fontMap[selected]);
  loadFont(fontFileMap[selected]);
});

// Handle font size change
slider.addEventListener('input', () => {
  fontSize = parseInt(slider.value);
  renderGrid(currentFont);
});

// Load font file and render grid
function loadFont(fontPath) {
  opentype.load(fontPath, (err, font) => {
    if (err) {
      alert('Font could not be loaded: ' + err.message);
      return;
    }
    currentFont = font;
    renderGrid(font);
  });
}

// Render all glyphs in the font
function renderGrid(font) {
  if (!font) return;
  grid.innerHTML = '';

  font.glyphs.forEach(glyph => {
    if (!glyph.unicode) return;

    const div = document.createElement('div');
    div.textContent = String.fromCharCode(glyph.unicode);
    div.addEventListener('click', () => inspectGlyph(glyph));
    grid.appendChild(div);
  });
}

// Display a single glyph in the inspector canvas
function inspectGlyph(glyph) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const scale = fontSize / currentFont.unitsPerEm;
  const x = 20;
  const y = canvas.height / 2 + fontSize / 2;

  glyph.draw(ctx, x, y, fontSize);
  inspector.querySelector('p').textContent = `Glyph ID: ${glyph.index} | Unicode: ${glyph.unicode || 'N/A'}`;
}

// Load default font on startup
document.addEventListener('DOMContentLoaded', () => {
  const defaultOption = dropdown.value;
  document.documentElement.style.setProperty('--font-family', fontMap[defaultOption]);
  loadFont(fontFileMap[defaultOption]);
});
