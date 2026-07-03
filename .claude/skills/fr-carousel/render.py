#!/usr/bin/env python3
"""Render a French Roofing carousel's slides.json to branded PNGs.

Usage: python3 render.py <carousel-folder> [--size=portrait|square|landscape]
  portrait  1080x1350 (4:5)  -> slides/           Instagram carousel
  square    1080x1080 (1:1)  -> slides-square/    Facebook multi-photo + LinkedIn PDF
  landscape 1200x900  (4:3)  -> slides-landscape/ Google Business Profile single image

Deterministic: same slides.json -> same pixels. Edit slides.json and re-run.
Adapted from the Sagareus saga-carousel renderer; brand tokens from assets/tokens.json.
"""
import json
import os
import subprocess
import sys
import tempfile

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# French Roofing tokens (assets/tokens.json, 2026-05-06)
YELLOW = "#FFBD59"   # primary accent
ORANGE = "#D85024"   # secondary (sparingly)
BLUE = "#092E5E"     # deep ground, headings
GREY = "#3E3D3B"     # body text
CREAM = "#F5F1EA"    # cards
BG = "#FDFCFA"       # warm off-white
WHITE = "#FFFFFF"

SIZES = {
    "portrait":  {"w": 1080, "h": 1350, "pad": "96px 88px 72px", "scale": 1.0,  "dir": "slides"},
    "square":    {"w": 1080, "h": 1080, "pad": "80px 84px 64px", "scale": 0.86, "dir": "slides-square"},
    "landscape": {"w": 1200, "h": 900,  "pad": "68px 92px 56px", "scale": 0.82, "dir": "slides-landscape"},
}

FONT_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))))), "assets", "Inter-Variable.ttf")

PAGE = """<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face {{
    font-family:'Inter'; src:url('file://__FONT_PATH__') format('truetype');
    font-weight:100 900;
  }}
  * {{ margin:0; padding:0; box-sizing:border-box; }}
  html,body {{ width:{w}px; height:{h}px; overflow:hidden; }}
  body {{
    font-family:'Inter',-apple-system,sans-serif;
    background:{bg}; color:{fg};
    display:flex; flex-direction:column;
    padding:{pad};
  }}
  .rule {{ width:120px; height:8px; background:{accent}; border-radius:4px; }}
  .counter {{ font-size:30px; font-weight:600; letter-spacing:.14em; color:{muted}; }}
  .top {{ display:flex; justify-content:space-between; align-items:center; }}
  .main {{ flex:1; display:flex; flex-direction:column; justify-content:center; gap:{gap}px; }}
  h1 {{ font-size:{hsize}px; line-height:1.12; font-weight:800; letter-spacing:-0.015em; }}
  p  {{ font-size:{psize}px; line-height:1.42; font-weight:500; color:{body_fg}; max-width:{pmax}px; }}
  .foot {{ display:flex; justify-content:space-between; align-items:baseline; }}
  .wordmark {{ font-size:32px; font-weight:800; letter-spacing:.22em; }}
  .tag {{ font-size:26px; font-weight:500; letter-spacing:.06em; color:{muted}; }}
  .swipe {{ font-size:30px; font-weight:700; letter-spacing:.1em; color:{accent}; }}
</style></head><body>
  <div class="top"><div class="rule"></div><div class="counter">{counter}</div></div>
  <div class="main"><h1>{header}</h1>{body_html}</div>
  <div class="foot"><div class="wordmark">FRENCH ROOFING</div><div class="{foot_right_class}">{foot_right}</div></div>
</body></html>""".replace("__FONT_PATH__", FONT_PATH)


def slide_html(slide, idx, total, size):
    kind = slide.get("type", "content")
    header = slide["header"]
    body = slide.get("body", "")
    counter = "" if size["dir"] == "slides-landscape" else f"{idx:02d} / {total:02d}"
    sc = size["scale"]
    if kind in ("hook", "cta"):
        bg, fg, muted = BLUE, BG, "rgba(253,252,250,.6)"
        accent, body_fg = YELLOW, "rgba(253,252,250,.9)"
    else:
        bg, fg, muted = (CREAM if idx % 2 == 0 else WHITE), BLUE, GREY
        accent, body_fg = YELLOW, GREY
    hsize = round((92 if kind == "hook" else (76 if kind == "cta" else 64)) * sc)
    if kind == "hook":
        if size["dir"] == "slides-landscape":
            foot_right_class, foot_right = "tag", "frenchroofing.com/estimate"
        else:
            foot_right_class, foot_right = "swipe", "SWIPE →"
    elif kind == "cta":
        foot_right_class, foot_right = "tag", "frenchroofing.com/estimate"
    else:
        foot_right_class, foot_right = "tag", "Damascus, OR · 971-376-8722"
    body_html = f"<p>{body}</p>" if body else ""
    return PAGE.format(bg=bg, fg=fg, muted=muted, accent=accent, body_fg=body_fg,
                       hsize=hsize, counter=counter, header=header,
                       body_html=body_html, foot_right_class=foot_right_class,
                       foot_right=foot_right,
                       w=size["w"], h=size["h"], pad=size["pad"],
                       gap=round(44 * sc), psize=round(44 * sc),
                       pmax=round(size["w"] * 0.8))


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    size_name = next((a.split("=")[1] for a in sys.argv[1:] if a.startswith("--size=")), "portrait")
    if len(args) != 1 or size_name not in SIZES:
        sys.exit("usage: render.py <carousel-folder> [--size=portrait|square|landscape]")
    size = SIZES[size_name]
    folder = args[0].rstrip("/")
    slides = json.load(open(os.path.join(folder, "slides.json")))["slides"]
    out_dir = os.path.join(folder, size["dir"])
    os.makedirs(out_dir, exist_ok=True)

    for i, s in enumerate(slides, 1):
        with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f:
            f.write(slide_html(s, i, len(slides), size))
            html_path = f.name
        out = os.path.join(out_dir, f"{i:02d}.png")
        r = subprocess.run([CHROME, "--headless=new", f"--screenshot={out}",
                            f"--window-size={size['w']},{size['h']}", "--hide-scrollbars",
                            "--disable-gpu", "--force-device-scale-factor=1",
                            f"file://{html_path}"],
                           capture_output=True, text=True, timeout=60)
        os.unlink(html_path)
        nbytes = os.path.getsize(out) if os.path.exists(out) else 0
        if nbytes < 20_000:
            sys.exit(f"FATAL: slide {i} rendered {nbytes} bytes (Chrome: {r.stderr[-200:]})")
        print(f"slide {i:02d}: {nbytes//1024} KB")
    print(f"rendered {len(slides)} slides -> {out_dir}")


if __name__ == "__main__":
    main()
