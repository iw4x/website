const express = require('express');
const path = require('path');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3001;
const CACHE_DURATION = 5 * 60 * 1000;

let playerStatsCache = null;
let lastFetch = 0;

function fetchPlayerStats() {
    return new Promise((resolve) => {
        const currentOptions = {
            hostname: 'iw4x.dev',
            path: '/v1/stats/current',
            method: 'GET',
            headers: { 'User-Agent': 'IW4x-Website/1.0' }
        };

        const historyOptions = {
            hostname: 'iw4x.dev',
            path: '/v1/stats?period=14d&protocol=152&granularity=hourly',
            method: 'GET',
            headers: { 'User-Agent': 'IW4x-Website/1.0' }
        };

        let currentStats = null;
        let historyStats = null;
        let completed = 0;

        function checkComplete() {
            if (++completed === 2) {
                const byProtocol = currentStats?.by_protocol?.['152'] || { players: 0, servers: 0 };
                const eightDaysAgo = Date.now() - (8 * 24 * 60 * 60 * 1000);
                const filteredData = historyStats?.data
                    ?.filter(item => (item.timestamp * 1000) >= eightDaysAgo)
                    ?.map(item => ({
                        timestamp: item.timestamp * 1000,
                        protocols: { '152': { players: item.player_count || 0 } }
                    }))
                    ?.sort((a, b) => a.timestamp - b.timestamp) || [];

                resolve({
                    players: byProtocol.players,
                    servers: byProtocol.servers,
                    history: {
                        hourly: filteredData
                    }
                });
            }
        }

        function makeRequest(options, callback) {
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    try {
                        callback(null, JSON.parse(data));
                    } catch (error) {
                        callback(error, null);
                    }
                });
            });
            req.on('error', callback);
            req.setTimeout(10000, () => {
                req.destroy();
                callback(new Error('Timeout'), null);
            });
            req.end();
        }

        makeRequest(currentOptions, (error, data) => {
            currentStats = error ? { by_protocol: { '152': { players: 0, servers: 0 } } } : data;
            checkComplete();
        });

        makeRequest(historyOptions, (error, data) => {
            historyStats = error ? { data: [] } : data;
            checkComplete();
        });
    });
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
    if (req.hostname === 'www.iw4x.dev') {
        const newUrl = `https://iw4x.dev${req.path}`;
        return res.redirect(301, newUrl);
    }
    if (req.hostname === 'iw4x.getserve.rs' && !req.path.startsWith('/v1')) {
        const newUrl = `https://iw4x.dev${req.path}`;
        return res.redirect(301, newUrl);
    }
    if (req.path === '/discord') {
        return res.redirect(301, 'https://discord.com/invite/pV2qJscTXf');
    }
    if (req.path === '/install' || req.path === '/download') {
        return res.redirect(301, 'https://docs.iw4x.dev/install/launcher');
    }
    if (req.path === '/docs') {
        return res.redirect(301, 'https://docs.iw4x.dev/');
    }
    if (req.path === '/guides') {
        return res.redirect(301, 'https://docs.iw4x.dev/');
    }
    if (req.path === '/guides/install') {
        return res.redirect(301, 'https://docs.iw4x.dev/install/launcher');
    }
    if (req.path === '/guides/console') {
        return res.redirect(301, 'https://docs.iw4x.dev/guides/console');
    }
    if (req.path === '/guides/colorcodes') {
        return res.redirect(301, 'https://docs.iw4x.dev/guides/color-codes');
    }
    if (req.path === '/guides/botwarfare') {
        return res.redirect(301, 'https://docs.iw4x.dev/guides/botwarfare');
    }
    if (req.path === '/guides/disable-mod-unloading') {
        return res.redirect(301, 'https://docs.iw4x.dev/guides/cli-args/');
    }

    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    const now = Date.now();

    if (!playerStatsCache || (now - lastFetch) > CACHE_DURATION) {
        try {
            playerStatsCache = await fetchPlayerStats();
            lastFetch = now;
        } catch (error) {
            if (!playerStatsCache) {
                playerStatsCache = { players: 0, servers: 0, history: { hourly: [] } };
            }
        }
    }

    res.render('index', {
        current_year: new Date().getFullYear(),
        playerStats: playerStatsCache
    });
});

app.get('/robots.txt', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(`User-agent: *
Allow: /
Sitemap: https://iw4x.dev/sitemap.xml`);
});

app.get('/sitemap.xml', (req, res) => {
    res.set('Content-Type', 'text/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://iw4x.dev/</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://docs.iw4x.dev/install/launcher</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://docs.iw4x.dev/</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
</urlset>`);
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`IW4x website running on http://127.0.0.1:${PORT}`);
});