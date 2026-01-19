import { gql } from '@apollo/client';

export const GET_STOCK = gql`
  query GetStock($symbol: String!) {
    stock(symbol: $symbol) {
      symbol
      name
      price
      change
      changePercent
      high
      low
      open
      previousClose
      lastUpdated
    }
  }
`;

export const SEARCH_STOCKS = gql`
  query SearchStocks($query: String!) {
    searchStocks(query: $query) {
      symbol
      name
      price
    }
  }
`;

export const GET_WATCHLIST = gql`
  query GetWatchlist {
    watchlist {
      id
      symbols
      updatedAt
    }
    stocks(symbols: []) { # We'll fetch stocks separately or via this if we pass symbols dynamically, but standard usage might vary
      symbol
      name
      price
      change
      changePercent
    }
  }
`;

export const GET_STOCKS_BY_SYMBOLS = gql`
  query GetStocksBySymbols($symbols: [String!]!) {
    stocks(symbols: $symbols) {
      symbol
      name
      price
      change
      changePercent
    }
  }
`;

export const GET_STOCK_CHART = gql`
  query GetStockChart($symbol: String!, $timeRange: String!) {
    stockChart(symbol: $symbol, timeRange: $timeRange) {
      symbol
      timeRange
      data {
        timestamp
        price
        volume
      }
    }
  }
`;
export const GET_MARKET_INDICES = gql`
  query GetMarketIndices {
    marketIndices {
      symbol
      name
      value
      change
      changePercent
    }
  }
`;

export const GET_TOP_MOVERS = gql`
  query GetTopMovers {
    topGainers {
      symbol
      name
      price
      change
      changePercent
    }
    topLosers {
      symbol
      name
      price
      change
      changePercent
    }
  }
`;
