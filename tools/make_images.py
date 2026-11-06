"""Generates the faint line-art leaf background used behind the hero.

Original artwork: broad leaves with fine parallel veins, clustered in the four
corners on white (same *style* as the gisla.co hero, not a copy of their file).

Run:  python3 tools/make_images.py   (writes public/images/leaves-{tl,tr,bl,br}.svg)
"""
import math
import os

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images")
os.makedirs(OUT, exist_ok=True)

W, H = 1600, 1000
STROKE = "#E2DCD2"   # soft warm grey line work (on cream)


def leaf(length, width_ratio=0.36, veins=11, sw=1.2):
    """Broad leaf drawn from its base (0,0) upwards; veins stay inside the outline."""
    L, Wd = length, length * width_ratio

    def half_width(t):  # outline half-width at height fraction t (0 = base, 1 = tip)
        return Wd * math.sin(math.pi * t) ** 0.8 * (1 - 0.25 * t)

    pts_r = [(half_width(k / 40), -L * k / 40) for k in range(41)]
    pts_l = [(-x, y) for x, y in reversed(pts_r)]
    outline = "M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in pts_r + pts_l) + " Z"
    parts = [f'<path d="{outline}"/>', f'<path d="M0,{L*0.08:.1f} L0,{-L*0.96:.1f}"/>']
    for i in range(1, veins):
        t0 = i / veins * 0.86 + 0.04           # where the vein leaves the midrib
        t1 = min(0.97, t0 + 0.13)              # where it meets the edge (higher up)
        y0, y1 = -L * t0, -L * t1
        reach = half_width(t1) * 0.9
        for side in (1, -1):
            parts.append(
                f'<path d="M0,{y0:.1f} Q{side*reach*0.55:.1f},{y0 - (y0 - y1)*0.25:.1f} {side*reach:.1f},{y1:.1f}"/>'
            )
    return (
        f'<g fill="none" stroke="{STROKE}" stroke-width="{sw}" stroke-linecap="round" '
        f'stroke-linejoin="round">{"".join(parts)}</g>'
    )


def place(x, y, angle, length, **kw):
    return f'<g transform="translate({x},{y}) rotate({angle})">{leaf(length, **kw)}</g>'


def cluster(cx, cy, base_angle, mirror=False, scale=1.0):
    """A loose fan of three leaves from one point near the corner."""
    fan = [(-64, 230), (0, 280), (62, 220)]
    out = []
    for da, ln in fan:
        a = base_angle + (-da if mirror else da)
        out.append(place(0, 0, a, ln * scale))
    return f'<g transform="translate({cx},{cy})">{"".join(out)}</g>'


# Four separate corner pieces, pinned to the hero corners in CSS so they never get cropped.
CW, CH = 440, 380
corners = {
    "tl": cluster(40, 20, 145, scale=0.85),
    "tr": cluster(CW - 40, 20, -145, mirror=True, scale=0.85),
    "bl": cluster(30, CH - 10, 45, scale=1.05),
    "br": cluster(CW - 30, CH - 10, -45, mirror=True, scale=1.05),
}
for name, art in corners.items():
    with open(os.path.join(OUT, f"leaves-{name}.svg"), "w") as f:
        f.write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {CW} {CH}" width="{CW}" height="{CH}">{art}</svg>')

print("wrote leaves-tl/tr/bl/br.svg")
