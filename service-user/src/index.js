import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
dotenv.config()
import typeDefs from './schema/user';
import resolvers from './resolver';

const PORT = process.env.PORT || 4002;

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(PORT).then((app) => {
  console.log(`🚀 Server ready at ${app.url}graphql`);
});
