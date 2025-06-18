
const canvas = document.getElementById("glyphCanvas");
const ctx = canvas.getContext("2d");
const fontSelect = document.getElementById("fontSelect");
const sizeRange = document.getElementById("sizeRange");
const glyphGrid = document.getElementById("glyphGrid");
const glyphInfo = document.getElementById("glyphInfo");

let currentFont = null;

function loadFont(url) {
  opentype.load(url, function (err, font) {
    if (err) {
      alert("Font could not be loaded: " + err);
      return;
    }
    currentFont = font;
    renderGlyphs(font);
  });
}

function renderGlyphs(font) {
  glyphGrid.innerHTML = "";
  font.glyphs.forEach((glyph) => {
    if (!glyph.unicode) return;
    const div = document.createElement("div");
    div.textContent = glyph.unicode ? String.fromCharCode(glyph.unicode) : "";
    div.onclick = () => inspectGlyph(glyph);
    glyphGrid.appendChild(div);
  });
}

function inspectGlyph(glyph) {
  const size = parseInt(sizeRange.value);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const scale = size / currentFont.unitsPerEm;
  const x = 20;
  const y = 200;
  glyph.draw(ctx, x, y, size);
  glyphInfo.textContent = `${glyph.name || "Unnamed Glyph"} — U+${glyph.unicode.toString(16).toUpperCase().padStart(4, "0")}`;
}

fontSelect.addEventListener("change", (e) => loadFont(e.target.value));
sizeRange.addEventListener("input", () => {
  const selected = document.querySelector(".grid div.selected");
  if (selected) {
    const index = Array.from(glyphGrid.children).indexOf(selected);
    inspectGlyph(currentFont.glyphs.get(index));
  }
});

loadFont(fontSelect.value);
