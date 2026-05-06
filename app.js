// Common Chart.js Settings
Chart.defaults.color = '#8A97A8';
Chart.defaults.font.family = "'Inter', sans-serif";

// Theming variables matching CSS
const colors = {
    newGlenn: '#0052A3',      // Deep Blue
    blueMoon: '#00A3FF',      // Brand Light
    spaceSystems: '#00F0FF',  // Accent
    newShepard: '#8A97A8',    // Muted
    grid: 'rgba(255, 255, 255, 0.05)',
    tooltipBg: 'rgba(13, 22, 38, 0.9)'
};

// 1. Revenue Breakdown (Donut Chart)
const ctxRevenue = document.getElementById('revenueChart').getContext('2d');
new Chart(ctxRevenue, {
    type: 'doughnut',
    data: {
        labels: ['New Glenn (Launch & Kuiper)', 'Blue Moon (NASA Artemis)', 'Space Systems (Engines)', 'New Shepard (Tourism)'],
        datasets: [{
            data: [2.8, 1.8, 0.9, 0.6], // Values in Billions
            backgroundColor: [
                colors.newGlenn,
                colors.blueMoon,
                colors.spaceSystems,
                colors.newShepard
            ],
            borderWidth: 0,
            hoverOffset: 10
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#FFF',
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                backgroundColor: colors.tooltipBg,
                titleFont: { size: 14, family: 'Outfit' },
                bodyFont: { size: 13 },
                padding: 12,
                borderColor: 'rgba(0, 163, 255, 0.2)',
                borderWidth: 1,
                callbacks: {
                    label: function(context) {
                        return ` $${context.raw} Billion`;
                    }
                }
            }
        }
    }
});

// 2. Growth Projections (Line Chart)
const ctxGrowth = document.getElementById('growthChart').getContext('2d');

// Create gradient for the line chart fill
const gradientFill = ctxGrowth.createLinearGradient(0, 0, 0, 300);
gradientFill.addColorStop(0, 'rgba(0, 163, 255, 0.4)');
gradientFill.addColorStop(1, 'rgba(0, 163, 255, 0.0)');

new Chart(ctxGrowth, {
    type: 'line',
    data: {
        labels: ['2026', '2027', '2028', '2029', '2030'],
        datasets: [{
            label: 'Projected Revenue ($B)',
            data: [6.1, 8.5, 12.2, 16.0, 21.5],
            borderColor: colors.blueMoon,
            backgroundColor: gradientFill,
            borderWidth: 3,
            pointBackgroundColor: '#FFF',
            pointBorderColor: colors.blueMoon,
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
            fill: true,
            tension: 0.4 // Smooth curves
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false // Hide legend as there's only one line and the title explains it
            },
            tooltip: {
                backgroundColor: colors.tooltipBg,
                titleFont: { size: 14, family: 'Outfit' },
                bodyFont: { size: 13 },
                padding: 12,
                borderColor: 'rgba(0, 163, 255, 0.2)',
                borderWidth: 1,
                displayColors: false,
                callbacks: {
                    label: function(context) {
                        return `Revenue: $${context.raw}B`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: colors.grid,
                    drawBorder: false,
                },
                ticks: {
                    callback: function(value) {
                        return '$' + value + 'B';
                    },
                    padding: 10
                }
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    padding: 10
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
    }
});
