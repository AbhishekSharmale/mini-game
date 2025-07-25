// Steam API Integration
class SteamAPI {
    constructor() {
        this.apiKey = 'DEMO_KEY'; // Demo mode for testing
        this.proxyUrl = 'https://api.allorigins.win/get?url=';
        this.baseUrl = 'https://api.steampowered.com';
    }

    async getSteamId(vanityUrl) {
        // For demo, return test Steam ID
        return '76561199137755823';
    }

    async getPlayerSummary(steamId) {
        // Return demo data for your Steam ID
        return {
            steamid: '76561199137755823',
            personaname: 'Your Steam Profile',
            profileurl: 'https://steamcommunity.com/profiles/76561199137755823/',
            avatar: 'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg',
            personastate: 1
        };
    }

    async getOwnedGames(steamId) {
        // Return demo games data
        return [
            { appid: 730, name: 'Counter-Strike 2', playtime_forever: 12450 },
            { appid: 570, name: 'Dota 2', playtime_forever: 8920 },
            { appid: 1172470, name: 'Apex Legends', playtime_forever: 5670 },
            { appid: 271590, name: 'Grand Theft Auto V', playtime_forever: 4320 },
            { appid: 1085660, name: 'Destiny 2', playtime_forever: 3890 },
            { appid: 292030, name: 'The Witcher 3', playtime_forever: 2340 },
            { appid: 1174180, name: 'Red Dead Redemption 2', playtime_forever: 1890 },
            { appid: 1091500, name: 'Cyberpunk 2077', playtime_forever: 1560 }
        ];
    }

    async getRecentlyPlayedGames(steamId) {
        // Return recent games demo data
        return [
            { appid: 730, name: 'Counter-Strike 2', playtime_forever: 12450, playtime_2weeks: 340 },
            { appid: 1172470, name: 'Apex Legends', playtime_forever: 5670, playtime_2weeks: 180 },
            { appid: 570, name: 'Dota 2', playtime_forever: 8920, playtime_2weeks: 120 }
        ];
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