
const fontMap = {
  PhosforAether5Pixel: 'fonts/PhosforAether5Pixel.woff2',
  PhosforAether6Medium: 'fonts/PhosforAether6Medium.woff2',
  PhosforAether7Bold: 'fonts/PhosforAether7Bold.woff2'
};

let font;
const grid = document.getElementById('glyphGrid');
const canvas = document.getElementById('glyphCanvas');
const ctx = canvas.getContext('2d');
const fontSelect = document.getElementById('fontSelect');
const sizeSlider = document.getElementById('sizeSlider');

function renderGlyphs() {
  grid.innerHTML = '';
  font.glyphs.forEach((glyph) => {
    if (glyph.unicode) {
      const span = document.createElement('span');
      span.textContent = String.fromCharCode(glyph.unicode);
      span.title = glyph.name;
      span.onclick = () => showGlyph(glyph);
      span.style.fontFamily = font.names.fullName.en;
      span.style.fontSize = sizeSlider.value + 'px';
      grid.appendChild(span);
    }
  });
}

function showGlyph(glyph) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  glyph.draw(ctx, 50, 200, 150);
  document.getElementById('glyphName').textContent = 
    glyph.name + ' (U+' + glyph.unicode.toString(16).toUpperCase().padStart(4, '0') + ')';
}

function loadFont(fontId) {
  opentype.load(fontMap[fontId], (err, f) => {
    if (err) {
      alert('Font could not be loaded: ' + err);
    } else {
      font = f;
      renderGlyphs();
    }
  });
}

fontSelect.addEventListener('change', () => loadFont(fontSelect.value));
sizeSlider.addEventListener('input', () => renderGlyphs());

loadFont(fontSelect.value);
