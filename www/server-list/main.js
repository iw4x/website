// The server browser on /<lang>/servers.
//
// We ask the master server for the servers it knows about, the same list
// the game's own browser starts from, and show it as a table that can be
// sorted and filtered. Each row ends in a Join link to iw4x://<address>,
// which the client registers as its URL scheme (see ConnectProtocol in
// iw4x-client). So joining needs nothing from us beyond the link.
//
// Most of how the list behaves comes from what has been found to work in
// lists like this one, for people who use a screen reader in particular.
// Roughly:
//
// It is a real table, with the server name as the row header. Wang et al.
// (CHI 2022) asked screen reader users what makes a web table hard, and
// headers that aren't marked up as such, or not there at all, came first.
// Their participants also asked for a summary to get a picture of the
// table before reading it, and for a way to filter and sort it instead of
// reading through every row. The summary line above the table is that.
//
// A sortable column is a button in its header, and the header of the one
// column that is sorted carries aria-sort, as in the ARIA practices
// example and Adrian Roselli's write-up of it. Not every screen reader
// says anything when the sort changes, though, so we also say it through
// the announcer (servers-announce) ourselves.
//
// The filters apply as they change, which is fine as long as the result
// shows up within about a second (Nielsen Norman Group on applying
// filters). Here it is a few milliseconds since the whole list is already
// in the page. We do wait for the typing to stop before we announce the
// count, though, or the announcer would talk over every keystroke.
//
// And the list never changes by itself. It may be tempting to refresh it
// every so often, but then the rows would move under the pointer, and
// perhaps the Join that somebody was about to click would turn into
// another server's. It would also have to be announced, or not, and
// either is wrong for somebody. So the list is as of the time we show
// next to it, and the reader refreshes it when they want a newer one.
//
// Note that a page can't measure the ping to a game server, since that
// takes UDP. So there is no ping column. The game's own browser has one.
//

// Note that we hide and show the table's scrolling region rather than the
// table itself. Otherwise an empty region would still take focus.
//
const table = document.getElementById ('servers-table');
const region = table.parentElement;
const rows = document.getElementById ('servers-rows');
const template = document.getElementById ('servers-row');

const search = document.getElementById ('servers-search');
const mode = document.getElementById ('servers-mode');
const show = document.getElementById ('servers-show');
const refresh = document.getElementById ('servers-refresh');

const summary = document.getElementById ('servers-summary');
const announcer = document.getElementById ('servers-announce');
const empty = document.getElementById ('servers-empty');
const error = document.getElementById ('servers-error');

const lang = document.documentElement.lang || 'en';

const numbers = new Intl.NumberFormat (lang);
const clock = new Intl.DateTimeFormat (lang, {timeStyle: 'short'});
const collator = new Intl.Collator (lang, {sensitivity: 'base', numeric: true});

// Return the text with the given id from the page, with its {...} fields
// filled in from values. The text is in the page so that it gets
// translated with the rest of it (see servers-text-* in servers.html).
//
function text (id, values = {})
{
  let s = document.getElementById ('servers-text-' + id).textContent.trim ();

  for (const [k, v] of Object.entries (values))
    s = s.replaceAll ('{' + k + '}', v);

  return s;
}

// Say something through the announcer.
//
// We clear it first and set the text a moment later. A live region only
// speaks when its content changes, so this way the same message (say,
// sorting by the same column twice) is still read out the second time.
//
let announcing = 0;

function announce (s, delay = 0)
{
  clearTimeout (announcing);
  announcer.textContent = '';
  announcing = setTimeout (() => announcer.textContent = s, delay + 100);
}

// Return a server name, map name, or mod name the way we show it.
//
// The game colors names with ^ and a character (^1 is red, ^7 white, and
// so on) and draws :name: as the icon of that name. We drop both. The
// colors were picked against the game's own backgrounds and would often
// be unreadable against ours, and there is no text that would stand in
// for an icon.
//
function clean (s)
{
  return String (s).replace (/\^./g, '')
                   .replace (/:[A-Za-z0-9_]+:/g, ' ')
                   .replace (/\s+/g, ' ')
                   .trim ();
}

// Turn an entry of the master server's list into what we show, or return
// null if it isn't something we can show or join.
//
// The address ends up in an iw4x:// link, from which the client takes it
// straight into a connect command. The client checks it again, but there
// is no reason to make a link that it would refuse, so we hold the address
// to the same characters it allows.
//
// We also leave out the servers whose name the master server could not
// read. A few servers name themselves in a Chinese encoding (GBK, by the
// look of it) rather than in UTF-8, and the master decodes them as UTF-8
// all the same. Each byte that doesn't make sense as UTF-8 then becomes
// U+FFFD, the replacement character, so the name comes out as something
// like �Ŷ� - ��ս��. The original bytes are gone by the time the list
// reaches us, so there is nothing we could decode them back from, and a
// row whose name can't be read is not much use to anyone.
//
function server (e)
{
  if (typeof e !== 'object' || e === null)
    return null;

  if (String (e.hostname ?? '').includes ('�'))
    return null;

  const ip = String (e.ip ?? '');
  const port = Number (e.port);

  if (!/^[A-Za-z0-9.:_\-\[\]]+$/.test (ip) ||
      !Number.isInteger (port) || port < 1 || port > 65535)
    return null;

  const address = (ip.includes (':') ? '[' + ip + ']' : ip) + ':' + port;

  const players = Math.max (0, Number (e.clients) || 0);
  const bots = Math.max (0, Number (e.bots) || 0);
  const max = Math.max (0, Number (e.sv_maxclients) || 0);

  const mod = typeof e.fs_game === 'string'
    ? clean (e.fs_game.replace (/^mods\//, ''))
    : '';

  return {
    name: clean (e.hostname ?? '') || address,
    address,
    players,
    bots,
    max,
    map: clean (e.mapname_display || e.mapname || ''),

    // The map's own name (mp_rust) is what its thumbnail is named after.
    // It ends up in a URL, so we only keep one that looks like a map name.
    //
    mapname: /^mp_[a-z0-9_]+$/.test (e.mapname) ? e.mapname : '',
    mode: clean (e.gametype_display || e.gametype || ''),
    mod
  };
}

// The list as we last received it, and the order we show it in.
//
let servers = [];
let loaded = null;

let sort = {key: 'players', dir: 'descending'};

// The map thumbnails.
//
// While the pointer rests on a map name, we show the game's preview of
// that map next to it (see tools/server-list/previews.py for where they
// come from). maps/index.json lists the maps that have one. A custom map
// usually doesn't, and then its name simply has no thumbnail.
//
// The thumbnail is content that appears on hover, which WCAG 1.4.13 asks
// three things of. It has to be dismissible without moving the pointer,
// which Escape does. It has to be hoverable, so the pointer can move onto
// it without it going away, which is what the delay before we hide it is
// for. And it has to stay until the pointer leaves or it is dismissed,
// which it does, except that we also hide it on scroll since it would
// otherwise be left behind by its name.
//
// We only do this for a mouse. With touch there is no resting on a name,
// and the tap that would bring the thumbnail up is better left to the
// page.
//
const maps = new URL ('maps/', import.meta.url);

const preview = document.getElementById ('servers-preview');
const preview_image = document.getElementById ('servers-preview-image');
const preview_name = document.getElementById ('servers-preview-name');

let thumbnails = new Set ();
let showing = null;   // The map name whose thumbnail is up, if any.
let timer = 0;

function show_thumbnail (e)
{
  clearTimeout (timer);

  if (showing === e)
    return;

  showing = e;
  preview_image.src = new URL (e.dataset.preview + '.webp', maps).href;
  preview_name.textContent = e.textContent;
  preview.hidden = false;

  // Below the name if it fits there, otherwise above it, and never past
  // either side of the viewport.
  //
  const r = e.getBoundingClientRect ();
  const w = preview.offsetWidth;
  const h = preview.offsetHeight;
  const gap = 8;

  const top = r.bottom + gap + h <= innerHeight
    ? r.bottom + gap
    : Math.max (gap, r.top - gap - h);

  const left = Math.min (Math.max (gap, r.left), innerWidth - w - gap);

  preview.style.top = top + 'px';
  preview.style.left = left + 'px';
}

function hide_thumbnail ()
{
  clearTimeout (timer);
  showing = null;
  preview.hidden = true;
}

// Wait a moment before showing a thumbnail, so that the pointer passing
// over the list on its way somewhere else doesn't flash one up for every
// row it crosses. Moving from one name to the next, while one is already
// up, switches at once.
//
rows.addEventListener ('pointerover', ev =>
{
  const e = ev.pointerType === 'mouse'
    ? ev.target.closest ('[data-preview]')
    : null;

  if (e === null)
    return;

  clearTimeout (timer);

  if (showing !== null)
    show_thumbnail (e);
  else
    timer = setTimeout (() => show_thumbnail (e), 300);
});

rows.addEventListener ('pointerout', ev =>
{
  if (ev.target.closest ('[data-preview]') === null)
    return;

  clearTimeout (timer);
  timer = setTimeout (hide_thumbnail, 200);
});

preview.addEventListener ('pointerenter', () => clearTimeout (timer));
preview.addEventListener ('pointerleave', () =>
{
  clearTimeout (timer);
  timer = setTimeout (hide_thumbnail, 200);
});

document.addEventListener ('keydown', ev =>
{
  if (ev.key === 'Escape')
    hide_thumbnail ();
});

addEventListener ('scroll', hide_thumbnail, {capture: true, passive: true});
addEventListener ('resize', hide_thumbnail);

// Get the list of thumbnails. If we can't, then there are no thumbnails,
// which costs the list nothing else.
//
async function thumbnailed ()
{
  try
  {
    const r = await fetch (new URL ('index.json', maps));

    if (r.ok)
      thumbnails = new Set ((await r.json ()).filter (
        m => typeof m === 'string'));
  }
  catch (e)
  {
    console.error ('map thumbnails:', e);
  }
}

// The columns sort by the obvious thing, except for players, where we
// count the people first and only then the bots. A server with three
// people is busier than one with two people and ten bots. Ties go by
// name so that the order doesn't change from one sort to the next.
//
const compare =
{
  name: (a, b) => collator.compare (a.name, b.name),
  players: (a, b) => (a.players - b.players) || (a.bots - b.bots),
  map: (a, b) => collator.compare (a.map, b.map),
  mode: (a, b) => collator.compare (a.mode, b.mode)
};

// A click on the column that is already sorted reverses it. Any other
// column starts in the direction one is most likely to want: the busiest
// servers first, and names from A.
//
const first = {name: 'ascending', players: 'descending',
               map: 'ascending', mode: 'ascending'};

// Return the servers that pass the filters, in the current order.
//
function visible ()
{
  const q = search.value.trim ().toLocaleLowerCase (lang);
  const m = mode.value;
  const s = show.value;

  const r = servers.filter (v =>
  {
    if (s === 'players' && v.players === 0)
      return false;

    if (s === 'bots' && v.players === 0 && v.bots === 0)
      return false;

    if (m !== '' && v.mode !== m)
      return false;

    if (q !== '' &&
        ![v.name, v.map, v.mode, v.mod, v.address].some (
          f => f.toLocaleLowerCase (lang).includes (q)))
      return false;

    return true;
  });

  const c = compare[sort.key];
  const d = sort.dir === 'ascending' ? 1 : -1;

  return r.sort ((a, b) => d * c (a, b) || compare.name (a, b));
}

// Fill in one row from the template.
//
function row (v)
{
  const r = template.content.firstElementChild.cloneNode (true);
  const f = n => r.querySelector ('[data-field="' + n + '"]');

  // Each of these keeps to one line and ends in an ellipsis if it doesn't
  // fit (see the row template), so the title gives the whole of it to
  // whoever hovers over it.
  //
  const line = (n, s) =>
  {
    const e = f (n);
    e.textContent = s;
    e.title = s;
  };

  line ('name', v.name);
  line ('details', v.mod !== '' ? v.address + ' · ' + v.mod : v.address);
  line ('map', v.map);

  // A map with a thumbnail shows its name in full under the thumbnail,
  // so it gets no tooltip, which would only cover the thumbnail.
  //
  if (thumbnails.has (v.mapname))
  {
    f ('map').dataset.preview = v.mapname;
    f ('map').removeAttribute ('title');
  }
  line ('mode', v.mode);

  f ('players').textContent = text ('players', {
    count: numbers.format (v.players),
    max: numbers.format (v.max)});

  // A server without bots has no second line here. Its count is then
  // centered in the row, the same as the map and the mode.
  //
  if (v.bots !== 0)
    f ('bots').textContent = text ('bots', {count: numbers.format (v.bots)});
  else
    f ('bots').remove ();

  // Every row has a Join link, so the name goes into the link as well,
  // hidden. Otherwise a list of the page's links would be a column of
  // Joins that don't say what they join (WCAG 2.4.4).
  //
  f ('join').href = 'iw4x://' + v.address;
  f ('join-name').textContent = ' ' + v.name;

  return r;
}

// Return the summary of what the list currently shows.
//
function described (n)
{
  let s = text ('summary', {
    shown: numbers.format (n),
    total: numbers.format (servers.length),
    players: numbers.format (servers.reduce ((t, v) => t + v.players, 0))});

  if (loaded !== null)
    s += ' ' + text ('updated', {time: clock.format (loaded)});

  return s;
}

// Show the list as the filters and the sort say. Returns the summary so
// that the caller can announce it if that is called for.
//
function render ()
{
  const list = visible ();

  hide_thumbnail ();
  rows.replaceChildren (...list.map (row));

  region.hidden = list.length === 0;
  empty.hidden = list.length !== 0;
  error.hidden = true;

  for (const th of table.querySelectorAll ('th[data-sort]'))
  {
    if (th.dataset.sort === sort.key)
      th.setAttribute ('aria-sort', sort.dir);
    else
      th.removeAttribute ('aria-sort');
  }

  return (summary.textContent = described (list.length));
}

// Offer the modes that the servers are actually playing. The choice made
// so far stays if it is still on offer, so a refresh doesn't quietly undo
// a filter.
//
function modes ()
{
  const was = mode.value;
  const all = [...new Set (servers.map (v => v.mode).filter (m => m !== ''))]
    .sort (collator.compare);

  mode.replaceChildren (mode.options[0]);

  for (const m of all)
    mode.append (new Option (m, m));

  mode.value = all.includes (was) ? was : '';
}

// Ask the master server for the list.
//
// The refresh button stays focusable while we wait, since a disabled
// button would lose the focus of whoever just pressed it. aria-disabled
// tells them it does nothing for the moment, and we make it so.
//
let loading = false;

async function load ()
{
  if (loading)
    return;

  loading = true;
  refresh.setAttribute ('aria-disabled', 'true');
  summary.textContent = text ('loading');

  try
  {
    const r = await fetch (table.dataset.src, {cache: 'no-store',
                                               signal: AbortSignal.timeout (15000)});

    if (!r.ok)
      throw new Error ('HTTP ' + r.status);

    const json = await r.json ();

    if (!Array.isArray (json?.servers))
      throw new Error ('not a server list');

    servers = json.servers.map (server).filter (v => v !== null);
    loaded = new Date ();

    await thumbnails_listed;

    // Same as with the reset button: if this was Try again, then it is
    // about to be hidden, so move its focus to the list.
    //
    const retried = error.contains (document.activeElement);

    modes ();
    announce (render ());

    if (retried)
      region.focus ();
  }
  catch (e)
  {
    // Keep whatever list we had. It is out of date, but it may well
    // still be useful, and the time next to it says how old it is.
    //
    console.error ('server list:', e);

    if (servers.length === 0)
    {
      region.hidden = true;
      empty.hidden = true;
      error.hidden = false;
      summary.textContent = '';
    }
    else
      summary.textContent = described (visible ().length);

    announce (text ('failed'));
  }
  finally
  {
    loading = false;
    refresh.removeAttribute ('aria-disabled');
  }
}

// Wire it all up.
//
for (const th of table.querySelectorAll ('th[data-sort]'))
{
  th.querySelector ('button').addEventListener ('click', () =>
  {
    const key = th.dataset.sort;

    sort = sort.key === key
      ? {key, dir: sort.dir === 'ascending' ? 'descending' : 'ascending'}
      : {key, dir: first[key]};

    render ();

    const column = th.querySelector ('span').textContent.trim ();
    announce (text (sort.dir, {column}));
  });
}

search.addEventListener ('input', () => announce (render (), 1000));
mode.addEventListener ('change', () => announce (render ()));
show.addEventListener ('change', () => announce (render ()));

document.getElementById ('servers-filters').addEventListener (
  'submit', e => e.preventDefault ());

// The reset button sits in what render() is about to hide, which would
// leave its focus nowhere. So we move it to the list it just brought back.
//
document.getElementById ('servers-reset').addEventListener ('click', () =>
{
  search.value = '';
  mode.value = '';
  show.value = 'all';
  announce (render ());
  region.focus ();
});

refresh.addEventListener ('click', load);
document.getElementById ('servers-retry').addEventListener ('click', load);

document.getElementById ('servers-noscript').hidden = true;
document.getElementById ('servers-app').hidden = false;

// Ask for the list of thumbnails along with the server list. A row only
// learns whether its map has a thumbnail when it is drawn, so load()
// waits for this before it draws any.
//
const thumbnails_listed = thumbnailed ();

load ();
