# Deploy to Render (Free)

## Step 1: Get Steam API Key
1. Go to https://steamcommunity.com/dev/apikey
2. Sign in with Steam
3. Domain: `your-app-name.onrender.com`
4. Copy the API key

## Step 2: Deploy Backend to Render
1. Go to https://render.com
2. Sign up with GitHub account
3. Click "New +" → "Web Service"
4. Connect your GitHub repository: `AbhishekSharmale/mini-game`
5. Configure:
   - **Name**: `gametime-central-api`
   - **Branch**: `master`
   - **Root Directory**: (leave empty)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add Environment Variable:
   - **Key**: `STEAM_API_KEY`
   - **Value**: `your_steam_api_key_here`
7. Click "Create Web Service"

## Step 3: Update Frontend
After backend deploys, you'll get a URL like:
`https://gametime-central-api.onrender.com`

The frontend is already configured to use this URL automatically.

## Step 4: Test
1. Backend will be live at: `https://gametime-central-api.onrender.com`
2. Frontend stays at: `https://mini-game-project.pages.dev`
3. Test Steam connection with your Steam ID: `76561199137755823`

## Notes
- First request may take 30 seconds (free tier cold start)
- Backend sleeps after 15 minutes of inactivity
- 750 hours/month free usage limit