import express from 'express';
import jwt from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import config from '../config/config';
import typeDefs from './schema/userSchema';
import resolvers from './resolver/userResolver';

dotenv.config();

const PORT = config.PORT || 4002;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization.split(' ').reverse()[0];
    const decoded = await jwt.verify(token, 'secret', 'HS256');
    console.log(decoded);
    
    return {
      authScope: req.headers.authorization,
      user: 'decoded'
    }
  }
});

const app = express();
server.applyMiddleware({ app });
/* eslint-disable no-console */
app.listen({ port: PORT }, () => console.log(`💀  Server ready at http://localhost:${PORT}${server.graphqlPath} \n`));
