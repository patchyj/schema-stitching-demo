import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
dotenv.config();
import makeSchema from './schema';

const PORT = process.env.PORT || 3000;

const startGateway = async () => {
  const schema = await makeSchema();

  const server = new ApolloServer({ schema });  
  
  const app = express();
  server.applyMiddleware({ app });
  
  app.listen({ port: PORT }, () =>
    console.log(`💀  Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
};

startGateway().catch(err => console.log(err));
