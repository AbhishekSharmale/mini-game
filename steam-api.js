// Steam API Integration
class SteamAPI {
    constructor() {
        this.baseUrl = '/api/steam'; // Use local server
    }

    async getSteamId(vanityUrl) {
        try {
            const response = await fetch(`${this.baseUrl}/resolve/${vanityUrl}`);
            const data = await response.json();
            return data.response.steamid;
        } catch (error) {
            console.error('Error getting Steam ID:', error);
            return null;
        }
    }

    async getPlayerSummary(steamId) {
        try {
            const response = await fetch(`${this.baseUrl}/player/${steamId}`);
            const data = await response.json();
            return data.response.players[0];
        } catch (error) {
            console.error('Error getting player summary:', error);
            return null;
        }
    }

    async getOwnedGames(steamId) {
        try {
            const response = await fetch(`${this.baseUrl}/games/${steamId}`);
            const data = await response.json();
            return data.response.games || [];
        } catch (error) {
            console.error('Error getting owned games:', error);
            return [];
        }
    }

    async getRecentlyPlayedGames(steamId) {
        try {
            const response = await fetch(`${this.baseUrl}/recent/${steamId}`);
            const data = await response.json();
            return data.response.games || [];
        } catch (error) {
            console.error('Error getting recently played games:', error);
            return [];
        }
    }

    formatPlaytime(minutes) {
        if (minutes < 60) return `${minutes}m`;
        const hours = Math.floor(minutes / 60);
        return `${hours}h`;
    }

    async getUserStats(steamId) {
        const [playerSummary, ownedGames, recentGames] = await Promise.all([
            this.getPlayerSummary(steamId),
            this.getOwnedGames(steamId),
            this.getRecentlyPlayedGames(steamId)
        ]);

        const totalHours = ownedGames.reduce((sum, game) => sum + (game.playtime_forever || 0), 0);
        const totalGames = ownedGames.length;

        return {
            playerSummary,
            totalHours: Math.floor(totalHours / 60),
            totalGames,
            ownedGames: ownedGames.slice(0, 20), // Top 20 games
            recentGames
        };
    }
}