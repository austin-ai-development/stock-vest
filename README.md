# 📈 StockVest

A real-time stock tracking dashboard built with modern web technologies, featuring live market data, interactive charts, and responsive design.

## 🚀 Live Demo

**[View Live App](https://stock-vest-demo-8828e2e32069.herokuapp.com/)**

## ✨ Features

- **Real-time Stock Search** - Search and add stocks to your watchlist
- **Interactive Charts** - View stock price history with multiple timeframes (1D, 5D, 1M, 3M, 1Y)
- **Market Overview** - Live data for S&P 500, Dow Jones, and Nasdaq indices
- **Top Movers** - Track top gaining and losing stocks
- **Responsive Design** - Optimized for desktop and mobile devices
- **Persistent Watchlist** - Your stocks are saved automatically

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **Apollo Client** for GraphQL
- **Recharts** for data visualization
- **Tailwind CSS** for styling
- **Vite** for build tooling

### Backend
- **Node.js** with Express
- **Apollo Server** for GraphQL API
- **Finnhub API** for real-time stock data
- **TypeScript** for type safety

## 📦 Local Development

### Prerequisites
- Node.js 18+
- Finnhub API key ([Get one free](https://finnhub.io/))

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/austin-ai-development/stock-vest.git
   cd stock-vest
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Configure environment**
   ```bash
   # In server directory
   cp .env.example .env
   # Edit .env and add your FINNHUB_API_KEY
   ```

4. **Start development servers**
   ```bash
   # Terminal 1 - Start server (from server directory)
   npm run dev
   
   # Terminal 2 - Start client (from client directory)
   npm run dev
   ```

5. **Open your browser**
   - Client: `http://localhost:5173`
   - Server: `http://localhost:4000/graphql`

## 🚢 Deployment

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed deployment instructions.

## 📁 Project Structure

```
stock_vest/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── store/       # Redux store
│   │   ├── graphql/     # GraphQL queries/mutations
│   │   └── utils/       # Utility functions
│   └── package.json
├── server/              # Node.js backend
│   ├── src/
│   │   ├── graphql/     # GraphQL schema & resolvers
│   │   ├── services/    # Business logic
│   │   └── index.ts     # Server entry point
│   └── package.json
├── docs/                # Documentation
├── Procfile             # Heroku deployment
└── package.json         # Root package.json
```

## 🎨 Design

Built with a modern dark theme inspired by professional trading platforms, featuring:
- VectorVest signature green (`#00A651`)
- Deep dark backgrounds for reduced eye strain
- Smooth animations and transitions
- Responsive grid layout

## 📝 License

MIT

## 👤 Author

**Austin Vincelli-Evans**
- GitHub: [@austin-ai-development](https://github.com/austin-ai-development)

---

Built with ❤️ for the VectorVest interview process
