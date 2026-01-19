# StockVest Deployment Guide

## Prerequisites

- ✅ GitHub account: `https://github.com/austin-ai-development/`
- ✅ Heroku account (already set up)
- ✅ Finnhub API key (already configured in `server/.env`)
- ✅ Git installed locally

---

## Step 1: Prepare for Deployment

### 1.1 Verify Environment Variables
Check that your `server/.env` file has your Finnhub API key:
```bash
cat server/.env
```

You should see:
```
FINNHUB_API_KEY=your_actual_key_here
PORT=4000
```

### 1.2 Create `.gitignore` (if not exists)
```bash
# In project root
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
*/node_modules/

# Environment variables
.env
*/.env
.env.local

# Build outputs
client/dist/
server/dist/

# Logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Data files
server/data/watchlist.json
EOF
```

---

## Step 2: Initialize Git Repository

```bash
# Navigate to project root
cd /Users/austin/Desktop/stock_vest

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: StockVest application ready for deployment"
```

---

## Step 3: Create GitHub Repository

### 3.1 Create Repo on GitHub
1. Go to: `https://github.com/austin-ai-development/`
2. Click **"New"** (green button)
3. Repository name: `stock-vest`
4. Description: `Real-time stock tracking dashboard with live market data`
5. Visibility: **Public** (or Private if preferred)
6. **Do NOT** initialize with README (we already have code)
7. Click **"Create repository"**

### 3.2 Push to GitHub
```bash
# Add remote origin
git remote add origin https://github.com/austin-ai-development/stock-vest.git

# Push to main branch
git branch -M main
git push -u origin main
```

---

## Step 4: Deploy to Heroku

### 4.1 Login to Heroku
```bash
heroku login
```
This will open a browser window for authentication.

### 4.2 Create Heroku App
```bash
# Create app (Heroku will generate a unique name if you don't specify)
heroku create stock-vest-demo

# Or let Heroku auto-generate a name:
# heroku create
```

**Note the app URL** - it will be something like: `https://stock-vest-demo-xxxxx.herokuapp.com`

### 4.3 Set Environment Variables
```bash
# Set your Finnhub API key (replace with your actual key)
heroku config:set FINNHUB_API_KEY=your_actual_finnhub_key_here

# Set Node environment
heroku config:set NODE_ENV=production

# Verify variables are set
heroku config
```

### 4.4 Deploy to Heroku
```bash
# Push to Heroku
git push heroku main
```

This will:
1. Upload your code
2. Run `npm run heroku-postbuild` (builds both client and server)
3. Start the server with `npm start`

### 4.5 Open Your App
```bash
# Open in browser
heroku open
```

---

## Step 5: Verify Deployment

### 5.1 Check Logs
```bash
# View real-time logs
heroku logs --tail

# View recent logs
heroku logs --num=100
```

### 5.2 Test Functionality
1. **Search**: Try searching for "AAPL"
2. **Add to Watchlist**: Add a stock
3. **Chart**: Click a stock to view its chart
4. **Market Overview**: Click SPY/DIA/QQQ
5. **Mobile**: Test responsive layout

---

## Step 6: Post-Deployment

### 6.1 Monitor App
```bash
# Check app status
heroku ps

# Check dyno usage
heroku ps:scale
```

### 6.2 Update README
Create a `README.md` in your project root with:
- App description
- Live demo URL
- Tech stack
- Local setup instructions

---

## Troubleshooting

### Build Fails
```bash
# Check build logs
heroku logs --tail

# Common issues:
# - Missing dependencies: Check package.json files
# - Build script errors: Verify heroku-postbuild in root package.json
```

### App Crashes
```bash
# Restart dynos
heroku restart

# Check for errors
heroku logs --tail
```

### API Key Issues
```bash
# Verify environment variable
heroku config:get FINNHUB_API_KEY

# Re-set if needed
heroku config:set FINNHUB_API_KEY=your_key
```

### Port Issues
Heroku automatically assigns a port via `process.env.PORT`. Your server code already handles this correctly.

---

## Useful Heroku Commands

```bash
# View app info
heroku info

# Open Heroku dashboard
heroku open --app stock-vest-demo

# Run commands on Heroku
heroku run bash

# Scale dynos (free tier = 1)
heroku ps:scale web=1

# View config vars
heroku config

# Delete app (if needed)
heroku apps:destroy stock-vest-demo
```

---

## Future Updates

To deploy updates:
```bash
# Make changes locally
git add .
git commit -m "Description of changes"

# Push to GitHub
git push origin main

# Push to Heroku (triggers rebuild)
git push heroku main
```

---

## Success Checklist

- [ ] GitHub repo created and code pushed
- [ ] Heroku app created
- [ ] Environment variables set
- [ ] App deployed successfully
- [ ] Search functionality works
- [ ] Watchlist works
- [ ] Charts render correctly
- [ ] Mobile layout responsive
- [ ] No console errors

---

**Your app will be live at:** `https://your-app-name.herokuapp.com`

**GitHub repo:** `https://github.com/austin-ai-development/stock-vest`
