// Steam API Integration
class SteamAPI {
    constructor() {
        this.apiKey = 'YOUR_STEAM_API_KEY'; // Replace with actual key
        this.proxyUrl = 'https://api.allorigins.win/raw?url=';
        this.baseUrl = 'https://api.steampowered.com';
    }

    async getSteamId(vanityUrl) {
        try {
            const url = `${this.baseUrl}/ISteamUser/ResolveVanityURL/v0001/?key=${this.apiKey}&vanityurl=${vanityUrl}`;
            const response = await fetch(`${this.proxyUrl}${encodeURIComponent(url)}`);
            const data = await response.json();
            return data.response.steamid;
        } catch (error) {
            console.error('Error getting Steam ID:', error);
            return null;
        }
    }

    async getPlayerSummary(steamId) {
        try {
            const url = `${this.baseUrl}/ISteamUser/GetPlayerSummaries/v0002/?key=${this.apiKey}&steamids=${steamId}`;
            const response = await fetch(`${this.proxyUrl}${encodeURIComponent(url)}`);
            const data = await response.json();
            return data.response.players[0];
        } catch (error) {
            console.error('Error getting player summary:', error);
            return null;
        }
    }

    async getOwnedGames(steamId) {
        try {
            const url = `${this.baseUrl}/IPlayerService/GetOwnedGames/v0001/?key=${this.apiKey}&steamid=${steamId}&format=json&include_appinfo=true&include_played_free_games=true`;
            const response = await fetch(`${this.proxyUrl}${encodeURIComponent(url)}`);
            const data = await response.json();
            return data.response.games || [];
        } catch (error) {
            console.error('Error getting owned games:', error);
            return [];
        }
    }

    async getRecentlyPlayedGames(steamId) {
        try {
            const url = `${this.baseUrl}/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${this.apiKey}&steamid=${steamId}&count=10`;
            const response = await fetch(`${this.proxyUrl}${encodeURIComponent(url)}`);
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