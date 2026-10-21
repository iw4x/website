// Draw a multiplayer map the way the game lights it, more or less.
//
// tools/hero/convert.py turns an Unlinker dump of a map into the bundle we
// read here (see that script for the format). These maps get their look
// from the lighting baked into their lightmaps, so world surfaces take
// their light from those: the baked light, plus the sun masked by how much
// of it the primary lightmap says reaches each texel. Static models have
// no lightmap, and the best we can do for them is an ambient term and an
// unshadowed sun.
//
// Note that this is why we write our own shaders. The stock three.js
// materials have no notion of the game's two-part lightmaps.
//

import * as THREE from '../three/three.module.min.js';

// The one vertex shader for every kind of surface. uvScroll moves the
// scrolling layers along.
//
const VERT = /* glsl */ `
  attribute vec2 uv1;
  uniform vec2 uvScroll;
  varying vec2 vUv;
  varying vec2 vLm;
  varying vec3 vNormal;
  varying vec3 vWorld;
  void main () {
    vUv = uv + uvScroll;
    vLm = uv1;
    vNormal = normal;
    vec4 w = modelMatrix * vec4 (position, 1.0);
    vWorld = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;

// The one fragment shader for every kind of surface, specialized with
// defines (see createScene()).
//
const FRAG = /* glsl */ `
  uniform sampler2D map;
  uniform sampler2D lm;
  uniform sampler2D lmP;
  uniform vec3 tint;
  uniform vec3 sunDir;
  uniform vec3 sunColor;
  uniform vec3 ambient;
  uniform float lmScale;
  uniform float sunScale;
  uniform float modelLight;
  uniform vec3 fogColor;
  uniform vec3 fogSunColor;
  uniform float fogDensity;
  uniform float fogHeight;
  uniform float opacity;
  varying vec2 vUv;
  varying vec2 vLm;
  varying vec3 vNormal;
  varying vec3 vWorld;

  void main () {
    vec4 c = texture2D (map, vUv);
    #ifdef CUTOUT
      // Turn the alpha test into a ramp one pixel wide, which alpha to
      // coverage then turns into partial coverage of the edge. With a hard
      // test at 0.5, distant foliage shimmers and breaks up into speckle as
      // the camera moves.
      //
      c.a = clamp ((c.a - 0.5) / max (fwidth (c.a), 1e-4) + 0.5, 0.0, 1.0);
      if (c.a < 0.01) discard;
    #endif
    vec3 albedo = c.rgb * tint;

    // We draw both sides of every surface, so flip the normal for back
    // faces.
    //
    vec3 n = normalize (vNormal);
    if (!gl_FrontFacing) n = -n;
    float ndl = max (dot (n, sunDir), 0.0);

    #if defined (LIGHTMAP)
      // The lm texture holds the baked light other than the sun, at half
      // scale to fit in eight bits, and lmP says how much of the sun
      // reaches the texel.
      //
      vec3 baked = texture2D (lm, vLm).rgb * 2.0;
      float p = texture2D (lmP, vLm).r;
      vec3 light = baked * lmScale + sunColor * (p * ndl * sunScale);
    #elif defined (UNLIT)
      vec3 light = vec3 (1.0);
    #else
      // Models get an ambient term that is a bit brighter facing up, which
      // reads as light from the sky, and the sun at reduced strength to
      // make up for having no shadows.
      //
      vec3 light = (ambient * (0.75 + 0.25 * n.y) + sunColor * (ndl * sunScale * 0.6)) * modelLight;
    #endif

    vec3 col = albedo * light;
    #ifdef MULTIPLY
      // A multiply decal's color is what it scales the surface under it
      // by, so it takes no light of its own.
      //
      col = c.rgb;
    #endif

    // Fog grows with distance and thins out with height, so that tall
    // buildings and hills stay readable against the sky.
    //
    vec3 ray = vWorld - cameraPosition;
    float d = length (ray);
    float h = exp (-max (vWorld.y - fogHeight, 0.0) * 0.004);
    float f = 1.0 - exp (-d * fogDensity * mix (0.35, 1.0, h));

    // Tint the haze towards fogSunColor as we look towards the sun, the
    // way sunlit air glows.
    //
    vec3 haze = mix (fogColor, fogSunColor, pow (max (dot (ray / d, sunDir), 0.0), 6.0));

    // Fog each kind towards what makes it disappear into the haze. A
    // multiply decal fades towards white, which leaves the surface under
    // it alone, and an additive layer fades towards adding nothing.
    // Cutouts pass their coverage on as alpha.
    //
    #ifdef MULTIPLY
      col = mix (col, vec3 (1.0), f);
      gl_FragColor = vec4 (col, 1.0);
    #elif defined (ADDITIVE)
      gl_FragColor = vec4 (col * c.a * (1.0 - f) * opacity, 1.0);
    #elif defined (CUTOUT)
      col = mix (col, haze, f);
      gl_FragColor = vec4 (col, c.a);
    #else
      col = mix (col, haze, f);
      gl_FragColor = vec4 (col, c.a * opacity);
    #endif

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

// The sky sphere's vertex shader. Writing w as z puts every fragment on
// the far plane.
//
const SKY_VERT = /* glsl */ `
  varying vec3 vDir;
  void main () {
    vDir = position;
    vec4 p = projectionMatrix * modelViewMatrix * vec4 (position, 1.0);
    gl_Position = p.xyww;
  }
`;

const SKY_FRAG = /* glsl */ `
  uniform sampler2D sky;
  uniform float yaw;
  uniform float exposure;
  uniform float skyFog;
  uniform vec3 fogColor;
  uniform vec3 fogSunColor;
  uniform vec3 sunDir;
  varying vec3 vDir;
  void main () {
    vec3 d = normalize (vDir);

    // Turn the direction back into game space (Z up), which is where
    // convert.py built the panorama.
    //
    vec3 g = vec3 (d.x, -d.z, d.y);
    float lon = atan (g.y, g.x) + yaw;
    float lat = asin (clamp (g.z, -1.0, 1.0));
    vec2 uv = vec2 (lon / 6.2831853 + 0.5, 0.5 - lat / 3.1415927);
    vec3 col = texture2D (sky, uv).rgb * exposure;

    // On open maps the terrain ends where the ground painted into the
    // panorama begins, and the two don't line up. We hide the seam by
    // fading the sky near and below the horizon into the same haze as the
    // surfaces there. skyFog says how much, with 0 for maps that have no
    // seam.
    //
    vec3 haze = mix (fogColor, fogSunColor, pow (max (dot (d, sunDir), 0.0), 6.0));
    col = mix (col, haze, skyFog * (1.0 - smoothstep (-0.02, 0.2, d.y)));

    gl_FragColor = vec4 (col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

// Draw the opaque kinds first and then the ones that blend over them, with
// the additive glows last. convert.py stores the groups in the same order.
//
const ORDER = { opaque: 0, unlit: 1, cutout: 2, water: 3, multiply: 4, blend: 5, cloud: 6, add: 7 };

// Return a promise for the texture at url, set up the way the game samples
// it. Lightmaps and other data pass srgb as false.
//
function loadTexture (loader, url, srgb) {
  return new Promise ((resolve, reject) => {
    loader.load (url, (t) => {
      // Keep the rows as stored. The game's uvs assume D3D's top-left
      // origin, and so do the images.
      //
      t.flipY = false;
      t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.anisotropy = 4;
      resolve (t);
    }, undefined, reject);
  });
}

// Create the scene drawing into canvas and return once everything it needs
// is loaded. The bundle is fetched relative to options.base, which must
// end with a slash, and options.params overrides the grade (see below).
// Throw if any part of the bundle can't be fetched.
//
// The caller positions the returned camera and calls render() with the
// time in seconds, which only drives the scrolling layers.
//
export async function createScene (canvas, options = {}) {
  const base = options.base;

  // The default grade, tuned by eye on Highrise. shots.json overrides it
  // per map. Note that the grade sits on top of the map's own sun and
  // lightmaps, which we use as they are.
  //
  const params = Object.assign ({
    lmScale: 0.6,
    sunScale: 3.4,
    sunTint: [1.2, 0.92, 0.68],
    exposure: 1.3,
    skyExposure: 1.0,
    skyYaw: 0.0,
    ambient: [0.25, 0.28, 0.34],
    fogColor: [0.11, 0.13, 0.17],
    fogSunColor: [0.85, 0.6, 0.35],
    fogDensity: 0.0014,
    fogHeight: 0.0,
    skyFog: 0.0,
    modelLight: 1.0,
  }, options.params || {});

  const renderer = new THREE.WebGLRenderer ({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: !!options.preserveDrawingBuffer,
  });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = params.exposure;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const [manifest, bin] = await Promise.all ([
    fetch (base + 'scene.json').then ((r) => { if (!r.ok) throw new Error (r.status); return r.json (); }),
    fetch (base + 'scene.bin').then ((r) => { if (!r.ok) throw new Error (r.status); return r.arrayBuffer (); }),
  ]);

  // Fetch every texture up front. The page only fades the scene in once it
  // is complete, so there is nothing to gain from drawing before they are
  // all here.
  //
  const loader = new THREE.TextureLoader ();
  const texNames = new Set ();
  for (const g of manifest.groups) if (g.tex) texNames.add (g.tex);

  const lmNames = [];
  for (let i = 0; i < manifest.lightmaps; i++) lmNames.push (`lm${i}`, `lm${i}p`);

  const tex = {};
  await Promise.all ([
    ...[...texNames].map (async (n) => { tex[n] = await loadTexture (loader, `${base}tex/${n}.webp`, true); }),
    ...lmNames.map (async (n) => { tex[n] = await loadTexture (loader, `${base}tex/${n}.webp`, false); }),
    (async () => { tex.sky = await loadTexture (loader, `${base}tex/sky.webp`, true); })(),
  ]);

  // Lightmap uvs stay inside the atlas, and clamping keeps filtering at
  // its edges from picking up the opposite side. The panorama only wraps
  // around horizontally.
  //
  for (const n of lmNames) {
    tex[n].wrapS = tex[n].wrapT = THREE.ClampToEdgeWrapping;
  }
  tex.sky.wrapT = THREE.ClampToEdgeWrapping;

  // Opaque surfaces without a color map (see convert.py) sample this.
  //
  const white = new THREE.DataTexture (new Uint8Array ([255, 255, 255, 255]), 1, 1);
  white.needsUpdate = true;

  const scene = new THREE.Scene ();
  const sunDir = new THREE.Vector3 (...manifest.sun.dir).normalize ();
  const sunColor = new THREE.Color (...manifest.sun.color).multiply (new THREE.Color (...params.sunTint));
  const fogColor = new THREE.Color (...params.fogColor);

  // The uniforms every material shares. Changing one of them (say, while
  // tuning a grade) changes it everywhere.
  //
  const shared = {
    sunDir: { value: sunDir },
    sunColor: { value: sunColor },
    ambient: { value: new THREE.Color (...params.ambient) },
    lmScale: { value: params.lmScale },
    sunScale: { value: params.sunScale },
    modelLight: { value: params.modelLight },
    fogColor: { value: fogColor },
    fogSunColor: { value: new THREE.Color (...params.fogSunColor) },
    fogDensity: { value: params.fogDensity },
    fogHeight: { value: params.fogHeight },
  };

  // Positions arrive quantized to 16 bits within the bundle's bounds, and
  // we expand them here. That way three.js sees the real positions and
  // works out bounding spheres, and so culling, the usual way.
  //
  const bmin = manifest.bounds.min;
  const ext = manifest.bounds.max.map ((v, i) => v - bmin[i]);
  const scrolling = [];

  for (const g of manifest.groups) {
    const n = g.count;
    const q = new Uint16Array (bin, g.pos, n * 4);
    const pos = new Float32Array (n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = bmin[0] + (q[i * 4] / 65535) * ext[0];
      pos[i * 3 + 1] = bmin[1] + (q[i * 4 + 1] / 65535) * ext[1];
      pos[i * 3 + 2] = bmin[2] + (q[i * 4 + 2] / 65535) * ext[2];
    }
    const geo = new THREE.BufferGeometry ();
    geo.setAttribute ('position', new THREE.BufferAttribute (pos, 3));
    geo.setAttribute ('normal', new THREE.BufferAttribute (new Int8Array (bin, g.nrm, n * 4), 4, true));
    geo.setAttribute ('uv', new THREE.BufferAttribute (new Float32Array (bin, g.uv, n * 2), 2));
    if (g.lm !== undefined)
      geo.setAttribute ('uv1', new THREE.BufferAttribute (new Uint16Array (bin, g.lm, n * 2), 2, true));
    const ic = g.tris * 3;
    geo.setIndex (new THREE.BufferAttribute (g.idx16 ? new Uint16Array (bin, g.idx, ic) : new Uint32Array (bin, g.idx, ic), 1));
    geo.computeBoundingSphere ();

    // Pick the shader variant. Water goes down the unlit path since
    // convert.py gives it a flat color.
    //
    const defines = {};
    const kind = g.kind;
    if (g.lmap >= 0) defines.LIGHTMAP = '';
    if (kind === 'cutout') defines.CUTOUT = '';
    if (kind === 'unlit' || kind === 'add' || kind === 'water') defines.UNLIT = '';
    if (kind === 'multiply') defines.MULTIPLY = '';
    if (kind === 'add') defines.ADDITIVE = '';

    const lm = g.lmap >= 0 ? g.lmap : 0;
    const uvScroll = { value: new THREE.Vector2 () };
    const mat = new THREE.ShaderMaterial ({
      vertexShader: VERT,
      fragmentShader: FRAG,
      defines,
      uniforms: {
        ...shared,
        map: { value: (g.tex && tex[g.tex]) || white },
        lm: { value: tex[`lm${lm}`] },
        lmP: { value: tex[`lm${lm}p`] },
        tint: { value: new THREE.Color (...g.tint) },
        opacity: { value: 1 },
        uvScroll,
      },
      side: THREE.DoubleSide,
    });

    if (kind === 'cutout')
      mat.alphaToCoverage = true;

    // Set up blending for the kinds that draw over others. None of them
    // writes depth, so they never hide what comes after them. A multiply
    // decal scales what is under it by its color and an additive layer
    // adds to it.
    //
    if (kind === 'blend' || kind === 'cloud') {
      mat.transparent = true;
      mat.depthWrite = false;
    } else if (kind === 'multiply') {
      mat.transparent = true;
      mat.depthWrite = false;
      mat.blending = THREE.CustomBlending;
      mat.blendSrc = THREE.ZeroFactor;
      mat.blendDst = THREE.SrcColorFactor;
      mat.polygonOffset = true;
      mat.polygonOffsetFactor = -1;
      mat.polygonOffsetUnits = -4;
    } else if (kind === 'add') {
      mat.transparent = true;
      mat.depthWrite = false;
      mat.blending = THREE.CustomBlending;
      mat.blendSrc = THREE.OneFactor;
      mat.blendDst = THREE.OneFactor;
    }

    // The blend layers in the world are decals as well. Pull them towards
    // the camera a little, the same as the multiply ones above, so that
    // they don't fight with the surface underneath.
    //
    if (kind === 'blend') {
      mat.polygonOffset = true;
      mat.polygonOffsetFactor = -1;
      mat.polygonOffsetUnits = -4;
    }

    // Nothing in the scene moves, so skip the matrix updates. The group
    // goes along in userData for the tools that need to know where a mesh
    // came from (see tools/hero/visibility.html).
    //
    const mesh = new THREE.Mesh (geo, mat);
    mesh.renderOrder = ORDER[kind];
    mesh.matrixAutoUpdate = false;
    mesh.userData.group = g;
    scene.add (mesh);
    if (g.uvAnim && (g.uvAnim[0] || g.uvAnim[1])) scrolling.push ({ uvScroll, rate: g.uvAnim });
  }

  // Draw the sky as a unit sphere centered on the camera. It goes first,
  // lands on the far plane, and writes no depth, so everything else draws
  // over it.
  //
  const sky = new THREE.Mesh (
    new THREE.SphereGeometry (1, 48, 24),
    new THREE.ShaderMaterial ({
      vertexShader: SKY_VERT,
      fragmentShader: SKY_FRAG,
      uniforms: {
        sky: { value: tex.sky },
        yaw: { value: params.skyYaw },
        exposure: { value: params.skyExposure },
        skyFog: { value: params.skyFog },
        fogColor: shared.fogColor,
        fogSunColor: shared.fogSunColor,
        sunDir: shared.sunDir,
      },
      side: THREE.BackSide,
      depthWrite: false,
    }),
  );
  sky.renderOrder = -1;
  sky.frustumCulled = false;
  scene.add (sky);

  const camera = new THREE.PerspectiveCamera (50, 1, 0.5, 20000);
  sky.onBeforeRender = () => { sky.position.copy (camera.position); sky.updateMatrixWorld (); };

  // Size the drawing buffer to w by h CSS pixels at a pixel ratio of dpr.
  // The canvas element itself is sized by CSS (see main.js).
  //
  function setSize (w, h, dpr) {
    renderer.setPixelRatio (dpr);
    renderer.setSize (w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix ();
  }

  // Draw the scene at time t (in seconds).
  //
  function render (t) {
    for (const s of scrolling) s.uvScroll.value.set (s.rate[0] * t, s.rate[1] * t);
    renderer.render (scene, camera);

    // Alpha to coverage leaves the cutout alpha in the drawing buffer, and
    // the browser may composite the canvas with it even though we asked for
    // no alpha. Bright pixels (say, foliage in thick fog) then come out as
    // colored speckle. So we reset the alpha to opaque before handing the
    // frame over.
    //
    const gl = renderer.getContext ();
    gl.colorMask (false, false, false, true);
    gl.clearColor (0, 0, 0, 1);
    gl.clear (gl.COLOR_BUFFER_BIT);
    renderer.resetState ();
  }

  return { renderer, scene, camera, setSize, render, manifest, params, shared, sky };
}
