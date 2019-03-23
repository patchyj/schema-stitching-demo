import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema/blogSchema';
import resolvers from './resolver/blogResolver';

dotenv.config();

const PORT = process.env.PORT || 4001;

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });
/* eslint-disable no-console */
app.listen({ port: PORT }, () => console.log(`💀  Server ready at http://localhost:${PORT}${server.graphqlPath}`));
