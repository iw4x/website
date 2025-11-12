let playerChart = null;

function
init_theme ()
{
  const sys = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', sys ? 'dark' : 'light');

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  });
}

function
init_ambient_glow ()
{
  if (window.innerWidth <= 768)
    return;

  const v = document.getElementById('gameVideo');
  const c = document.querySelector('.video-container');

  if (!v || !c)
    return;

  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 36;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx)
    return;

  const glow = document.createElement('div');
  glow.className = 'ambient-glow-js';
  c.appendChild(glow);

  let last = 0;
  let frame = null;
  const interval = 100;

  function
  sample_color ()
  {
    try {
      ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
      const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      let r = 0, g = 0, b = 0;
      let n = 0;

      for (let i = 0; i < d.length; i += 16)
      {
        r += d[i];
        g += d[i + 1];
        b += d[i + 2];
        n++;
      }

      r = Math.floor(r / n);
      g = Math.floor(g / n);
      b = Math.floor(b / n);

      // Soft green blend. Intentional bias for consistency.
      const gr = 95, gg = 184, gb = 84;
      const f = 0.6;

      r = Math.floor(r * f + gr * (1 - f));
      g = Math.min(255, Math.floor(g * f + gg * (1 - f)) * 1.2);
      b = Math.floor(b * f + gb * (1 - f));

      return `rgb(${r}, ${g}, ${b})`;
    }
    catch (_) {
      return 'rgb(95, 184, 84)';
    }
  }

  function
  update (t)
  {
    if (t - last >= interval)
    {
      glow.style.background = sample_color();
      last = t;
    }

    frame = requestAnimationFrame(update);
  }

  v.addEventListener('loadeddata', () => {
    setTimeout(() => frame = requestAnimationFrame(update), 500);
  });

  window.addEventListener('beforeunload', () => {
    if (frame !== null)
      cancelAnimationFrame(frame);
  });
}

function
init_3d_tilt ()
{
  const f = document.querySelector('.game-frame');
  if (!f)
    return;

  if (window.innerWidth <= 768)
    return;

  let hover = false;

  f.addEventListener('mouseenter', () => hover = true);
  f.addEventListener('mouseleave', () => {
    hover = false;
    f.style.transform = 'perspective(800px) rotateX(8deg) rotateY(-3deg)';
  });

  f.addEventListener('mousemove', (e) => {
    if (!hover)
      return;

    const r = f.getBoundingClientRect();
    const cx = r.width / 2;
    const cy = r.height / 2;

    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const rx = ((y - cy) / cy) * -8;
    const ry = ((x - cx) / cx) * 8;

    const final_x = 8 + rx;
    const final_y = -3 + ry;

    f.style.transform =
      `perspective(800px) rotateX(${final_x}deg) rotateY(${final_y}deg)`;
  });
}

function
show_hitmarker (x, y)
{
  const m = document.createElement('div');
  m.className = 'hitmarker';
  m.style.left = `${x - 20}px`;
  m.style.top  = `${y - 20}px`;

  document.body.appendChild(m);

  setTimeout(() => m.classList.add('show'), 10);
  setTimeout(() => {
    m.classList.remove('show');
    setTimeout(() => m.remove(), 300);
  }, 200);
}

function
update_current_stats (d)
{
  const p = document.getElementById('current-players');
  const s = document.getElementById('current-servers');

  p.textContent = d.players || 0;
  s.textContent = d.servers || 0;
}

function
update_player_chart (d)
{
  const ctx = document.getElementById('playerChart');
  if (!ctx)
    return;

  const hist = d.history?.hourly || [];
  const ts = hist.map(e => e.timestamp);

  const data = hist.map(e => ({
    x: e.timestamp,
    y: e.protocols?.['152']?.players || 0
  }));

  if (playerChart !== null)
    playerChart.destroy();

  playerChart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Peak Players',
        data: data,
        borderColor: '#5fb854',
        backgroundColor: 'rgba(95, 184, 84, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: '#5fb854',
        pointBorderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: (c) => {
              const i = c[0].dataIndex;
              const t = new Date(ts[i]);
              return t.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#c0c0c0', maxTicksLimit: 6 }
        },
        x: {
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: { day: 'MMM dd' }
          },
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: {
            color: '#c0c0c0',
            maxRotation: 0,
            minRotation: 0,
            maxTicksLimit: 5
          }
        }
      }
    }
  });
}

function
init_player_stats ()
{
  const d = window.playerStatsData;

  if (d)
  {
    update_current_stats(d);
    update_player_chart(d);
  }
  else
  {
    document.getElementById('current-players').textContent = '-';
    document.getElementById('current-servers').textContent = '-';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined')
    lucide.createIcons();

  init_player_stats();

  const v = document.getElementById('gameVideo');
  if (v)
  {
    v.addEventListener('loadeddata', () => v.play().catch(() => {}));
    v.addEventListener('error', () => v.style.display = 'none');
  }

  window.addEventListener('scroll', () => {
    const y = window.pageYOffset;

    const h = document.querySelector('.hero');
    if (h)
      h.style.setProperty('transform', `translateY(${y * 0.05}px)`);

    const f = document.querySelector('.game-frame');
    if (f)
    {
      const tilt = Math.min(8 + y * 0.04, 35);
      f.style.transform =
        `perspective(800px) rotateX(${tilt}deg) rotateY(-3deg)`;

      const g = Math.min(0.25 + (tilt - 8) * 0.02, 0.6);
      f.style.setProperty('--glare-opacity', g);
    }
  });
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t)
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

init_theme();

document.addEventListener('DOMContentLoaded', () => {
  const t = document.querySelector('.theme-toggle');
  if (t)
    t.addEventListener('click', toggle_theme);

  init_ambient_glow();
  init_3d_tilt();
});
