#!/usr/bin/env python3
# Print the views of a map's visibility pass as JSON.
#
#   views.py <map> [<shots.json>]
#
# The visibility pass decides what we ship, so its views have to show
# everything the camera in www/hero/main.js can ever see. We sample the
# shot's arc with a margin all around, past both of its ends and beyond the
# drift in distance and height that main.js adds. Note also that main.js
# keeps its field of view within the 62 degrees visibility.html renders
# with.
#
import json, math, os, sys

name = sys.argv[1]
path = sys.argv[2] if len(sys.argv) > 2 else os.path.join(
    os.path.dirname(__file__), '../../www/hero/shots.json')
shot = json.load(open(path))[name]

t = shot['target']
a0, a1 = shot['arc']
bob = shot.get('bob', 0)
wobble = shot.get('wobble', 0)

# Sample every two degrees from six before the arc to six after it. At
# each angle take the camera at its lowest, usual, and highest and at its
# nearest, usual, and farthest, each extreme padded by a few meters.
#
views = []
a = a0 - 6
while a <= a1 + 6:
    r_ = math.radians(shot['heading'] + a)
    for h in (shot['height'] - bob - 3, shot['height'], shot['height'] + bob + 3):
        for r in (shot['radius'] - wobble - 5, shot['radius'], shot['radius'] + wobble + 5):
            c = [t[0] + r * math.sin(r_), h, t[2] + r * math.cos(r_)]
            views.append([[round(v, 1) for v in c], t])
    a += 2

json.dump(views, sys.stdout, separators=(',', ':'))
