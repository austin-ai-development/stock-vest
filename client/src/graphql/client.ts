import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: '/graphql', // Relative URL - works for both local dev (proxied by Vite) and production
    cache: new InMemoryCache(),
});
