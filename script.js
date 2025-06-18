const styleSelector = document.getElementById('styleSelector');
const sizeSlider = document.getElementById('sizeSlider');
const glyphGrid = document.getElementById('glyphGrid');
const canvas = document.getElementById('glyphCanvas');
const ctx = canvas.getContext('2d');
const meta = document.getElementById('glyphMeta');

let currentFont = null;

function loadFont(style) {
  opentype.load('fonts/' + style, (err, font) => {
    if (err) {
      alert('Font could not be loaded: ' + err);
      return;
    }
    currentFont = font;
    drawGrid();
  });
}

function drawGrid() {
  glyphGrid.innerHTML = '';
  if (!currentFont) return;
  currentFont.glyphs.forEach((glyph, index) => {
    if (glyph.unicode) {
      const div = document.createElement('div');
      div.className = 'glyphBox';
      div.textContent = String.fromCharCode(glyph.unicode);
      div.onclick = () => showGlyph(glyph);
      div.style.fontSize = sizeSlider.value + 'px';
      div.style.fontFamily = 'CustomFont';
      glyphGrid.appendChild(div);
    }
  });
}

function showGlyph(glyph) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  glyph.draw(ctx, 20, 200, 180);
  meta.textContent = `Unicode: U+${glyph.unicode?.toString(16).toUpperCase()}`;
}

styleSelector.onchange = () => loadFont(styleSelector.value);
sizeSlider.oninput = () => drawGrid();

loadFont(styleSelector.value);
