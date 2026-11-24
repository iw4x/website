#!/usr/bin/env python3
# Convert the game's map previews into the thumbnails that the server
# browser shows when the pointer rests on a map name (see
# www/server-list/main.js).
#
# The previews are the images the game's own map menus show, named
# preview_<map>.iwi. They ship with IW4x in iw4x-rawfiles, which has one
# for every stock map and for the maps IW4x adds, so a checkout of it is
# all we need:
#
#   previews.py <iw4x-rawfiles>/iw4x/iw4x_01/images www/server-list/maps
#
# Note that this writes into an empty directory (or one it wrote before):
# www/server-list/buildfile picks up the thumbnails with a wildcard, so a
# stale one left in there would ship as well.
#
# Each thumbnail is a WebP named after the map, <map>.webp, and index.json
# lists the maps that have one. The script asks for the index first, so
# that it never asks for a thumbnail that isn't there.
#
# The previews are IWI files, the game's own image format, version 8 for
# IW4. Their header is
#
#   char     tag[3]                 "IWi"
#   char     version                8
#   uint32   flags
#   uint8    format                 11 DXT1, 12 DXT3, 13 DXT5
#   uint8    unused
#   uint16   dimensions[3]          width, height, depth
#   uint32   fileSizeForPicmip[4]
#
# followed by the mip levels, the smallest first. So the largest level is
# the one that ends the file, which is the one we want. Pillow decodes DXT
# only from a DDS file, so we put a DDS header in front of that level and
# let it do the rest.
#

import argparse, io, json, os, re, struct, sys
from PIL import Image

ap = argparse.ArgumentParser()
ap.add_argument('images')
ap.add_argument('out')
ap.add_argument('--width', type=int, default=320)
ap.add_argument('--quality', type=int, default=80)
args = ap.parse_args()

FOURCC = {11: b'DXT1', 12: b'DXT3', 13: b'DXT5'}
BLOCK = {11: 8, 12: 16, 13: 16}

def dds(fourcc, w, h, data):
  # A DDS header with just enough in it for Pillow: the size, the pixel
  # format, and the size of the one level that follows.
  #
  pf = struct.pack('<II4sIIIII', 32, 0x4, fourcc, 0, 0, 0, 0, 0)
  hd = struct.pack('<IIIIIII', 124, 0x1 | 0x2 | 0x4 | 0x1000 | 0x80000,
                   h, w, len(data), 0, 1)
  hd += b'\0' * 44 + pf + struct.pack('<IIIII', 0x1000, 0, 0, 0, 0)
  return b'DDS ' + hd + data

def load(path):
  b = open(path, 'rb').read()

  if b[:3] != b'IWi' or b[3] != 8:
    raise ValueError('not an IW4 IWI file')

  fmt = b[8]
  w, h, _ = struct.unpack_from('<HHH', b, 10)

  if fmt not in FOURCC:
    raise ValueError('format %d is not DXT' % fmt)

  size = ((w + 3) // 4) * ((h + 3) // 4) * BLOCK[fmt]
  return Image.open(io.BytesIO(dds(FOURCC[fmt], w, h, b[-size:]))).convert('RGB')

os.makedirs(args.out, exist_ok=True)

maps = []

for f in sorted(os.listdir(args.images)):
  m = re.fullmatch(r'preview_(mp_[a-z0-9_]+)\.iwi', f)
  if not m:
    continue

  try:
    im = load(os.path.join(args.images, f))
  except ValueError as e:
    print('%s: %s, skipped' % (f, e), file=sys.stderr)
    continue

  h = round(im.height * args.width / im.width)
  im.resize((args.width, h), Image.LANCZOS).save(
    os.path.join(args.out, m[1] + '.webp'), quality=args.quality, method=6)

  maps.append(m[1])

with open(os.path.join(args.out, 'index.json'), 'w') as o:
  json.dump(maps, o, indent=0)
  o.write('\n')

print('%d thumbnails' % len(maps))
