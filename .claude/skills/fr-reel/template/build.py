"""Build the reel compositions from SCENES + CAPTIONS. Run: python3 -I build.py"""
import json

TOTAL = 26.0
SCENES = [  # id, start, dur, media, kind, step, extras
    ("hook", 0, 3.55, "assets/mossy.jpg", "img", None, {"hook": "What's in a<br>new roof?"}),
    ("safety", 3.55, 1.9, "assets/harness.mp4", "vid", ("1", "Safety"), {}),
    ("tearoff", 5.45, 3.3, "assets/tearoff.jpg", "img", ("2", "Tear-off"), {"second": "assets/tearoff2.jpg"}),
    ("decking", 8.75, 3.45, "assets/decking.jpg", "img", ("3", "Decking"), {"pos": "30% 50%"}),
    ("underlay", 12.2, 1.8, "assets/underlayment.jpg", "img", ("4", "Underlayment"), {}),
    ("finish", 14.0, 4.25, "assets/vents.jpg", "img", ("5", "Flashing, vents, shingles"), {"second": "assets/shingles.jpg"}),
    ("certified", 18.25, 3.05, "assets/certified.jpg", "hold", None, {"badge": "CertainTeed<br>ShingleMaster&trade; crew"}),
    ("endcard", 21.3, 4.7, None, "end", None, {}),
]
# Caption chunks: (words as spoken, cleaned up). Times come from transcript.json word starts.
CHUNKS = [
    "Here's what's included", "in a full", "roof replacement.",
    "First, the crew", "gears up.",
    "We tear off the old roof,", "all the way down,", "and haul it away.",
    "Then we inspect the decking,", "replace any", "rotten plywood,",
    "install the new", "underlayment,",
    "and then pipe flashings,", "vents, metal,", "and finally new shingles.",
    "All installed by a", "CertainTeed-trained", "and certified crew.",
]
TIMES = [0.64, 1.20, 1.52, 1.92, 2.08, 2.16, 2.48, 2.88,
         3.60, 4.00, 4.16, 4.56, 5.04,
         5.52, 5.68, 6.08, 6.16, 6.32, 6.56, 6.96, 7.12, 7.20, 7.36, 7.60, 7.84, 8.16, 8.32,
         8.80, 9.04, 9.20, 9.60, 9.68, 10.24, 10.56, 10.80, 11.28,
         12.24, 12.64, 12.72, 12.96,
         14.08, 14.32, 14.64, 15.04, 15.68, 16.08, 16.48, 16.72, 17.20, 17.44,
         18.32, 18.56, 18.96, 19.12, 19.20, 20.16, 20.32, 20.88]
CSS = """
  #root{position:absolute;inset:0;overflow:hidden;background:#092e5e;font-family:Inter,sans-serif}
  .media{position:absolute;left:0;top:0;width:1080px;height:1920px;object-fit:cover}
  .shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(9,46,94,.55) 0%,rgba(9,46,94,0) 28%,rgba(9,46,94,0) 44%,rgba(9,46,94,.78) 60%,rgba(9,46,94,.9) 100%)}
  .chip{position:absolute;left:84px;top:236px;background:#092e5e;border-radius:999px;padding:14px 40px 14px 14px;box-shadow:0 8px 30px rgba(0,0,0,.25)}
  .chip .n{width:76px;height:76px;border-radius:50%;background:#ffbd59;color:#092e5e;font-weight:900;font-size:44px;display:flex;align-items:center;justify-content:center}
  .chip .l{color:#fff;font-weight:700;font-size:48px;letter-spacing:-.01em}
"""

def scene(sid, du, media, kind, step, ex):
    p = sid[:3]; els = []; tw = []
    if kind == "img":
        pos = f' style="object-position:{ex["pos"]}"' if "pos" in ex else ""
        if "second" in ex:
            h = round(du / 2, 2)
            els.append(f'<img id="{p}-a" class="clip media" data-layout-allow-overflow src="{media}" data-start="0" data-duration="{h+0.4:.2f}" alt="">')
            els.append(f'<img id="{p}-b" class="clip media" data-layout-allow-overflow src="{ex["second"]}" data-start="{h:.2f}" data-duration="{du-h:.2f}" alt="">')
            tw.append(f'tl.fromTo("#{p}-a",{{scale:1.0}},{{scale:1.07,duration:{h+0.4:.2f},ease:"none"}},0);')
            tw.append(f'tl.fromTo("#{p}-b",{{scale:1.07,opacity:0}},{{scale:1.0,opacity:1,duration:0.4,ease:"power2.out"}},{h:.2f});')
            tw.append(f'tl.fromTo("#{p}-b",{{scale:1.0}},{{scale:1.04,immediateRender:false,duration:{du-h-0.4:.2f},ease:"none"}},{h+0.4:.2f});')
        else:
            els.append(f'<img id="{p}-a" class="clip media" data-layout-allow-overflow{pos} src="{media}" data-start="0" data-duration="{du}" alt="">')
            tw.append(f'tl.fromTo("#{p}-a",{{scale:1.0}},{{scale:1.08,duration:{du},ease:"none"}},0);')
    elif kind == "pan":
        els.append(f'<img id="{p}-a" class="clip" data-layout-allow-overflow style="position:absolute;left:0;top:0;height:1920px;width:2560px;max-width:none" src="{media}" data-start="0" data-duration="{du}" alt="">')
        tw.append(f'tl.fromTo("#{p}-a",{{x:-60}},{{x:-1420,duration:{du},ease:"power1.inOut"}},0);')
    elif kind == "hold":
        # whole photo across the frame (staff member and the ShingleMaster screen), soft blurred fill behind
        els.append(f'<img id="{p}-bg" class="clip media" src="assets/certified-bg.jpg" data-start="0" data-duration="{du}" alt="">')
        els.append(f'<img id="{p}-a" class="clip" data-layout-allow-overflow style="position:absolute;left:0;top:430px;width:1080px;height:810px;object-fit:cover;box-shadow:0 20px 60px rgba(0,0,0,.45)" src="{media}" data-start="0" data-duration="{du}" alt="">')
        tw.append(f'tl.fromTo("#{p}-a",{{scale:1.0}},{{scale:1.03,duration:{du},ease:"none"}},0);')
    elif kind == "vid":
        els.append(f'<video id="{p}-a" class="clip media" data-layout-allow-overflow src="{media}" data-start="0" data-duration="{du}" muted playsinline></video>')
    if step:
        els.append(f'<div id="{p}-chip" class="clip chip" data-start="0" data-duration="{du}"><div id="{p}-chipin" style="display:flex;align-items:center;gap:22px"><div class="n">{step[0]}</div><div class="l">{step[1]}</div></div></div>')
        tw.append(f'tl.fromTo("#{p}-chipin",{{x:-40,opacity:0}},{{x:0,opacity:1,duration:0.35,ease:"power3.out"}},0.1);')
    if "hook" in ex:
        els.append(f'<div id="{p}-hookwrap" class="clip" data-start="0" data-duration="{du}" style="position:absolute;left:84px;right:84px;top:250px"><div id="{p}-hook" style="background:#092e5e;color:#ffbd59;font-weight:900;font-size:120px;line-height:1.0;letter-spacing:-.03em;padding:44px 52px;border-radius:28px;box-shadow:0 12px 40px rgba(0,0,0,.3)">{ex["hook"]}</div></div>')
    if "badge" in ex:
        els.append(f'<div id="{p}-badgewrap" class="clip" data-start="0.2" data-duration="{du-0.2:.2f}" style="position:absolute;left:84px;top:236px"><div id="{p}-badge" style="background:#ffbd59;color:#092e5e;font-weight:900;font-size:62px;line-height:1.05;letter-spacing:-.02em;padding:34px 44px;border-radius:24px;box-shadow:0 12px 40px rgba(0,0,0,.3)">{ex["badge"]}</div></div>')
        tw.append(f'tl.fromTo("#{p}-badge",{{y:30,opacity:0}},{{y:0,opacity:1,duration:0.4,ease:"power3.out"}},0.2);')
    if kind == "end":
        els.append(f'''<div id="{p}-bg" class="clip" data-start="0" data-duration="{du}" style="position:absolute;inset:0;background:#f5f1ea"></div>
    <div id="{p}-box" class="clip" data-start="0" data-duration="{du}" style="position:absolute;left:84px;right:84px;top:420px;display:flex;flex-direction:column;align-items:center;text-align:center">
      <img id="{p}-logo" src="assets/logo.png" style="width:420px;height:auto" alt="French Roofing">
      <div id="{p}-l1" style="margin-top:80px;color:#092e5e;font-weight:900;font-size:96px;line-height:1.02;letter-spacing:-.03em">Instant Roof Quote</div>
      <div id="{p}-l2" style="margin-top:36px;background:#d85024;color:#fff;font-weight:700;font-size:56px;padding:22px 48px;border-radius:999px">frenchroofing.com</div>
      <div id="{p}-l3" data-var-text="endNote" style="margin-top:40px;color:#3e3d3b;font-weight:700;font-size:44px">Link in bio</div>
    </div>''')
        tw += [f'tl.fromTo("#{p}-logo",{{y:30,opacity:0}},{{y:0,opacity:1,duration:0.45,ease:"power3.out"}},0.1);',
               f'tl.fromTo("#{p}-l1",{{y:30,opacity:0}},{{y:0,opacity:1,duration:0.45,ease:"power3.out"}},0.35);',
               f'tl.fromTo("#{p}-l2",{{scale:0.9,opacity:0}},{{scale:1,opacity:1,duration:0.4,ease:"back.out(1.6)"}},0.6);',
               f'tl.fromTo("#{p}-l3",{{opacity:0}},{{opacity:1,duration:0.4}},0.9);']
    body = "\n    ".join(els); js = "\n    ".join(tw)
    return f'''<template>
  <style>{CSS}</style>
  <div id="root" data-composition-id="{sid}" data-width="1080" data-height="1920">
    {body}
  </div>
  <script>
    const tl = gsap.timeline({{ paused: true }});
    {js}
    tl.to({{}}, {{duration:{du}}}, 0);
    window.__timelines["{sid}"] = tl;
  </script>
</template>
'''

def captions():
    # word start times, hand-checked against transcript.json (Parakeet); the ASR misheard "any rotten" as "the new rod and"
    ts = TIMES
    els = []; tw = []; n = 0; end_all = 21.3
    for ci, c in enumerate(CHUNKS):
        ws = c.split(); st = ts[n]; n2 = n + len(ws)
        en = ts[n2] if n2 < len(ts) else end_all
        en = min(en, end_all)
        spans = "".join(f'<span id="cw{n+i}" class="w">{w} </span>' for i, w in enumerate(ws))
        low = ' style="top:1262px"' if 18.25 <= st < 21.3 else ""  # training-room shot: keep captions off his face
        els.append(f'<div id="cg{ci}" class="clip grp"{low} data-start="{st:.2f}" data-duration="{max(en-st,0.3):.2f}"><div id="cgi{ci}">{spans}</div></div>')
        tw.append(f'tl.fromTo("#cgi{ci}",{{y:14,opacity:0}},{{y:0,opacity:1,duration:0.14,ease:"power2.out"}},{st:.2f});')
        for i in range(len(ws)):
            tw.append(f'tl.fromTo("#cw{n+i}",{{color:"#ffffff"}},{{color:"#ffbd59",duration:0.08}},{ts[n+i]:.2f});')
        n = n2
    body = "\n    ".join(els); js = "\n    ".join(tw)
    return f'''<template>
  <style>
    #root{{position:absolute;inset:0;font-family:Inter,sans-serif}}
    .grp{{position:absolute;left:84px;right:180px;top:1110px;font-weight:900;font-size:76px;line-height:1.08;letter-spacing:-.02em;-webkit-text-stroke:12px rgba(0,0,0,.55);paint-order:stroke fill;text-shadow:0 4px 24px rgba(0,0,0,.6)}}
    .w{{color:#ffffff}}
  </style>
  <div id="root" data-composition-id="captions" data-width="1080" data-height="1920">
    {body}
  </div>
  <script>
    const tl = gsap.timeline({{ paused: true }});
    {js}
    tl.to({{}}, {{duration:{TOTAL}}}, 0);
    window.__timelines["captions"] = tl;
  </script>
</template>
''', ts

for sid, st, du, media, kind, step, ex in SCENES:
    open(f"compositions/{sid}.html", "w").write(scene(sid, du, media, kind, step, ex))
cap, ts = captions()
open("compositions/captions.html", "w").write(cap)
hosts = "\n".join(f'      <div id="{s[0]}" data-composition-id="{s[0]}" data-composition-src="compositions/{s[0]}.html" data-start="{s[1]}" data-duration="{s[2]}" data-track-index="1" data-track-kind="graphics" data-width="1080" data-height="1920"></div>' for s in SCENES)
idx = f'''<!doctype html>
<html lang="en" data-resolution="portrait" data-composition-variables='[{{"id":"endNote","type":"string","label":"End card note (Link in bio / blank for YouTube, LinkedIn)","default":"Link in bio"}}]'>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      * {{ margin: 0; padding: 0; box-sizing: border-box; }}
      html, body {{ margin: 0; width: 1080px; height: 1920px; overflow: hidden; background: #092e5e; }}
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="{TOTAL}" data-width="1080" data-height="1920">
{hosts}
      <div id="captions" data-composition-id="captions" data-composition-src="compositions/captions.html" data-start="0" data-duration="{TOTAL}" data-track-index="2" data-track-kind="captions" data-width="1080" data-height="1920" style="z-index:5"></div>
      <audio id="vo" class="clip" src="assets/vo.wav" data-start="0" data-duration="24.95" data-track-index="3" data-volume="1"></audio>
      <audio id="music" class="clip" src="assets/music.mp3" data-start="0" data-duration="{TOTAL}" data-track-index="4" data-volume="0.16" data-fade-in="0.3" data-fade-out="1.5"></audio>
    </div>
    <script>
      window.__timelines["main"] = gsap.timeline({{ paused: true }});
    </script>
  </body>
</html>
'''
open("index.html", "w").write(idx)
spoken = [w for c in CHUNKS for w in c.split()]
assert len(spoken) == len(TIMES), (len(spoken), len(TIMES))
print(len(spoken), "words timed")
