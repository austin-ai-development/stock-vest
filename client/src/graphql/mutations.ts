import { gql } from '@apollo/client';

export const ADD_TO_WATCHLIST = gql`
  mutation AddToWatchlist($symbol: String!) {
    addToWatchlist(symbol: $symbol) {
      id
      symbols
      updatedAt
    }
  }
`;

export const REMOVE_FROM_WATCHLIST = gql`
  mutation RemoveFromWatchlist($symbol: String!) {
    removeFromWatchlist(symbol: $symbol) {
      id
      symbols
      updatedAt
    }
  }
`;
