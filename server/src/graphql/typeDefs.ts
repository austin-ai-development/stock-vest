import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Stock {
    symbol: String!
    name: String!
    price: Float!
    change: Float!
    changePercent: Float!
    high: Float
    low: Float
    open: Float
    previousClose: Float
    volume: Int
    marketCap: Float
    lastUpdated: String
  }

  type ChartDataPoint {
    timestamp: String!
    price: Float!
    volume: Int
  }

  type StockChart {
    symbol: String!
    timeRange: String!
    data: [ChartDataPoint!]!
  }

  type Watchlist {
    id: ID!
    symbols: [String!]!
    createdAt: String!
    updatedAt: String!
  }

  type MarketIndex {
    name: String!
    symbol: String!
    value: Float!
    change: Float!
    changePercent: Float!
  }

  type Query {
    stock(symbol: String!): Stock
    searchStocks(query: String!): [Stock!]!
    stocks(symbols: [String!]!): [Stock!]!
    stockChart(symbol: String!, timeRange: String!): StockChart
    watchlist: Watchlist
    topGainers(limit: Int): [Stock!]!
    topLosers(limit: Int): [Stock!]!
    marketIndices: [MarketIndex!]!
  }

  type Mutation {
    addToWatchlist(symbol: String!): Watchlist!
    removeFromWatchlist(symbol: String!): Watchlist!
    clearWatchlist: Watchlist!
  }
`;
