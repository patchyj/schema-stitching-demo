import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
dotenv.config()
import typeDefs from './schema/post';
import resolvers from './resolver';

const PORT = process.env.PORT || 4001;

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}graphql`);
});
