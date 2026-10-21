#!/usr/bin/env python3
# Convert an OAT Unlinker dump of a multiplayer map into a scene bundle for
# www/hero/scene.js.
#
# We can't distribute the game's fastfiles, so the dump has to be made
# locally from an installed copy of the game:
#
#   Unlinker --game IW4MS --image-format DDS --model-format GLB \
#     --include-assets image,material,xmodel,gfxworld,comworld \
#     -o <dump-dir> <game>/zone/english/<map>.ff
#
# Note that the current Steam fastfiles are the x64 build, which needs the
# IW4MS loader. The IW4 one crashes on them.
#
# Then convert the dump into an empty output directory. Since
# www/hero/buildfile picks up the textures with a wildcard, any stale ones
# left in there would ship as well:
#
#   convert.py <dump-dir> www/hero/maps/<map> \
#     --visible tools/hero/visible/<map>.json --min-pixels 1000 \
#     --tex-max 1024
#
# Most of a map never comes into view of the hero camera, and the whole of
# it makes a bundle of some 40 MB. So we first run a visibility pass that
# renders surface ids from views along the shot's camera arc (see views.py
# and visibility.html) and records the pixels each id covered in
# visible/<map>.json. Here we then keep only the surfaces and models that
# covered enough of them, which gets the bundle down to a few MB. The catch
# is that whenever a shot in www/hero/shots.json moves, its pass has to be
# re-run, otherwise holes will start to show.
#
# The bundle has the following layout:
#
#   scene.json   the draw groups and everything else scene.js needs to
#                set up the scene
#   scene.bin    the vertex and index data the groups point into
#   tex/         the images the groups and the shaders sample, as WebP
#
# Note also that everything leaves here in the three.js convention, which
# is meters with Y up. The game is Z up in inches, so we map (x, y, z) to
# (x, z, -y) * 0.0254. That mapping is a rotation and so preserves the
# triangle winding (we come back to this below).
#

import argparse, base64, fnmatch, io, json, os, struct, sys
import numpy as np
from PIL import Image

INCH = 0.0254

ap = argparse.ArgumentParser()
ap.add_argument('dump')
ap.add_argument('out')
ap.add_argument('--visible', help='json list of visible surface ids (world) and smodel ids')
ap.add_argument('--min-pixels', type=int, default=0, help='drop surfaces covering fewer pixels over all visibility views')
ap.add_argument('--tex-max', type=int, default=512)
ap.add_argument('--drop', action='append', default=[], help='drop materials matching this pattern (repeatable)')
ap.add_argument('--lm-max', type=int, default=1024)
ap.add_argument('--quality', type=int, default=78)
ap.add_argument('--no-textures', action='store_true')
ap.add_argument('--ids', action='store_true', help='add a per-vertex surface id attribute (for visibility passes)')
args = ap.parse_args()

D = args.dump
O = args.out
os.makedirs(os.path.join(O, 'tex'), exist_ok=True)

# Load the world. The dump has a single one, named after the map, and it
# keeps all the world surfaces in one shared vertex and index buffer.
#
import glob
world = json.load(open(glob.glob(os.path.join(D, 'gfxworld/maps/mp/*.d3dbsp.json'))[0]))
draw = world['draw']
surfs = world['dpvs']['surfaces']
smodels = world['dpvs']['smodelDrawInsts']

vraw = base64.b64decode(draw['vertices'])
iraw = np.frombuffer(base64.b64decode(draw['indices']), dtype='<u2')

# Map the vertex buffer onto GfxWorldVertex (44 bytes). We spell out every
# field so that the layout is easy to check against the game's, even
# though we only read some of them.
#
vdt = np.dtype([('pos', '<f4', 3), ('bs', '<f4'), ('col', 'u1', 4), ('uv', '<f4', 2),
                ('lm', '<f4', 2), ('n', 'u1', 4), ('t', 'u1', 4)])
V = np.frombuffer(vraw, dtype=vdt)

# Return unit normals decoded from the game's packed format.
#
# The game stores each normal as three bytes biased by 127 and a fourth
# that sets their scale. All three components share the scale and we
# normalize the result, so strictly speaking it cancels out. We apply it
# anyway to keep the decoding recognizable.
#
def unpack_normal(n):
    n = n.astype(np.float32)
    scale = (n[:, 3] + 192.0) / 32385.0
    v = (n[:, :3] - 127.0) * scale[:, None]
    l = np.linalg.norm(v, axis=1, keepdims=True)
    l[l == 0] = 1
    return v / l

# Return game-space positions or directions with their axes in our order
# (see above). Positions still have to be scaled by INCH.
#
def to_three(p):
    p = np.asarray(p, dtype=np.float64)
    return np.stack([p[..., 0], p[..., 2], -p[..., 1]], axis=-1)

# Load the visibility pass result, if we have one, and work out what to
# keep.
#
# A surface or model that covers fewer than --min-pixels over all the
# views is something like a bolt on a far wall. Dropping those makes no
# visible difference and saves a good chunk of the bundle. We also keep the
# camera positions of the views to pick model LODs with (see below).
#
visible = None
pix = {}
if args.visible:
    vis = json.load(open(args.visible))
    pix = {int(k): v for k, v in vis.get('pixels', {}).items()}

    # The pass numbers static models from 100000 so that they can share one
    # id space with the world surfaces. Note that we keep an id that has no
    # pixel count at all.
    #
    keep = lambda i: pix.get(i, 1 << 30) >= args.min_pixels
    visible = {'surf': {i for i in vis['surf'] if keep(i)},
               'smodel': {i for i in vis['smodel'] if keep(100000 + i)},
               'cams': np.array([v[0] for v in vis.get('views', [])], dtype=np.float64)}

# Return the material from the dump or None if it isn't there. Static
# models share materials a lot, so we cache them.
#
matcache = {}

def load_material(name):
    if name in matcache:
        return matcache[name]
    p = os.path.join(D, 'materials', name + '.json')
    m = json.load(open(p)) if os.path.exists(p) else None
    matcache[name] = m
    return m

# Return the kind of surface a technique set draws and whether it is lit,
# or None if we should drop the surface.
#
# The kind picks the shader variant and blending in scene.js. The set names
# spell out the render state (t0 for alpha test, b0 for blend, and so on),
# which is all we need, so we go by the names and leave the techniques
# alone.
#
def classify(tech):
    # Drop what we have no way to draw. We draw the sky ourselves, shadow
    # casters and tool surfaces never show in the game either, and
    # distortion needs the frame behind it, which we don't keep.
    #
    # The unlit blend layers are a judgment call. On the maps that have
    # them they are cloud cards around the sky, and with our blending they
    # come out as flat pale sheets. So for now they go as well.
    #
    if (tech == 'wc_sky' or 'shadowcaster' in tech or 'distortion' in tech or
        tech.startswith(('wc_tools', 'wc_unlit_blend'))):
        return None
    if tech.startswith(('wc_water', 'mc_water')):
        return ('water', False)

    # Lit world surfaces. The ua_ ones are scrolling layers, which on
    # Highrise are the clouds below the rooftops.
    #
    if tech.startswith('wc_l_'):
        body = tech[5:]
        if body.startswith('ua_'):
            return ('cloud', True)
        if '_t0' in body:
            return ('cutout', True)
        if '_b0' in body:
            return ('blend', True)
        return ('opaque', True)
    if tech.startswith('wc_unlit_multiply'):
        return ('multiply', False)
    if tech.startswith('wc_unlit_add'):
        return ('add', False)
    if tech.startswith('wc_unlit_replace'):
        return ('unlit', False)
    if tech.startswith('mc_effect'):
        return ('add', False)
    if tech.startswith('mc_unlit_blend'):
        return ('blend', False)
    if tech.startswith('mc_unlit_multiply'):
        return ('multiply', False)
    if tech.startswith('mc_unlit') or tech.startswith('unlit'):
        return ('unlit', False)

    # What is left is lit, static models and foliage among it, and its
    # name spells out the render state the same way.
    #
    if '_t0' in tech:
        return ('cutout', True)
    if '_b0' in tech:
        return ('blend', True)
    return ('opaque', True)

# Return the draw settings for a material, or None if we drop the surfaces
# that use it.
#
def material_info(name):
    m = load_material(name)
    if m is None or any(fnmatch.fnmatch(name, p_) for p_ in args.drop):
        return None
    tech = m.get('techniqueSet', '')
    c = classify(tech)
    if c is None:
        return None

    # Draw water as a flat dark surface. The game builds its look from
    # water setup images that the dumps don't include, and its color map is
    # only a placeholder. Seen from up where our cameras are, flat and dark
    # reads as water well enough.
    #
    if c[0] == 'water':
        return {'kind': 'water', 'lit': False, 'color': None, 'tech': tech,
                'uvAnim': [0, 0], 'tint': [0.05, 0.06, 0.07]}

    # An unlit surface with alpha test is a skyline billboard or similar,
    # whose outline comes entirely from the test. Make it a cutout so that
    # it keeps that outline.
    #
    if c == ('unlit', False) and any(sb.get('alphaTest', 'disabled') != 'disabled'
                                     for sb in m.get('stateBits', [])):
        c = ('cutout', False)

    color = None
    for t in m.get('textures', []):
        if t.get('name') == 'colorMap':
            color = t.get('image')

    # A transparent surface without a color map would draw as a white
    # sheet, so drop it. An opaque one still has its shape and lighting to
    # show. Portals only exist for the game's own visibility, so drop those
    # too.
    #
    if (color is None and c[0] != 'opaque') or 'hdrportal' in name:
        return None

    consts = {c_['name']: c_['literal'] for c_ in m.get('constants', [])}
    return {'kind': c[0], 'lit': c[1], 'color': color, 'tech': tech,
            'uvAnim': consts.get('uvAnimParms', [0, 0])[:2],
            'tint': consts.get('colorTint', [1, 1, 1, 1])}

# Return the draw group for a material and lightmap, adding it if this is
# the first surface to use them. scene.js draws each group with a single
# call, which is what keeps a map down to a few hundred draws.
#
# Note that lmap is -1 for unlit world surfaces and -2 for static models,
# neither of which has a lightmap.
#
groups = {}

def group(mat, lmap, info):
    k = (mat, lmap)
    if k not in groups:
        groups[k] = {'mat': mat, 'lmap': lmap, 'info': info, 'pos': [], 'nrm': [],
                     'uv': [], 'lm': [], 'idx': [], 'sid': [], 'n': 0}
    return groups[k]

# Collect the world surfaces into groups. We skip what the visibility pass
# didn't see and what material_info() drops, and count the latter for the
# summary.
#
# Note also that lm_tris collects the lightmap triangles of every surface
# we keep. Further down we use them to black out the lightmap texels that
# nothing we ship samples.
#
lm_tris = {}
normals_all = unpack_normal(V['n'])
pos_all = to_three(V['pos']) * INCH

dropped = 0
for si, s in enumerate(surfs):
    if visible is not None and si not in visible['surf']:
        continue
    info = material_info(s['material'])
    if info is None:
        dropped += 1
        continue
    t = s['tris']

    # The low byte of laf is the lightmap index, with 31 meaning none.
    #
    lmap = s['laf'] & 0xff
    if lmap == 31:
        lmap = -1

    # Copy out just the vertices this surface uses and renumber its indices
    # to match. The shared buffer serves the whole map, so taking it as is
    # would repeat it in every group. Note that the indices count from the
    # surface's first vertex.
    #
    idx = iraw[t['baseIndex']:t['baseIndex'] + t['triCount'] * 3].astype(np.int64) + t['firstVertex']
    uniq, inv = np.unique(idx, return_inverse=True)
    g = group(s['material'], lmap if info['lit'] else -1, info)
    g['pos'].append(pos_all[uniq])
    g['nrm'].append(normals_all[uniq])
    g['uv'].append(V['uv'][uniq])
    g['lm'].append(V['lm'][uniq])
    g['sid'].append(np.full(len(uniq), si, np.uint32))
    if lmap >= 0 and info['lit']:
        lm_tris.setdefault(lmap, []).append(V['lm'][idx].reshape(-1, 3, 2))
    g['px'] = g.get('px', 0) + (pix.get(si, 0) if visible is not None else 0)

    # Flip the winding. The game's world triangles are clockwise, our axis
    # mapping preserves that, and three.js expects counter-clockwise front
    # faces.
    #
    g['idx'].append(inv.reshape(-1, 3)[:, [0, 2, 1]] + g['n'])
    g['n'] += len(uniq)

print(f'world: {len(surfs)} surfaces, {dropped} dropped', file=sys.stderr)

# Return the primitives of an oat GLB file as (material, positions,
# normals, uvs, indices) tuples with the node transforms baked in.
#
# This only covers what oat writes and is far from a general glTF reader.
# Skinned models come with a skeleton above the mesh, which we ignore since
# the bind pose is the one we want.
#
def read_glb(path):
    b = open(path, 'rb').read()
    jl = struct.unpack_from('<I', b, 12)[0]
    j = json.loads(b[20:20 + jl])
    off = 20 + jl
    if off + 8 > len(b):
        return [] # Only JSON, so there is no geometry.
    bl = struct.unpack_from('<I', b, off)[0]
    bin_ = b[off + 8:off + 8 + bl]

    # Return accessor i as an array with one row per element. Interleaved
    # data gets copied out so that the result is contiguous.
    #
    def acc(i):
        a = j['accessors'][i]
        bv = j['bufferViews'][a['bufferView']]
        comp = {5126: '<f4', 5123: '<u2', 5125: '<u4', 5121: 'u1'}[a['componentType']]
        n = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4}[a['type']]
        start = bv.get('byteOffset', 0) + a.get('byteOffset', 0)
        stride = bv.get('byteStride', 0)
        dt = np.dtype(comp)
        if stride and stride != dt.itemsize * n:
            arr = np.lib.stride_tricks.as_strided(
                np.frombuffer(bin_, dtype=dt, offset=start),
                shape=(a['count'], n), strides=(stride, dt.itemsize))
            return np.array(arr)
        return np.frombuffer(bin_, dtype=dt, count=a['count'] * n, offset=start).reshape(a['count'], n)
    prims = []

    # Return each mesh of the default scene along with the transform it
    # accumulates on the way down from the root.
    #
    def node_mats():
        out = []
        def walk(ni, M):
            nd = j['nodes'][ni]
            L = np.eye(4)
            if 'matrix' in nd:
                L = np.array(nd['matrix']).reshape(4, 4).T
            else:
                T = np.eye(4); R = np.eye(4); Sc = np.eye(4)
                if 'translation' in nd: T[:3, 3] = nd['translation']
                if 'rotation' in nd:
                    x, y, z, w = nd['rotation']
                    R[:3, :3] = [[1-2*(y*y+z*z), 2*(x*y-z*w), 2*(x*z+y*w)],
                                 [2*(x*y+z*w), 1-2*(x*x+z*z), 2*(y*z-x*w)],
                                 [2*(x*z-y*w), 2*(y*z+x*w), 1-2*(x*x+y*y)]]
                if 'scale' in nd: Sc[[0, 1, 2], [0, 1, 2]] = nd['scale']
                L = T @ R @ Sc
            M = M @ L
            if 'mesh' in nd:
                out.append((nd['mesh'], M))
            for c in nd.get('children', []):
                walk(c, M)
        scene = j['scenes'][j.get('scene', 0)]
        for r in scene['nodes']:
            walk(r, np.eye(4))
        return out
    for mi, M in node_mats():
        for p in j['meshes'][mi]['primitives']:
            at = p['attributes']
            pos = acc(at['POSITION']).astype(np.float64)
            nrm = acc(at['NORMAL']).astype(np.float64) if 'NORMAL' in at else np.zeros_like(pos)
            uv = acc(at['TEXCOORD_0']).astype(np.float32) if 'TEXCOORD_0' in at else np.zeros((len(pos), 2), np.float32)
            idx = acc(p['indices']).reshape(-1).astype(np.int64)
            pos = (np.c_[pos, np.ones(len(pos))] @ M.T)[:, :3]
            nrm = nrm @ M[:3, :3].T
            mat = j['materials'][p['material']]['name'] if 'material' in p else None
            prims.append((mat, pos, nrm, uv, idx))
    return prims

glbcache = {}

# Return glTF positions or directions back in game space. oat exports
# models as (x, z, -y), and undoing that lets us apply the map's placement
# exactly the way the game does.
#
def game_from_glb(p):
    return np.stack([p[:, 0], -p[:, 2], p[:, 1]], axis=1)

# Place the static models. As with the world, we skip what the visibility
# pass didn't see.
#
sm_count = 0
missing = set()
for mi_, inst in enumerate(smodels):
    if visible is not None and mi_ not in visible['smodel']:
        continue
    name = inst['model']

    # Leave out models that come from another zone (say, common_mp). The
    # dump only has what this map's fastfile contains. We list their names
    # at the end in case one of them turns out to matter.
    #
    xp = os.path.join(D, 'xmodel', name + '.json')
    if not os.path.exists(xp):
        missing.add(name)
        continue
    xm = json.load(open(xp))
    lods = xm['lods']
    pl = inst['placement']

    # Pick the LOD the game would show at the closest any view gets to the
    # model. The camera never comes nearer than that, so this is the finest
    # level we can ever need.
    #
    # Without views we are presumably making a bundle to explore the map
    # with, so take the coarsest level and keep the bundle light.
    #
    lod = lods[-1]['file']
    if visible is not None and len(visible['cams']):
        o3 = to_three(np.array(pl['origin'])) * INCH
        dist = np.min(np.linalg.norm(visible['cams'] - o3, axis=1)) / INCH
        for l in lods:
            if dist <= l['distance']:
                lod = l['file']; break

    path = os.path.join(D, lod)
    if path not in glbcache:
        glbcache[path] = read_glb(path)

    A = np.array(pl['axis'], dtype=np.float64) # Rows: forward, left, up.
    o = np.array(pl['origin'], dtype=np.float64)
    sc = pl['scale']
    for (mat, pos, nrm, uv, idx) in glbcache[path]:
        if mat is None:
            continue
        info = material_info(mat)
        if info is None:
            continue

        # Bring the model into game space, apply the placement, and then
        # convert to ours. Normals only get the rotation, and we normalize
        # them again afterwards.
        #
        used, idx = np.unique(idx, return_inverse=True)
        pos, nrm, uv = pos[used], nrm[used], uv[used]
        gp = game_from_glb(pos)
        gn = game_from_glb(nrm)
        wp = (gp * sc) @ A + o
        wn = gn @ A
        g = group(mat, -2, info)
        g['pos'].append(to_three(wp) * INCH)
        n3 = to_three(wn)
        l = np.linalg.norm(n3, axis=1, keepdims=True); l[l == 0] = 1
        g['nrm'].append(n3 / l)
        g['uv'].append(uv)
        g['lm'].append(np.zeros((len(pos), 2), np.float32))
        g['sid'].append(np.full(len(pos), 100000 + mi_, np.uint32))
        g['px'] = g.get('px', 0) + (pix.get(100000 + mi_, 0) if visible is not None else 0)

        # oat already writes these counter-clockwise, so the winding stays.
        #
        g['idx'].append(idx.reshape(-1, 3) + g['n'])
        g['n'] += len(pos)
    sm_count += 1

print(f'static models: {sm_count}', file=sys.stderr)
if missing:
    print(f'models not in this zone: {" ".join(sorted(missing))}', file=sys.stderr)

# Pack the groups into scene.bin, which scene.js views directly as typed
# arrays.
#
# Positions are 16-bit, quantized within the bounds of the whole scene,
# which on a typical map comes to about a centimeter. Normals are 8-bit,
# lightmap coordinates 16-bit, and the uvs stay as floats since they tile
# well outside 0..1. Positions and normals carry an unused fourth component
# and every array starts on a four-byte boundary, which is what typed
# arrays need to view the data in place.
#
allpos = np.concatenate([np.concatenate(g['pos']) for g in groups.values()])
bmin = allpos.min(0); bmax = allpos.max(0)
ext = np.maximum(bmax - bmin, 1e-6)

# Store the groups in the order scene.js draws their kinds (see ORDER
# there) and then by lightmap and material, so that a manifest reads in
# drawing order.
#
KIND_ORDER = {'opaque': 0, 'unlit': 1, 'cutout': 2, 'water': 3, 'multiply': 4, 'blend': 5, 'cloud': 6, 'add': 7}
order = sorted(groups.values(), key=lambda g: (KIND_ORDER[g['info']['kind']], g['lmap'], g['mat']))

# Pad buf to a multiple of n bytes so that the next array starts aligned.
#
buf = io.BytesIO()
def align(n=4):
    pad = (-buf.tell()) % n
    buf.write(b'\0' * pad)

out_groups = []
textures = {}
for g in order:
    pos = np.concatenate(g['pos']); nrm = np.concatenate(g['nrm'])
    uv = np.concatenate(g['uv']).astype(np.float32); lm = np.concatenate(g['lm'])
    idx = np.concatenate(g['idx']).reshape(-1)
    n = len(pos)
    q = np.round((pos - bmin) / ext * 65535).clip(0, 65535).astype('<u2')
    qn = np.round(nrm * 127).clip(-127, 127).astype('i1')
    qlm = np.round(np.clip(lm, 0, 1) * 65535).astype('<u2')
    rec = {'mat': g['mat'], 'kind': g['info']['kind'], 'lmap': g['lmap'], 'count': n,
           'tex': g['info']['color'], 'uvAnim': g['info']['uvAnim'], 'tint': g['info']['tint'][:3]}
    align(4); rec['pos'] = buf.tell(); buf.write(np.c_[q, np.zeros((n, 1), '<u2')].tobytes())
    align(4); rec['nrm'] = buf.tell(); buf.write(np.c_[qn, np.zeros((n, 1), 'i1')].tobytes())
    align(4); rec['uv'] = buf.tell(); buf.write(uv.tobytes())
    if g['lmap'] >= 0:
        align(4); rec['lm'] = buf.tell(); buf.write(qlm.tobytes())
    if args.ids:
        align(4); rec['sid'] = buf.tell(); buf.write(np.concatenate(g['sid']).astype('<u4').tobytes())
    align(4)
    if n <= 65535:
        rec['idx'] = buf.tell(); rec['idx16'] = True; buf.write(idx.astype('<u2').tobytes())
    else:
        rec['idx'] = buf.tell(); rec['idx16'] = False; buf.write(idx.astype('<u4').tobytes())
    rec['tris'] = len(idx) // 3
    out_groups.append(rec)

    # Add up the pixels each color map covers over all its groups. We size
    # the textures by that below.
    #
    if g['info']['color']:
        t = textures.setdefault(g['info']['color'], {'kind': g['info']['kind'], 'px': 0})
        t['px'] += g.get('px', 0)

open(os.path.join(O, 'scene.bin'), 'wb').write(buf.getvalue())

# Open the dump's DDS image for name. oat replaces '*' in some image names
# when it writes the files, so fall back to that spelling.
#
def open_dds(name):
    p = os.path.join(D, 'images', name + '.dds')
    if not os.path.exists(p):
        p = os.path.join(D, 'images', name.replace('*', '_') + '.dds')
    return Image.open(p)

# Save im as tex/<name>.webp and return the file size, which we add up for
# the summary.
#
def save_webp(im, name, q=None, lossless=False):
    path = os.path.join(O, 'tex', name + '.webp')
    im.save(path, 'WEBP', quality=q or args.quality, method=6, lossless=lossless)
    return os.path.getsize(path)

# Return im with the color of its transparent texels filled in from the
# nearest opaque ones.
#
# The color under a transparent texel is whatever the artist or the
# compressor left there, often black or something garish. At full size the
# alpha hides it, but mipmapping averages it into the visible edges, which
# then show dark fringes and, on distant foliage, colored speckle. So we
# replace it with the color around it. We build an alpha-weighted mip chain
# and fill each level's gaps from the next coarser one, which bridges a gap
# of any size in a handful of levels. Texels count as opaque from an alpha
# of 0.5, the same threshold as the alpha test.
#
# Note that this is all done in floating point. The weights get small at
# the coarse levels, and dividing by them in eight bits turns rounding
# error into the very speckle we are getting rid of.
#
def bleed(im):
    a = np.asarray(im, dtype=np.float64) / 255.0
    rgb, al = a[..., :3], a[..., 3]
    w = (al >= 0.5).astype(np.float64)

    # Return c with the texels where w is zero filled in from a half-size,
    # weighted average of c, recursively.
    #
    def fill(c, w):
        h, wd = w.shape
        if h <= 1 and wd <= 1 or w.all():
            return c

        # Pad to an even size by repeating the edge and then sum each 2x2
        # block, weighted by w.
        #
        ph, pw = h + (h & 1), wd + (wd & 1)
        cp = np.pad(c * w[..., None], ((0, ph - h), (0, pw - wd), (0, 0)), mode='edge')
        wp = np.pad(w, ((0, ph - h), (0, pw - wd)), mode='edge')
        cs = cp.reshape(ph // 2, 2, pw // 2, 2, 3).sum((1, 3))
        ws = wp.reshape(ph // 2, 2, pw // 2, 2).sum((1, 3))
        if not ws.any():
            return c
        coarse = fill(cs / np.maximum(ws, 1e-9)[..., None], (ws > 0).astype(np.float64))
        up = coarse.repeat(2, 0).repeat(2, 1)[:h, :wd]
        return np.where(w[..., None] > 0, c, up)

    out = fill(rgb, w)
    return Image.fromarray(np.round(np.concatenate([out, al[..., None]], -1).clip(0, 1) * 255).astype(np.uint8), 'RGBA')

# Return name as a file name that is also safe in a URL, with everything
# outside [A-Za-z0-9_-] replaced with '_'.
#
def safe(name):
    return ''.join(c if c.isalnum() or c in '-_' else '_' for c in name)

# Convert the color maps. The ones of transparent kinds keep their alpha
# and get bled (see bleed() above).
#
tex_out = {}
total = 0
if not args.no_textures:
    totalpx = max(1, sum(t['px'] for t in textures.values()))
    for name, t in sorted(textures.items()):
        kind = t['kind']
        share = t['px'] / totalpx
        try:
            im = open_dds(name)
        except Exception as e:
            print(f'texture {name}: {e}', file=sys.stderr)
            continue
        im.load()
        alpha = kind in ('cutout', 'blend', 'cloud', 'add')
        im = im.convert('RGBA' if alpha else 'RGB')
        if alpha:
            im = bleed(im)

        # Size each texture by its share of all the pixels the visibility
        # pass counted. A facade that fills much of the frame gets 1024
        # while a door handle gets 128. Without a pass everything gets
        # --tex-max.
        #
        if visible is None:
            mx = args.tex_max
        else:
            mx = 1024 if share > 0.02 else 512 if share > 0.003 else 256 if share > 0.0005 else 128
            mx = min(mx, args.tex_max)
        if max(im.size) > mx:
            s = mx / max(im.size)
            im = im.resize((max(1, round(im.size[0] * s)), max(1, round(im.size[1] * s))), Image.LANCZOS)
        fn = safe(name)
        total += save_webp(im, fn)
        tex_out[name] = fn
    for g in out_groups:
        g['tex'] = tex_out.get(g['tex'])

    # Drop the transparent groups whose color map turned out to be missing
    # from the dump (we printed a line for each above). They would draw as
    # white sheets, the same as with no color map at all.
    #
    out_groups = [g for g in out_groups if g['tex'] or g['kind'] in ('opaque', 'water')]

    # Convert the lightmaps.
    #
    # The primary image says how much of the sun reaches each texel and we
    # save it as is. The secondary one stacks two halves, each an RGB color
    # weighted by its alpha, that together make up the rest of the baked
    # light. The shader only needs their sum, so we bake it here, halved to
    # fit in eight bits, and save it as one texture.
    #
    # Note also that most of an atlas belongs to surfaces we dropped. We
    # black out every texel that no kept triangle covers, and flat black
    # compresses to next to nothing. The mask is dilated a little so that
    # filtering at the island edges still finds real data.
    #
    # @@ We worked out the encoding by looking at the results and never
    #    checked it against the game's shaders. It looks right, but the
    #    game may well do something slightly different.
    #
    from PIL import ImageDraw, ImageFilter
    for i in range(len(draw['lightmaps'])):
        lm = args.lm_max
        mask = Image.new('L', (lm, lm), 0)
        d_ = ImageDraw.Draw(mask)
        for tris in lm_tris.get(i, []):
            for tri in tris * lm:
                d_.polygon([tuple(p_) for p_ in tri], fill=255)
        mask = mask.filter(ImageFilter.MaxFilter(7))
        m_ = np.asarray(mask, dtype=np.float32)[..., None] / 255.0
        prim = open_dds(f'_lightmap{i}_primary'); prim.load()
        sec = open_dds(f'_lightmap{i}_secondary'); sec.load(); sec = sec.convert('RGBA')
        w, h = sec.size
        a = np.asarray(sec.crop((0, 0, w, h // 2)).resize((lm, lm), Image.LANCZOS), dtype=np.float32) / 255.0
        b = np.asarray(sec.crop((0, h // 2, w, h)).resize((lm, lm), Image.LANCZOS), dtype=np.float32) / 255.0
        light = (a[..., :3] * a[..., 3:] + b[..., :3] * b[..., 3:]) * 0.5 * m_
        prim = np.asarray(prim.convert('L').resize((lm, lm), Image.LANCZOS), dtype=np.float32)[..., None] * m_
        total += save_webp(Image.fromarray(np.round(light * 255).clip(0, 255).astype(np.uint8)), f'lm{i}', q=88)
        total += save_webp(Image.fromarray(prim[..., 0].clip(0, 255).astype(np.uint8)), f'lm{i}p', q=85)

    # Convert the sky into an equirectangular panorama, which is the shape
    # our sky shader samples.
    #
    # The sky is a DXT cube map, which PIL doesn't handle. So we slice the
    # faces out of the file ourselves and give each a copy of the header,
    # patched to describe a plain texture with a single mip.
    #
    p = os.path.join(D, 'images', world['skies'][0]['skyImage'] + '.dds')
    raw = open(p, 'rb').read()
    hdr = bytearray(raw[:128])
    size = struct.unpack_from('<I', hdr, 16)[0]
    mips = max(1, struct.unpack_from('<I', hdr, 28)[0])
    fourcc = bytes(hdr[84:88])
    bpb = 8 if fourcc == b'DXT1' else 16
    def mip_bytes(s):
        return max(1, (s + 3) // 4) ** 2 * bpb
    face_bytes = sum(mip_bytes(max(1, size >> m)) for m in range(mips))
    struct.pack_into('<I', hdr, 112, 0) # Not a cube map.
    struct.pack_into('<I', hdr, 28, 1)  # One mip.
    struct.pack_into('<I', hdr, 8, struct.unpack_from('<I', hdr, 8)[0] & ~0x20000) # No mip count.
    faces = []
    for f in range(6):
        off = 128 + f * face_bytes
        data = bytes(hdr) + raw[off:off + mip_bytes(size)]
        im = Image.open(io.BytesIO(data)); im.load()
        faces.append(np.asarray(im.convert('RGB'), dtype=np.float32))
    W, H = 2048, 1024
    lon = (np.arange(W) + 0.5) / W * 2 * np.pi - np.pi
    lat = np.pi / 2 - (np.arange(H) + 0.5) / H * np.pi
    lon, lat = np.meshgrid(lon, lat)

    # Work out the face and texel each panorama texel looks at. We build
    # the directions in game space (Z up) with u = 0.5 looking down +X, and
    # pick the face the way D3D does, with the game vector as is.
    #
    d = np.stack([np.cos(lat) * np.cos(lon), np.cos(lat) * np.sin(lon), np.sin(lat)], -1)
    ax = np.abs(d)
    pano = np.zeros((H, W, 3), np.float32)
    x, y, z = d[..., 0], d[..., 1], d[..., 2]
    face = np.where((ax[..., 0] >= ax[..., 1]) & (ax[..., 0] >= ax[..., 2]), np.where(x > 0, 0, 1),
            np.where(ax[..., 1] >= ax[..., 2], np.where(y > 0, 2, 3), np.where(z > 0, 4, 5)))
    sc = np.select([face == 0, face == 1, face == 2, face == 3, face == 4, face == 5],
                   [-z, z, x, x, x, -x])
    tc = np.select([face == 0, face == 1, face == 2, face == 3, face == 4, face == 5],
                   [-y, -y, z, -z, -y, -y])
    ma = np.select([face < 2, face < 4], [ax[..., 0], ax[..., 1]], ax[..., 2])
    u = (sc / ma + 1) / 2; v = (tc / ma + 1) / 2
    for f in range(6):
        m = face == f
        fi = faces[f]
        px = np.clip((u[m] * size).astype(int), 0, size - 1)
        py = np.clip((v[m] * size).astype(int), 0, size - 1)
        pano[m] = fi[py, px]
    total += save_webp(Image.fromarray(pano.astype(np.uint8)), 'sky', q=82)

# Take the sun from the map's first directional primary light. Note that
# its direction points towards the light, which is also what our shaders
# expect.
#
com = json.load(open(glob.glob(os.path.join(D, 'comworld/maps/mp/*.d3dbsp.json'))[0]))
sun = next(l for l in com['primaryLights'] if l['type'] == 1)

manifest = {
    'bounds': {'min': bmin.tolist(), 'max': bmax.tolist()},
    'lightmaps': len(draw['lightmaps']),
    'sun': {'dir': to_three(sun['dir']).tolist(), 'color': sun['color']},
    'groups': out_groups,
}
json.dump(manifest, open(os.path.join(O, 'scene.json'), 'w'), separators=(',', ':'))
tris = sum(g['tris'] for g in out_groups)
print(f'groups {len(out_groups)}, tris {tris}, bin {buf.tell()/1e6:.1f} MB, textures {total/1e6:.1f} MB', file=sys.stderr)
