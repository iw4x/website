// Draw one of the multiplayer maps behind the hero.
//
// Each visit picks a map at random and fetches only that map's bundle,
// which is a few MB. The shots in shots.json say where the camera goes on
// each map and how the map is graded. tools/hero/views.py reads them as
// well, to know what the camera can see.
//
// All of this is decoration, so whatever goes wrong here should leave the
// page looking the way it does without script. We bail out quietly if
// there is no WebGL 2 or the user prefers to save data, and fade back out
// if the context gets lost.
//
// Note also that we only fetch scene.js, and with it the 170 KB of
// three.js, once we know we are going to draw. Keeping it in a module of
// its own is what makes that possible.
//

const container = document.getElementById ('hero-scene');

// Return true if we can get a WebGL 2 context.
//
function webgl () {
  try {
    return !!document.createElement ('canvas').getContext ('webgl2');
  } catch {
    return false;
  }
}

// A bundle is several MB, which is a lot to spend on a backdrop when the
// user asked to save data.
//
const saveData = navigator.connection && navigator.connection.saveData;

if (container && webgl () && !saveData)
  start ().catch (() => {}); // Decoration, see above.

// Load the scene and keep it drawing for as long as anybody can see it.
// Throw if loading fails.
//
async function start () {
  const [{ createScene }, shots] = await Promise.all ([
    import ('./scene.js'),
    fetch (new URL ('shots.json', import.meta.url)).then ((r) => r.json ()),
  ]);

  // Honor ?hero=<map> so that a shot can be worked on without reloading
  // until it comes up. Anything that isn't a map name gets the random pick.
  //
  const names = Object.keys (shots);
  const asked = new URLSearchParams (location.search).get ('hero');
  const name = names.includes (asked) ? asked : names[Math.floor (Math.random () * names.length)];
  const shot = shots[name];

  // Style the canvas through the CSSOM. Our CSP has no 'unsafe-inline' for
  // styles, so it blocks style attributes, and it leaves properties set
  // from script alone.
  //
  const canvas = document.createElement ('canvas');
  Object.assign (canvas.style, { position: 'absolute', inset: '0', width: '100%', height: '100%' });
  container.prepend (canvas);

  // If the scene fails to load, take the canvas out again before passing
  // the failure on, so that nothing is left on top of the page.
  //
  let s;
  try {
    s = await createScene (canvas, {
      base: new URL (`maps/${name}/`, import.meta.url).href,
      params: shot.grade,
    });
  } catch (e) {
    canvas.remove ();
    throw e;
  }

  const reduce = matchMedia ('(prefers-reduced-motion: reduce)');

  // The camera circles the shot's target at radius and height, looking at
  // it, and sweeps slowly back and forth along part of that circle. heading
  // is the compass direction (in degrees) the sweep is centered on and arc
  // gives its two ends relative to that. Along the way the distance and
  // height drift a little (by wobble and bob), which gives the move some
  // life.
  //
  // Note that convert.py only kept what can be seen from this path (see
  // tools/hero/visible/). So moving a shot means re-running its visibility
  // pass, otherwise holes will start to show.
  //
  const { target, radius, height, heading, arc, period } = shot;
  const bob = shot.bob || 0;
  const wobble = shot.wobble || 0;

  // Place the camera where it is t seconds into the shot. The sweep
  // follows a cosine, so it eases in and out at the ends. The distance
  // drifts at twice that rate and the height at the same rate, shifted so
  // that its peaks fall away from the ends.
  //
  function place (t) {
    const k = 0.5 - 0.5 * Math.cos ((t / period) * Math.PI * 2);
    const a = ((heading + arc[0] + (arc[1] - arc[0]) * k) * Math.PI) / 180;
    const r = radius - wobble * Math.sin ((t / period) * Math.PI * 4);
    const h = height + bob * Math.sin ((t / period) * Math.PI * 2 + 1.3);

    const c = s.camera;
    c.position.set (target[0] + r * Math.sin (a), h, target[2] + r * Math.cos (a));
    c.lookAt (target[0], target[1], target[2]);
  }

  // Size the drawing buffer to the container.
  //
  // Narrow screens get a wider vertical field of view so that the subject
  // stays in frame. We cap it at 60 degrees, which keeps it inside the 62
  // the visibility pass was run with. On large screens we also cap the
  // pixel ratio at 1.5. The scene sits under a scrim, and the extra
  // resolution would mostly cost frame rate.
  //
  function resize () {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h)
      return;

    const aspect = w / h;
    s.camera.fov = aspect >= 1.4 ? 38 : Math.min (60, 38 * (1.4 / aspect) ** 0.6);
    s.setSize (w, h, Math.min (devicePixelRatio || 1, w > 1200 ? 1.5 : 2));

    if (!running)
      frame (last); // Redraw the still frame at the new size.
  }

  let running = false;
  let visible = true;
  let raf = 0;
  let last = 0;

  // Start at a random point of the shot so that repeat visits open on
  // different views. With reduced motion this is also the still frame we
  // show.
  //
  let clock = Math.random () * period;
  let prev = performance.now ();

  // Draw a frame and, while running, advance the clock and ask for the
  // next one. We cap the step at a tenth of a second so that after a stall
  // (say, the tab was in the background) the camera carries on from where
  // it was.
  //
  function frame (now) {
    const dt = Math.min ((now - prev) / 1000, 0.1);
    prev = now;
    last = now;

    if (running)
      clock += dt;

    place (clock);
    s.render (clock);

    if (running)
      raf = requestAnimationFrame (frame);
  }

  // Run the animation while the hero is on screen and the tab is visible,
  // and never with reduced motion. Once stopped, the last frame drawn stays
  // up.
  //
  function update () {
    const go = visible && !document.hidden && !reduce.matches;
    if (go === running)
      return;

    running = go;

    if (go) {
      prev = performance.now ();
      raf = requestAnimationFrame (frame);
    } else
      cancelAnimationFrame (raf);
  }

  new ResizeObserver (resize).observe (container);
  new IntersectionObserver ((es) => {
    visible = es[es.length - 1].isIntersecting;
    update ();
  }).observe (container);
  document.addEventListener ('visibilitychange', update);
  reduce.addEventListener ('change', () => { update (); frame (performance.now ()); });

  // If we lose the context, fade back to the plain page. Restoring it would
  // mean fetching and uploading the whole bundle again, which is a lot of
  // work for something this rare.
  //
  canvas.addEventListener ('webglcontextlost', (e) => {
    e.preventDefault ();
    running = false;
    cancelAnimationFrame (raf);
    delete container.dataset.ready;
  });

  // Draw the first frame before we mark the container ready, so that the
  // fade in starts from a picture.
  //
  resize ();
  frame (performance.now ());
  update ();
  container.dataset.ready = '';
}
