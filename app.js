// Common Chart.js Settings
Chart.defaults.color = '#8A97A8';
Chart.defaults.font.family = "'Inter', sans-serif";

// Theming variables matching CSS
const colors = {
    cyan: '#2bd4e4',
    amber: '#f5a524',
    magenta: '#e879c9',
    teal: '#34d399',
    grid: 'rgba(255, 255, 255, 0.05)',
    tooltipBg: 'rgba(13, 22, 38, 0.9)'
};

// 1. Revenue Breakdown (Doughnut Chart - 2030E)
const ctxRevenue = document.getElementById('revenueChart').getContext('2d');
new Chart(ctxRevenue, {
    type: 'doughnut',
    data: {
        labels: [
            'LEO/MEO Satcom (TeraWave)', 
            'Gov & Lunar (Blue Moon)', 
            'Commercial Launch & Engines', 
            'Suborbital'
        ],
        datasets: [{
            data: [5.0, 4.2, 12.8, 0.5], // Values in Billions
            backgroundColor: [
                colors.cyan,
                colors.amber,
                colors.magenta,
                colors.teal
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
                    font: { size: 12 }
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
                        return ` $${context.raw.toFixed(1)} Billion`;
                    }
                }
            }
        }
    }
});

// 2. Growth vs Cadence (Dual-Axis Line Chart)
const ctxGrowth = document.getElementById('growthChart').getContext('2d');

const gradientFill = ctxGrowth.createLinearGradient(0, 0, 0, 300);
gradientFill.addColorStop(0, 'rgba(245, 165, 36, 0.4)'); // amber with opacity
gradientFill.addColorStop(1, 'rgba(245, 165, 36, 0.0)');

new Chart(ctxGrowth, {
    type: 'line',
    data: {
        labels: ['2025', '2026', '2027', '2028', '2029', '2030E'],
        datasets: [
            {
                label: 'Projected Revenue ($B)',
                data: [1.0, 2.0, 4.0, 8.5, 14.5, 22.5],
                borderColor: colors.amber,
                backgroundColor: gradientFill,
                borderWidth: 3,
                pointBackgroundColor: '#FFF',
                pointBorderColor: colors.amber,
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 8,
                fill: true,
                tension: 0.4,
                yAxisID: 'y'
            },
            {
                label: 'New Glenn Flights / Year',
                data: [2, 3, 10, 25, 45, 60],
                borderColor: colors.cyan,
                backgroundColor: 'transparent',
                borderWidth: 3,
                pointBackgroundColor: '#FFF',
                pointBorderColor: colors.cyan,
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 8,
                fill: false,
                tension: 0.4,
                yAxisID: 'y1'
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    color: '#FFF',
                    usePointStyle: true,
                    boxWidth: 8
                }
            },
            tooltip: {
                backgroundColor: colors.tooltipBg,
                titleFont: { size: 14, family: 'Outfit' },
                bodyFont: { size: 13 },
                padding: 12,
                borderColor: 'rgba(0, 163, 255, 0.2)',
                borderWidth: 1,
                displayColors: true
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: { padding: 10 }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                grid: {
                    color: colors.grid,
                    drawBorder: false,
                },
                ticks: {
                    color: colors.amber,
                    callback: function(value) { return '$' + value + 'B'; },
                    padding: 10
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: { drawOnChartArea: false }, // Only draw grid lines for first axis
                ticks: {
                    color: colors.cyan,
                    callback: function(value) { return value + ' flts'; },
                    padding: 10
                }
            }
        }
    }
});
