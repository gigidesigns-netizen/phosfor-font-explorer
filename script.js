
let font = null;
let fontSize = 64;
let glyphCanvas, ctx;

function loadFont(styleFile) {
  opentype.load('fonts/' + styleFile, function(err, f) {
    if (err) {
      alert('Font could not be loaded: ' + err);
    } else {
      font = f;
      renderGrid();
    }
  });
}

function renderGrid() {
  const grid = document.getElementById("charGrid");
  if (!grid) return;
  grid.innerHTML = '';
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:;!?()[]{}*&@#%$+-=/\\|^~<>\"'`".split('');
  characters.forEach(char => {
    const div = document.createElement("div");
    div.className = "char-box";
    div.textContent = char;
    div.onclick = () => showGlyph(char);
    grid.appendChild(div);
  });
}

function showGlyph(char) {
  if (!font) return;
  ctx.clearRect(0, 0, glyphCanvas.width, glyphCanvas.height);
  const glyph = font.charToGlyph(char);
  const x = 20, y = 120;
  glyph.draw(ctx, x, y, fontSize);
  const unicodeHex = glyph.unicode ? 'U+' + glyph.unicode.toString(16).toUpperCase().padStart(4, '0') : '';
  document.getElementById("glyphLabel").textContent = `${char} ${unicodeHex}`;
}

window.onload = () => {
  glyphCanvas = document.getElementById("glyphCanvas");
  ctx = glyphCanvas.getContext("2d");

  document.getElementById("fontStyle").onchange = (e) => {
    loadFont(e.target.value);
  };

  document.getElementById("sizeSlider").oninput = (e) => {
    fontSize = parseInt(e.target.value);
  };

  loadFont(document.getElementById("fontStyle").value);
};
