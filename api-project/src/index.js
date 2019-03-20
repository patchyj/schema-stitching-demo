import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
dotenv.config();
import typeDefs from './schema/projectSchema';
import resolvers from './resolver/projectResolver';

const PORT = process.env.PORT || 4001;

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`💀  Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);