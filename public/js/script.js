let playerChart = null;

function initCursorEffects() {
    if (window.innerWidth <= 480) return;
    document.addEventListener('mousedown', (e) => showHitmarker(e.clientX, e.clientY));
}

function showHitmarker(x, y) {
    const hitmarker = document.createElement('div');
    hitmarker.className = 'hitmarker';
    hitmarker.style.cssText = `left: ${x - 20}px; top: ${y - 20}px;`;
    document.body.appendChild(hitmarker);

    setTimeout(() => hitmarker.classList.add('show'), 10);
    setTimeout(() => {
        hitmarker.classList.remove('show');
        setTimeout(() => hitmarker.remove(), 300);
    }, 200);
}

function initPlayerStats() {
    if (window.playerStatsData) {
        updateCurrentStats(window.playerStatsData);
        updatePlayerChart(window.playerStatsData);
    } else {
        document.getElementById('current-players').textContent = '-';
        document.getElementById('current-servers').textContent = '-';
    }
}

function updateCurrentStats(data) {
    document.getElementById('current-players').textContent = data.players || 0;
    document.getElementById('current-servers').textContent = data.servers || 0;
}

function updatePlayerChart(data) {
    const ctx = document.getElementById('playerChart');
    if (!ctx) return;

    const hourlyData = data.history?.hourly || [];

    const chartData = hourlyData.map(item => ({
        x: item.timestamp,
        y: item.protocols?.['152']?.players || 0
    }));
    const timestamps = hourlyData.map(item => item.timestamp);

    playerChart?.destroy();

    playerChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Peak Players',
                data: chartData,
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
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function (context) {
                            const index = context[0].dataIndex;
                            const date = new Date(timestamps[index]);
                            return date.toLocaleDateString('en-US', {
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
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#c0c0c0',
                        maxTicksLimit: 6
                    }
                },
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        displayFormats: {
                            day: 'MMM dd'
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
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

document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();

    initCursorEffects();
    initPlayerStats();

    const video = document.getElementById('gameVideo');
    if (video) {
        video.addEventListener('loadeddata', () => video.play().catch(() => { }));
        video.addEventListener('error', () => video.style.display = 'none');
    }

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const gameFrame = document.querySelector('.game-frame');

        hero?.style.setProperty('transform', `translateY(${scrolled * 0.05}px)`);

        if (gameFrame) {
            const totalTilt = Math.min(8 + scrolled * 0.04, 35);
            gameFrame.style.transform = `perspective(800px) rotateX(${totalTilt}deg) rotateY(-3deg)`;
            gameFrame.style.setProperty('--glare-opacity', Math.min(0.25 + (totalTilt - 8) * 0.02, 0.6));
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});