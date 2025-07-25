# Steam API Setup Instructions

## 1. Get Steam Web API Key

1. Go to https://steamcommunity.com/dev/apikey
2. Sign in with your Steam account
3. Enter a domain name (can be localhost for testing)
4. Copy your API key

## 2. Update Configuration

Replace `YOUR_STEAM_API_KEY` in `steam-api.js` with your actual API key:

```javascript
this.apiKey = 'your_actual_steam_api_key_here';
```

## 3. CORS Proxy (Current Solution)

The app uses `api.allorigins.win` as a CORS proxy. For production, you should:

1. Set up your own backend server
2. Make API calls server-side
3. Serve data to your frontend

## 4. How to Use

1. Click "Connect Accounts" in the header
2. Click "Connect" next to Steam
3. Enter your Steam ID or profile URL:
   - Steam ID: `76561198000000000`
   - Profile URL: `https://steamcommunity.com/profiles/76561198000000000`
   - Vanity URL: `https://steamcommunity.com/id/yourusername`
4. Click "Confirm" to fetch real data

## 5. Steam Profile Requirements

Your Steam profile must be **PUBLIC** for the API to work:
1. Go to Steam → Profile → Edit Profile
2. Set "My Profile" to Public
3. Set "Game Details" to Public

## 6. Limitations

- Only Steam has a public API
- PlayStation, Xbox, Nintendo require partnerships
- Rate limits: 100,000 calls per day per API key
- CORS proxy may have limitations

## 7. Production Setup

For a production app, create a backend server:

```javascript
// server.js (Node.js example)
const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/steam/:steamid', async (req, res) => {
    const { steamid } = req.params;
    const apiKey = process.env.STEAM_API_KEY;
    
    try {
        const response = await axios.get(
            `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamid}&format=json`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Steam data' });
    }
});
```