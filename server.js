const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Your Steam API key - get from https://steamcommunity.com/dev/apikey
const STEAM_API_KEY = process.env.STEAM_API_KEY || 'YOUR_STEAM_API_KEY_HERE';

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Steam API endpoints
app.get('/api/steam/resolve/:vanityurl', async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${STEAM_API_KEY}&vanityurl=${req.params.vanityurl}`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to resolve vanity URL' });
    }
});

app.get('/api/steam/player/:steamid', async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${req.params.steamid}`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get player summary' });
    }
});

app.get('/api/steam/games/:steamid', async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${req.params.steamid}&format=json&include_appinfo=true&include_played_free_games=true`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get owned games' });
    }
});

app.get('/api/steam/recent/:steamid', async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${req.params.steamid}&count=10`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get recent games' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});