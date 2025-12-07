// DOM Elements
const menuBtn = document.getElementById('menuBtn');
const closeSidebar = document.getElementById('closeSidebar');
const sidebar = document.getElementById('sidebar');
const timeFilterBtns = document.querySelectorAll('.time-filter button');
const statsContainer = document.querySelector('.stats-grid');
const alertsContainer = document.querySelector('.alerts-list');
const recentActivityContainer = document.querySelector('.activity-list');

// Mock data for dashboard
const mockDashboardData = {
    stats: {
        soilMoisture: 72,
        temperature: 28,
        humidity: 65,
        cropHealth: 88
    },
    alerts: [
        { id: 1, type: 'irrigation', message: 'Field 1 needs irrigation', time: '2 hours ago', priority: 'high' },
        { id: 2, type: 'pest', message: 'Pest activity detected in Field 2', time: '5 hours ago', priority: 'medium' },
        { id: 3, type: 'fertilizer', message: 'Time to apply nitrogen fertilizer', time: '1 day ago', priority: 'low' }
    ],
    recentActivity: [
        { id: 1, action: 'Irrigation', field: 'Field 1', time: '2 hours ago', status: 'completed' },
        { id: 2, action: 'Soil Test', field: 'Field 3', time: '5 hours ago', status: 'pending' },
        { id: 3, action: 'Harvest', field: 'Field 2', time: '1 day ago', status: 'scheduled' }
    ],
    weather: {
        current: {
            temp: 28,
            condition: 'Sunny',
            icon: 'fa-sun',
            humidity: 65,
            wind: 12
        },
        forecast: [
            { day: 'Mon', temp: 28, icon: 'fa-sun' },
            { day: 'Tue', temp: 27, icon: 'fa-cloud-sun' },
            { day: 'Wed', temp: 26, icon: 'fa-cloud-rain' },
            { day: 'Thu', temp: 25, icon: 'fa-cloud' },
            { day: 'Fri', temp: 27, icon: 'fa-sun' }
        ]
    }
};

// Initialize the dashboard
function initPage() {
    // Load dashboard data
    loadDashboardData();
    
    // Initialize chart
    initMoistureChart();
    
    // Setup event listeners
    setupEventListeners();
    
    // Update UI based on authentication
    updateDashboardUI();
}

// Load and display dashboard data
function loadDashboardData() {
    // Update stats cards
    updateStatsCards();
    
    // Load alerts
    loadAlerts();
    
    // Load recent activity
    loadRecentActivity();
    
    // Load weather data
    loadWeatherData();
}

// Update stats cards with data
function updateStatsCards() {
    const stats = mockDashboardData.stats;
    
    const statsHTML = `
        <div class="stat-card">
            <div class="stat-icon" style="background: rgba(46, 204, 113, 0.1);">
                <i class="fas fa-tint" style="color: #2ecc71;"></i>
            </div>
            <div class="stat-info">
                <h3>${stats.soilMoisture}%</h3>
                <p>Soil Moisture</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon" style="background: rgba(231, 76, 60, 0.1);">
                <i class="fas fa-thermometer-half" style="color: #e74c3c;"></i>
            </div>
            <div class="stat-info">
                <h3>${stats.temperature}°C</h3>
                <p>Temperature</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon" style="background: rgba(52, 152, 219, 0.1);">
                <i class="fas fa-cloud-rain" style="color: #3498db;"></i>
            </div>
            <div class="stat-info">
                <h3>${stats.humidity}%</h3>
                <p>Humidity</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon" style="background: rgba(155, 89, 182, 0.1);">
                <i class="fas fa-leaf" style="color: #9b59b6;"></i>
            </div>
            <div class="stat-info">
                <h3>${stats.cropHealth}%</h3>
                <p>Crop Health</p>
            </div>
        </div>
    `;
    
    if (statsContainer) {
        statsContainer.innerHTML = statsHTML;
    }
}

// Load and display alerts
function loadAlerts() {
    if (!alertsContainer) return;
    
    const alertsHTML = mockDashboardData.alerts.map(alert => `
        <div class="alert-item ${alert.priority}">
            <div class="alert-icon">
                <i class="fas ${getAlertIcon(alert.type)}"></i>
            </div>
            <div class="alert-content">
                <p class="alert-message">${alert.message}</p>
                <span class="alert-time">${alert.time}</span>
            </div>
            <button class="alert-action" onclick="markAlertAsRead(${alert.id})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
    
    alertsContainer.innerHTML = alertsHTML;
}

// Load recent activity
function loadRecentActivity() {
    if (!recentActivityContainer) return;
    
    const activityHTML = mockDashboardData.recentActivity.map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.status}">
                <i class="fas ${getActivityIcon(activity.action)}"></i>
            </div>
            <div class="activity-details">
                <h4>${activity.action}</h4>
                <p>${activity.field} • ${activity.time}</p>
            </div>
            <span class="activity-status ${activity.status}">${activity.status}</span>
        </div>
    `).join('');
    
    recentActivityContainer.innerHTML = activityHTML;
}

// Load weather data
function loadWeatherData() {
    const weather = mockDashboardData.weather;
    const weatherWidget = document.querySelector('.weather-widget');
    const forecastContainer = document.querySelector('.weather-forecast');
    
    if (weatherWidget) {
        weatherWidget.innerHTML = `
            <div class="current-weather">
                <div class="weather-icon">
                    <i class="fas ${weather.current.icon}"></i>
                </div>
                <div class="weather-details">
                    <h2>${weather.current.temp}°C</h2>
                    <p>${weather.current.condition}</p>
                    <div class="weather-stats">
                        <span><i class="fas fa-tint"></i> ${weather.current.humidity}%</span>
                        <span><i class="fas fa-wind"></i> ${weather.current.wind} km/h</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    if (forecastContainer) {
        const forecastHTML = weather.forecast.map(day => `
            <div class="forecast-day">
                <span>${day.day}</span>
                <i class="fas ${day.icon}"></i>
                <span>${day.temp}°</span>
            </div>
        `).join('');
        
        forecastContainer.innerHTML = forecastHTML;
    }
}

// Initialize moisture chart
function initMoistureChart() {
    const ctx = document.getElementById('moistureChart');
    if (!ctx) return;
    
    // Sample data for the chart
    const labels = Array.from({length: 24}, (_, i) => {
        const hour = i % 12 || 12;
        const period = i < 12 ? 'AM' : 'PM';
        return `${hour} ${period}`;
    });
    
    // Generate some random data for the chart
    const data = Array.from({length: 24}, () => Math.floor(Math.random() * 30) + 60);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Soil Moisture %',
                data: data,
                borderColor: 'rgba(46, 204, 113, 1)',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true,
                pointBackgroundColor: '#fff',
                pointBorderColor: 'rgba(46, 204, 113, 1)',
                pointBorderWidth: 2,
                pointRadius: 3,
                pointHoverRadius: 5
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
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        family: 'Poppins, sans-serif',
                        size: 12
                    },
                    bodyFont: {
                        family: 'Poppins, sans-serif',
                        size: 12
                    },
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `Moisture: ${context.parsed.y}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 8,
                        font: {
                            family: 'Poppins, sans-serif',
                            size: 10
                        }
                    }
                },
                y: {
                    beginAtZero: false,
                    min: 40,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            family: 'Poppins, sans-serif',
                            size: 10
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Helper functions
function getAlertIcon(type) {
    const icons = {
        'irrigation': 'fa-tint',
        'pest': 'fa-bug',
        'fertilizer': 'fa-seedling',
        'default': 'fa-bell'
    };
    return icons[type] || icons['default'];
}

function getActivityIcon(action) {
    const icons = {
        'Irrigation': 'fa-tint',
        'Soil Test': 'fa-flask',
        'Harvest': 'fa-sickle',
        'default': 'fa-tasks'
    };
    return icons[action] || icons['default'];
}

// UI Update functions
function updateDashboardUI() {
    // Update user info
    const user = getCurrentUser();
    if (user) {
        const userElement = document.querySelector('.user-info h3');
        const avatarElement = document.querySelector('.user-avatar');
        
        if (userElement) userElement.textContent = user.name;
        if (avatarElement) avatarElement.src = user.avatar;
    }
    
    // Update current date
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = new Date().toLocaleDateString('en-US', options);
    }
}

// Event Handlers
function setupEventListeners() {
    // Time filter buttons
    if (timeFilterBtns.length > 0) {
        timeFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                timeFilterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                // In a real app, we would fetch new data here
                showNotification(`Showing data for ${this.textContent.toLowerCase()}`, 'info');
            });
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
}

// Global functions
function markAlertAsRead(alertId) {
    // In a real app, we would update the server here
    const alertElement = document.querySelector(`.alert-item[data-id="${alertId}"]`);
    if (alertElement) {
        alertElement.style.opacity = '0';
        setTimeout(() => {
            alertElement.remove();
            showNotification('Alert marked as read', 'success');
        }, 300);
    }
}

// Initialize the dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);

// Make functions available globally
window.markAlertAsRead = markAlertAsRead;

// Toggle Sidebar
menuBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && e.target !== menuBtn) {
        sidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Time Filter Buttons
timeFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        timeFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Here you would typically fetch new data based on the selected time filter
        updateChartData(btn.textContent.trim().toLowerCase());
    });
});

// Initialize Chart
let moistureChart;

function initChart() {
    const ctx = document.getElementById('moistureChart').getContext('2d');
    
    // Sample data - replace with actual data from your API
    const labels = Array.from({length: 24}, (_, i) => {
        const hour = i % 12 || 12;
        const period = i < 12 ? 'AM' : 'PM';
        return `${hour} ${period}`;
    });
    
    const data = Array.from({length: 24}, () => Math.floor(Math.random() * 30) + 60);
    
    moistureChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Soil Moisture %',
                data: data,
                borderColor: 'rgba(46, 204, 113, 1)',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true,
                pointBackgroundColor: '#fff',
                pointBorderColor: 'rgba(46, 204, 113, 1)',
                pointBorderWidth: 2,
                pointRadius: 3,
                pointHoverRadius: 5
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
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        family: 'Poppins, sans-serif',
                        size: 12
                    },
                    bodyFont: {
                        family: 'Poppins, sans-serif',
                        size: 12
                    },
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `Moisture: ${context.parsed.y}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 12,
                        font: {
                            family: 'Poppins, sans-serif',
                            size: 10
                        }
                    }
                },
                y: {
                    beginAtZero: false,
                    min: 40,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            family: 'Poppins, sans-serif',
                            size: 10
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Update chart data based on time filter
function updateChartData(timeRange) {
    // In a real app, you would fetch new data from your API here
    // For demo purposes, we'll just generate some random data
    let labels, data;
    
    switch(timeRange) {
        case 'day':
            labels = Array.from({length: 24}, (_, i) => {
                const hour = i % 12 || 12;
                const period = i < 12 ? 'AM' : 'PM';
                return `${hour} ${period}`;
            });
            data = Array.from({length: 24}, () => Math.floor(Math.random() * 30) + 60);
            break;
            
        case 'week':
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            data = Array.from({length: 7}, () => Math.floor(Math.random() * 30) + 60);
            break;
            
        case 'month':
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            data = Array.from({length: 4}, () => Math.floor(Math.random() * 30) + 60);
            break;
    }
    
    moistureChart.data.labels = labels;
    moistureChart.data.datasets[0].data = data;
    moistureChart.update();
}

// Initialize the dashboard when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initChart();
    
    // Add animation to stats cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        // Trigger reflow
        void card.offsetWidth;
        
        // Add visible class to trigger animation
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
    
    // Add click event to notification bell
    const notificationBell = document.querySelector('.notification');
    const notificationBadge = document.querySelector('.notification .badge');
    
    notificationBell.addEventListener('click', (e) => {
        e.preventDefault();
        // In a real app, you would mark notifications as read and update the UI
        notificationBadge.style.display = 'none';
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    if (moistureChart) {
        moistureChart.resize();
    }
});
