# Production Steam API Setup

## 1. Get Steam Web API Key

1. Go to https://steamcommunity.com/dev/apikey
2. Sign in with your Steam account
3. Enter domain: `localhost` (for testing) or your domain
4. Copy your API key

## 2. Setup Backend Server

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
STEAM_API_KEY=your_actual_steam_api_key_here
```

3. Start the server:
```bash
npm start
```

## 3. Access Application

Open http://localhost:3000 in your browser

## 4. Real Steam Integration

Now uses a proper Node.js backend server that:
- Makes Steam API calls server-side
- Handles CORS properly
- Serves the frontend application
- No proxy services needed

## 5. How to Use

1. Click "Connect Accounts" in the header
2. Click "Connect" next to Steam
3. Enter your Steam ID or profile URL:
   - Steam ID: `76561198000000000`
   - Profile URL: `https://steamcommunity.com/profiles/76561198000000000`
   - Vanity URL: `https://steamcommunity.com/id/yourusername`
4. Click "Confirm" to fetch real data

## 6. Steam Profile Requirements

Your Steam profile must be **PUBLIC** for the API to work:
1. Go to Steam → Profile → Edit Profile
2. Set "My Profile" to Public
3. Set "Game Details" to Public

## 7. Limitations

- Only Steam has a public API
- PlayStation, Xbox, Nintendo require partnerships
- Rate limits: 100,000 calls per day per API key
- CORS proxy may have limitations

## 8. Production Deployment

1. Deploy to Heroku/Vercel/Railway
2. Set STEAM_API_KEY environment variable
3. Update any hardcoded localhost URLs
4. Configure CORS for your domain