import { stockResolvers } from './stockResolvers';
import { watchlistResolvers } from './watchlistResolvers';

export const resolvers = {
    Query: {
        ...stockResolvers.Query,
        ...watchlistResolvers.Query
    },
    Mutation: {
        ...watchlistResolvers.Mutation
    }
};
