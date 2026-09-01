#!/usr/bin/env python3
"""Générateur automatique de Reels — Motiva Hub
Style: exemple-reel-2 (texte bas, fade, zoom léger, footer @uce__f, musique pad)
Usage: python3 generate-reels.py 5   (génère les 5 premiers reels non générés)
"""
import json, os, subprocess, sys, hashlib
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.abspath(__file__))
W, H = 1080, 1920
FONT = "/System/Library/Fonts/HelveticaNeue.ttc"
OUT = os.path.join(ROOT, "output")
os.makedirs(OUT, exist_ok=True)

# Musique pad sentimentale (générée une fois)
PAD = os.path.join(OUT, "pad.mp3")
if not os.path.exists(PAD):
    subprocess.run([
        "ffmpeg", "-y",
        "-f", "lavfi", "-i", "sine=frequency=174.61:duration=20",
        "-f", "lavfi", "-i", "sine=frequency=220:duration=20",
        "-f", "lavfi", "-i", "sine=frequency=261.63:duration=20",
        "-filter_complex",
        "[0:a][1:a][2:a]amix=inputs=3,volume=0.32,tremolo=f=0.3:d=0.5,lowpass=f=600[a]",
        "-map", "[a]", PAD
    ], capture_output=True)

def make_overlay(texts, out, color=(245,242,235), size=92, y_ratio=0.58):
    img = Image.new("RGBA", (W, H), (0,0,0,0))
    d = ImageDraw.Draw(img)
    font = ImageFont.truetype(FONT, size)
    line_h = size + 30
    total = len(texts) * line_h
    y = int(H * y_ratio) - total // 2
    for t in texts:
        bbox = d.textbbox((0,0), t, font=font)
        tw = bbox[2] - bbox[0]
        # réduire la police si le texte dépasse
        while tw > W - 120 and size > 50:
            size -= 6
            font = ImageFont.truetype(FONT, size)
            line_h = size + 30
            bbox = d.textbbox((0,0), t, font=font)
            tw = bbox[2] - bbox[0]
        x = (W - tw) // 2
        d.text((x+4, y+4), t, font=font, fill=(0,0,0,160))
        d.text((x, y), t, font=font, fill=color+(255,))
        y += line_h
    img.save(out)

def make_footer(instagram, out):
    img = Image.new("RGBA", (W, H), (0,0,0,0))
    d = ImageDraw.Draw(img)
    f = ImageFont.truetype(FONT, 42)
    t1, t2 = "the-motivahub.com", instagram
    sep = "   ·   "
    w1 = d.textbbox((0,0), t1, font=f)[2]
    w2 = d.textbbox((0,0), t2, font=f)[2]
    ws = d.textbbox((0,0), sep, font=f)[2]
    x = (W - (w1+w2+ws)) // 2
    d.text((x+2, H-158+2), t1+sep+t2, font=f, fill=(0,0,0,150))
    d.text((x, H-158), t1+sep+t2, font=f, fill=(255,255,255,210))
    img.save(out)

def make_logo(out):
    img = Image.new("RGBA", (W, H), (0,0,0,0))
    d = ImageDraw.Draw(img)
    f = ImageFont.truetype(FONT, 38)
    t = "M O T I V A   H U B"
    w = d.textbbox((0,0), t, font=f)[2]
    d.text(((W-w)//2, 110), t, font=f, fill=(255,255,255,200))
    img.save(out)

def wrap(text, max_chars=24):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        if len(cur) + len(w) + 1 <= max_chars:
            cur = (cur + " " + w).strip()
        else:
            lines.append(cur); cur = w
    if cur: lines.append(cur)
    return lines

def build(reel, bg_photo, idx):
    rid = reel["id"]
    final = os.path.join(OUT, f"reel-{rid:03d}.mp4")
    if os.path.exists(final):
        return f"skip {final}"
    tmp = "/tmp/opencode/reelgen"
    os.makedirs(tmp, exist_ok=True)
    # 4 segments de texte
    segs = []
    for i, t in enumerate(reel["textes"]):
        txt = t.split(": ", 1)[1] if ": " in t else t
        color = (212,175,55) if i == 3 else (245,242,235)
        size = 96 if i == 3 else 92
        p = f"{tmp}/s{rid}_{i}.png"
        make_overlay(wrap(txt), p, color, size)
        segs.append(p)
    footer = f"{tmp}/footer{rid}.png"; make_footer("@uce__f", footer)
    logo = f"{tmp}/logo{rid}.png"; make_logo(logo)

    # luminosité de la photo -> voile sombre si claire
    g = Image.open(bg_photo).convert("L").resize((40,40))
    avg = sum(g.getdata())/1600
    veil = ",drawbox=color=black@0.38:t=fill" if avg >= 110 else ",eq=brightness=-0.05:saturation=0.85"

    inputs = ["-loop","1","-t","20","-i",bg_photo]
    for p in segs: inputs += ["-loop","1","-t","20","-i",p]
    inputs += ["-loop","1","-t","20","-i",footer,"-loop","1","-t","20","-i",logo,"-i",PAD]
    # indices: 0=bg, 1-4=textes, 5=footer, 6=logo, 7=audio

    fc = f"[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.00025,1.06)':d=500:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=25{veil}[bg];"
    fades = [
        (1, "st=0.3", "st=4.4"), (2, "st=5", "st=9.4"),
        (3, "st=10", "st=14.4"), (4, "st=15", None),
    ]
    for n, fin, fout in fades:
        f = f"[{n}:v]format=rgba,fade=t=in:{fin}:d=0.6:alpha=1"
        if fout: f += f",fade=t=out:{fout}:d=0.6:alpha=1"
        fc += f + f"[o{n}];"
    fc += "[bg][6:v]overlay=(W-w)/2:110[l];"
    prev = "l"
    for n in range(1, 5):
        out_lbl = f"x{n}"
        fc += f"[{prev}][o{n}]overlay=(W-w)/2:(H-h)/2[{out_lbl}];"
        prev = out_lbl
    fc += f"[{prev}][5:v]overlay=(W-w)/2:H-165[vout];"
    fc += "[7:a]afade=t=in:d=3,afade=t=out:st=16:d=4[aout]"

    subprocess.run([
        "ffmpeg","-y",*inputs,"-filter_complex",fc,
        "-map","[vout]","-map","[aout]",
        "-c:v","libx264","-preset","fast","-crf","22","-pix_fmt","yuv420p",
        "-c:a","aac","-b:a","128k","-shortest",final
    ], capture_output=True)
    return f"OK {final} ({os.path.getsize(final)//1024} KB)"

if __name__ == "__main__":
    count = int(sys.argv[1]) if len(sys.argv) > 1 else 5
    reels = json.load(open(os.path.join(ROOT, "reels-150.json")))
    photos = sorted(f for f in os.listdir(os.path.join(ROOT, "..", "raw-photos")) if f.endswith(".jpg"))
    footer_done = False
    made = 0
    for i, reel in enumerate(reels):
        if made >= count: break
        final = os.path.join(OUT, f"reel-{reel['id']:03d}.mp4")
        if os.path.exists(final): continue
        bg = os.path.join(ROOT, "..", "raw-photos", photos[i % len(photos)])
        print(build(reel, os.path.abspath(bg), i))
        made += 1
    print(f"\n✅ {made} reels générés dans reels/output/")
