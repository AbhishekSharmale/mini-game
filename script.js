// GameTime Central - Gaming Analytics Dashboard
class GameTimeCentral {
    constructor() {
        this.currentPeriod = 'daily';
        this.currentSection = 'dashboard';
        this.charts = {};
        this.mockData = this.generateMockData();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadData();
        this.renderDashboard();
        this.renderLibrary();
        this.renderAchievements();
        this.renderSocial();
    }

    generateMockData() {
        const platforms = ['steam', 'playstation', 'xbox', 'nintendo', 'epic'];
        const genres = ['FPS', 'MOBA', 'Battle Royale', 'RPG', 'Action', 'Sports', 'Racing', 'Adventure', 'Strategy'];
        const games = [
            { name: 'Valorant', platform: 'steam', hours: 156, genre: 'FPS', lastPlayed: '2024-01-16' },
            { name: 'Counter-Strike 2', platform: 'steam', hours: 234, genre: 'FPS', lastPlayed: '2024-01-16' },
            { name: 'League of Legends', platform: 'steam', hours: 189, genre: 'MOBA', lastPlayed: '2024-01-15' },
            { name: 'Apex Legends', platform: 'steam', hours: 98, genre: 'Battle Royale', lastPlayed: '2024-01-15' },
            { name: 'Genshin Impact', platform: 'epic', hours: 145, genre: 'RPG', lastPlayed: '2024-01-14' },
            { name: 'Fortnite', platform: 'epic', hours: 87, genre: 'Battle Royale', lastPlayed: '2024-01-14' },
            { name: 'Call of Duty: MW3', platform: 'steam', hours: 76, genre: 'FPS', lastPlayed: '2024-01-13' },
            { name: 'Rocket League', platform: 'epic', hours: 123, genre: 'Sports', lastPlayed: '2024-01-13' },
            { name: 'Overwatch 2', platform: 'steam', hours: 65, genre: 'FPS', lastPlayed: '2024-01-12' },
            { name: 'Dota 2', platform: 'steam', hours: 201, genre: 'MOBA', lastPlayed: '2024-01-12' },
            { name: 'FIFA 24', platform: 'playstation', hours: 54, genre: 'Sports', lastPlayed: '2024-01-11' },
            { name: 'Spider-Man 2', platform: 'playstation', hours: 43, genre: 'Action', lastPlayed: '2024-01-11' },
            { name: 'Baldur\'s Gate 3', platform: 'steam', hours: 89, genre: 'RPG', lastPlayed: '2024-01-10' },
            { name: 'Cyberpunk 2077', platform: 'steam', hours: 67, genre: 'RPG', lastPlayed: '2024-01-10' },
            { name: 'Forza Horizon 5', platform: 'xbox', hours: 45, genre: 'Racing', lastPlayed: '2024-01-09' },
            { name: 'Halo Infinite', platform: 'xbox', hours: 32, genre: 'FPS', lastPlayed: '2024-01-09' },
            { name: 'Zelda: TOTK', platform: 'nintendo', hours: 78, genre: 'Adventure', lastPlayed: '2024-01-08' },
            { name: 'Mario Kart 8', platform: 'nintendo', hours: 34, genre: 'Racing', lastPlayed: '2024-01-08' }
        ];

        const achievements = [
            { name: 'First Steps', description: 'Complete your first game', platform: 'steam', earned: true, progress: 100, rarity: 'common' },
            { name: 'Marathon Runner', description: 'Play for 100 hours total', platform: 'playstation', earned: true, progress: 100, rarity: 'rare' },
            { name: 'Completionist', description: 'Get 100% in any game', platform: 'xbox', earned: false, progress: 75, rarity: 'legendary' },
            { name: 'Social Gamer', description: 'Play with 10 friends', platform: 'nintendo', earned: true, progress: 100, rarity: 'uncommon' },
            { name: 'Speed Demon', description: 'Complete a speedrun', platform: 'epic', earned: false, progress: 45, rarity: 'rare' }
        ];

        const friends = [
            { name: 'Alex', hours: 156, avatar: 'A' },
            { name: 'Jordan', hours: 134, avatar: 'J' },
            { name: 'Sam', hours: 98, avatar: 'S' },
            { name: 'Casey', hours: 87, avatar: 'C' },
            { name: 'Morgan', hours: 76, avatar: 'M' }
        ];

        return { platforms, genres, games, achievements, friends };
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchSection(e.target.dataset.section));
        });

        // Time filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.changePeriod(e.target.dataset.period));
        });

        // Export functionality
        document.getElementById('exportBtn').addEventListener('click', () => this.exportData());

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());

        // Search and filters
        document.getElementById('gameSearch').addEventListener('input', (e) => this.filterGames(e.target.value));
        document.getElementById('platformFilter').addEventListener('change', (e) => this.filterByPlatform(e.target.value));
    }

    switchSection(section) {
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        
        document.getElementById(section).classList.add('active');
        document.querySelector(`[data-section="${section}"]`).classList.add('active');
        
        this.currentSection = section;
    }

    changePeriod(period) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-period="${period}"]`).classList.add('active');
        
        this.currentPeriod = period;
        this.updateCharts();
    }

    loadData() {
        // Simulate loading from localStorage
        const savedData = localStorage.getItem('gameTimeData');
        if (savedData) {
            this.mockData = { ...this.mockData, ...JSON.parse(savedData) };
        }
    }

    saveData() {
        localStorage.setItem('gameTimeData', JSON.stringify(this.mockData));
    }

    renderDashboard() {
        this.updateStats();
        this.createCharts();
        this.renderRecentActivity();
    }

    updateStats() {
        const platformHours = this.calculatePlatformHours();
        
        document.getElementById('steamHours').textContent = `${platformHours.steam}h`;
        document.getElementById('playstationHours').textContent = `${platformHours.playstation}h`;
        document.getElementById('xboxHours').textContent = `${platformHours.xbox}h`;
        document.getElementById('nintendoHours').textContent = `${platformHours.nintendo}h`;
    }

    calculatePlatformHours() {
        const hours = { steam: 0, playstation: 0, xbox: 0, nintendo: 0, epic: 0 };
        
        this.mockData.games.forEach(game => {
            hours[game.platform] += game.hours;
        });
        
        return hours;
    }

    createCharts() {
        this.createHoursChart();
        this.createPlatformChart();
        this.createGenreChart();
    }

    createHoursChart() {
        const ctx = document.getElementById('hoursChart').getContext('2d');
        const data = this.generateHoursData();
        
        if (this.charts.hours) this.charts.hours.destroy();
        
        this.charts.hours = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Gaming Hours',
                    data: data.values,
                    borderColor: '#58a6ff',
                    backgroundColor: 'rgba(88, 166, 255, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#f0f6fc' } }
                },
                scales: {
                    x: { ticks: { color: '#8b949e' }, grid: { color: '#30363d' } },
                    y: { ticks: { color: '#8b949e' }, grid: { color: '#30363d' } }
                }
            }
        });
    }

    createPlatformChart() {
        const ctx = document.getElementById('platformChart').getContext('2d');
        const platformHours = this.calculatePlatformHours();
        
        if (this.charts.platform) this.charts.platform.destroy();
        
        this.charts.platform = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Steam', 'PlayStation', 'Xbox', 'Nintendo', 'Epic'],
                datasets: [{
                    data: Object.values(platformHours),
                    backgroundColor: ['#58a6ff', '#79c0ff', '#7c3aed', '#f97316', '#6b7280'],
                    borderColor: '#21262d',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#f0f6fc' } }
                }
            }
        });
    }

    createGenreChart() {
        const ctx = document.getElementById('genreChart').getContext('2d');
        const genreData = this.calculateGenreHours();
        
        if (this.charts.genre) this.charts.genre.destroy();
        
        this.charts.genre = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(genreData),
                datasets: [{
                    label: 'Hours by Genre',
                    data: Object.values(genreData),
                    backgroundColor: '#58a6ff',
                    borderColor: '#58a6ff',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#f0f6fc' } }
                },
                scales: {
                    x: { ticks: { color: '#8b949e' }, grid: { color: '#30363d' } },
                    y: { ticks: { color: '#8b949e' }, grid: { color: '#30363d' } }
                }
            }
        });
    }

    generateHoursData() {
        const labels = [];
        const values = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString());
            values.push(Math.floor(Math.random() * 8) + 2);
        }
        
        return { labels, values };
    }

    calculateGenreHours() {
        const genreHours = {};
        
        this.mockData.games.forEach(game => {
            genreHours[game.genre] = (genreHours[game.genre] || 0) + game.hours;
        });
        
        return genreHours;
    }

    renderRecentActivity() {
        const activityContainer = document.getElementById('recentActivity');
        const recentGames = this.mockData.games
            .sort((a, b) => new Date(b.lastPlayed) - new Date(a.lastPlayed))
            .slice(0, 5);
        
        activityContainer.innerHTML = recentGames.map(game => `
            <div class="activity-item">
                <div class="activity-icon ${game.platform}">
                    <i class="fas fa-gamepad"></i>
                </div>
                <div class="activity-info">
                    <h4>${game.name}</h4>
                    <p>${game.hours}h played • ${new Date(game.lastPlayed).toLocaleDateString()}</p>
                </div>
            </div>
        `).join('');
    }

    renderLibrary() {
        this.displayGames(this.mockData.games);
    }

    displayGames(games) {
        const gamesGrid = document.getElementById('gamesGrid');
        
        gamesGrid.innerHTML = games.map(game => `
            <div class="game-card" data-platform="${game.platform}">
                <div class="game-header">
                    <div class="game-title">${game.name}</div>
                    <div class="platform-badge ${game.platform}">${game.platform.toUpperCase()}</div>
                </div>
                <div class="game-stats">
                    <span>Genre: ${game.genre}</span>
                    <span class="playtime">${game.hours}h</span>
                </div>
                <div class="game-stats">
                    <span>Last Played: ${new Date(game.lastPlayed).toLocaleDateString()}</span>
                </div>
            </div>
        `).join('');
    }

    filterGames(searchTerm) {
        const filtered = this.mockData.games.filter(game =>
            game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            game.genre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.displayGames(filtered);
    }

    filterByPlatform(platform) {
        const filtered = platform === 'all' 
            ? this.mockData.games 
            : this.mockData.games.filter(game => game.platform === platform);
        this.displayGames(filtered);
    }

    renderAchievements() {
        const totalAchievements = this.mockData.achievements.length;
        const earnedAchievements = this.mockData.achievements.filter(a => a.earned).length;
        const rareAchievements = this.mockData.achievements.filter(a => a.rarity === 'rare' || a.rarity === 'legendary').length;
        const completionRate = Math.round((earnedAchievements / totalAchievements) * 100);
        
        document.getElementById('totalAchievements').textContent = earnedAchievements;
        document.getElementById('completionRate').textContent = `${completionRate}%`;
        document.getElementById('rareAchievements').textContent = rareAchievements;
        
        const achievementsList = document.getElementById('achievementsList');
        achievementsList.innerHTML = this.mockData.achievements.map(achievement => `
            <div class="achievement-item ${achievement.earned ? 'earned' : ''}">
                <div class="achievement-icon">
                    <i class="fas fa-trophy"></i>
                </div>
                <div class="achievement-details">
                    <h4>${achievement.name}</h4>
                    <p>${achievement.description}</p>
                    <div class="achievement-progress">
                        <div class="achievement-progress-bar" style="width: ${achievement.progress}%"></div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderSocial() {
        this.renderFriendsLeaderboard();
        this.createSocialChart();
    }

    renderFriendsLeaderboard() {
        const leaderboard = document.getElementById('friendsLeaderboard');
        const sortedFriends = [...this.mockData.friends].sort((a, b) => b.hours - a.hours);
        
        leaderboard.innerHTML = sortedFriends.map((friend, index) => `
            <div class="friend-item">
                <div class="friend-info">
                    <div class="friend-avatar">${friend.avatar}</div>
                    <div class="friend-name">#${index + 1} ${friend.name}</div>
                </div>
                <div class="friend-hours">${friend.hours}h</div>
            </div>
        `).join('');
    }

    createSocialChart() {
        const ctx = document.getElementById('socialChart').getContext('2d');
        
        if (this.charts.social) this.charts.social.destroy();
        
        this.charts.social = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.mockData.friends.map(f => f.name),
                datasets: [{
                    label: 'Gaming Hours',
                    data: this.mockData.friends.map(f => f.hours),
                    backgroundColor: '#58a6ff',
                    borderColor: '#58a6ff',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: '#f0f6fc' } }
                },
                scales: {
                    x: { ticks: { color: '#8b949e' }, grid: { color: '#30363d' } },
                    y: { ticks: { color: '#8b949e' }, grid: { color: '#30363d' } }
                }
            }
        });
    }

    updateCharts() {
        this.createHoursChart();
        // Update other charts based on period if needed
    }

    exportData() {
        const exportData = {
            period: this.currentPeriod,
            platformHours: this.calculatePlatformHours(),
            genreHours: this.calculateGenreHours(),
            totalGames: this.mockData.games.length,
            totalHours: this.mockData.games.reduce((sum, game) => sum + game.hours, 0),
            achievements: this.mockData.achievements.filter(a => a.earned).length,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `gaming-report-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    toggleTheme() {
        // Theme toggle functionality (already in dark mode)
        const themeIcon = document.querySelector('#themeToggle i');
        themeIcon.classList.toggle('fa-moon');
        themeIcon.classList.toggle('fa-sun');
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new GameTimeCentral();
});

// Real-time updates simulation
setInterval(() => {
    // Simulate real-time data updates
    const app = window.gameTimeApp;
    if (app && app.currentSection === 'dashboard') {
        // Update random stats occasionally
        if (Math.random() < 0.1) {
            app.renderRecentActivity();
        }
    }
}, 30000); // Update every 30 seconds