import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers/index';

dotenv.config();

async function startServer() {
    const app = express();
    app.use(cors());

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({
            // Add context here later (e.g. auth, db)
        })
    });

    await server.start();
    server.applyMiddleware({ app: app as any });

    // Serve static assets in production
    if (process.env.NODE_ENV === 'production') {
        const clientDistPath = path.join(__dirname, '../../client/dist');
        app.use(express.static(clientDistPath));

        app.get('*', (req, res) => {
            // Use resolve to handle correct path resolution
            res.sendFile(path.resolve(clientDistPath, 'index.html'));
        });
    }

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer().catch(err => {
    console.error('Error starting server:', err);
});
