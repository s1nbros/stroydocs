"""Generate the Stroydocs logo set as outlined SVGs."""
import io
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

HERE = Path(__file__).parent
OUT = HERE.parent.parent / "public" / "brand"
OUT.mkdir(parents=True, exist_ok=True)

NAVY, NAVY_2, CREAM, BRASS, BRASS_D, SLATE = "#0d1522", "#1a2740", "#f4efe4", "#c8963e", "#a8792c", "#8a96a8"


def text_path(font_file: str, text: str, size: float, x: float, baseline: float, tracking: float = 0.0):
    """Return (svg path d, advance width) for text set at `size` px with its baseline at `baseline`."""
    data = (HERE / font_file).read_bytes()
    tt = TTFont(io.BytesIO(data))
    upem = tt["head"].unitsPerEm
    face = hb.Face(tt.reader.file.getvalue() if False else _sfnt_bytes(tt))
    font = hb.Font(face)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(font, buf, {"kern": True, "liga": True, "locl": False})
    glyph_set = tt.getGlyphSet()
    order = tt.getGlyphOrder()
    scale = size / upem
    pen = SVGPathPen(glyph_set)
    cursor = 0.0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        name = order[info.codepoint]
        gx = x + (cursor + pos.x_offset) * scale
        # font units are y-up; SVG is y-down
        glyph_set[name].draw(TransformPen(pen, (scale, 0, 0, -scale, gx, baseline - pos.y_offset * scale)))
        cursor += pos.x_advance + tracking * upem
    return pen.getCommands(), cursor * scale


def _sfnt_bytes(tt: TTFont) -> bytes:
    """woff2 -> plain sfnt bytes that HarfBuzz can read."""
    tt.flavor = None
    b = io.BytesIO()
    tt.save(b)
    return b.getvalue()


def mark(x=0.0, y=0.0, s=1.0, sheet=CREAM, ink=NAVY, ring=NAVY) -> str:
    """The symbol on a 64×64 grid: a document sheet with a folded corner; inside it a tower crane
    over a building with windows; a brass seal with a check on the corner (approved / ready to sign)."""
    t = f'transform="translate({x} {y}) scale({s})"'
    windows = "".join(
        f'<rect x="{wx}" y="{wy}" width="2.4" height="3" rx="0.4" fill="{sheet}"/>'
        for wy in (32.5, 38) for wx in (23.2, 27.1, 31)
    )
    return f"""<g {t}>
    <path d="M13 4h24.5L52 18.5V56a4 4 0 0 1-4 4H13a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z" fill="{sheet}"/>
    <path d="M37.5 4v10.5a4 4 0 0 0 4 4H52Z" fill="{BRASS}"/>
    <rect x="15" y="12" width="2.8" height="39" rx="0.6" fill="{ink}"/>
    <rect x="13" y="11.2" width="24" height="2.6" rx="1.3" fill="{ink}"/>
    <path d="M16.4 11.2 20.5 7.6 24.6 11.2" fill="none" stroke="{ink}" stroke-width="1.6" stroke-linejoin="round"/>
    <rect x="31.2" y="13.8" width="1.2" height="7.4" fill="{ink}"/>
    <rect x="29.2" y="21" width="5.2" height="2.6" rx="0.6" fill="{BRASS}"/>
    <rect x="20.5" y="29" width="15.5" height="21.5" rx="1" fill="{ink}"/>
    {windows}
    <rect x="26.4" y="44" width="3.8" height="6.5" rx="0.5" fill="{sheet}"/>
    <rect x="12.5" y="50.5" width="27" height="2.6" rx="1.3" fill="{ink}"/>
    <circle cx="49" cy="49" r="10.5" fill="{BRASS}" stroke="{ring}" stroke-width="3"/>
    <path d="m44.2 49.3 3.2 3.2 6.2-6.8" fill="none" stroke="{NAVY}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
  </g>"""


def lockup(theme: str) -> str:
    dark = theme == "dark"
    word = CREAM if dark else NAVY
    tag = SLATE if dark else "#5a667a"
    bg = ""  # transparent: sits on any dark or light surface
    # On light backgrounds the mark inverts: navy sheet, cream drawing, white ring around the seal
    m = mark(18, 16, 1.5, sheet=CREAM, ink=NAVY, ring=NAVY) if dark else mark(18, 16, 1.5, sheet=NAVY, ink=CREAM, ring="#ffffff")
    tx = 140
    stroy, w1 = text_path("serif.woff2", "Stroy", 62, tx, 70)
    docs, w2 = text_path("serif.woff2", "Docs", 62, tx + w1, 70)
    tagline, w3 = text_path("mono.woff2", "КСС · АКТОВЕ · ОФЕРТИ", 14, tx + 2, 108, tracking=0.12)
    width = round(tx + max(w1 + w2, w3) + 28)
    rule = f'<rect x="{tx + 2}" y="88" width="34" height="2" rx="1" fill="{BRASS}"/>'
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} 128" width="{width}" height="128">
  <title>StroyDocs</title>
  {bg}
  {m}
  <path d="{stroy}" fill="{word}"/>
  <path d="{docs}" fill="{BRASS}"/>
  {rule}
  <path d="{tagline}" fill="{tag}"/>
</svg>
"""


def mark_svg(bg: bool) -> str:
    back = f'<rect width="64" height="64" rx="14" fill="{NAVY}"/>' if bg else ""
    inner = mark(6, 6, 52 / 64) if bg else mark()
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">\n  <title>StroyDocs</title>\n  {back}\n  {inner}\n</svg>\n'


files = {
    "stroydocs-logo-dark.svg": lockup("dark"),
    "stroydocs-logo-light.svg": lockup("light"),
    "stroydocs-mark.svg": mark_svg(bg=False),
    "stroydocs-app-icon.svg": mark_svg(bg=True),
}
for name, svg in files.items():
    (OUT / name).write_text(svg)
    print(name, len(svg), "bytes")


def favicon_svg() -> str:
    """Simplified mark for 16–32 px: no windows or cab details, heavier strokes, bigger seal."""
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <title>StroyDocs</title>
  <rect width="64" height="64" rx="14" fill="{NAVY}"/>
  <path d="M12 6h26l14 14v34a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4Z" fill="{CREAM}"/>
  <path d="M38 6v10a4 4 0 0 0 4 4h10Z" fill="{BRASS}"/>
  <rect x="13" y="13" width="4.5" height="38" rx="1" fill="{NAVY}"/>
  <rect x="11" y="12" width="25" height="4.5" rx="2.2" fill="{NAVY}"/>
  <rect x="21" y="29" width="15" height="22" rx="1.2" fill="{NAVY}"/>
  <circle cx="47" cy="47" r="12" fill="{BRASS}" stroke="{NAVY}" stroke-width="3.5"/>
  <path d="m41.5 47.3 3.8 3.8 7-7.6" fill="none" stroke="{NAVY}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
"""


(OUT / "stroydocs-favicon.svg").write_text(favicon_svg())
print("stroydocs-favicon.svg")
