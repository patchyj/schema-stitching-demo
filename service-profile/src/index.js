import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
dotenv.config();
import typeDefs from './schema/profileSchema';
import resolvers from './resolver';

const PORT = process.env.PORT || 4001;

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}graphql`);
});

// PROFILE_DB=mongodb://portfolio_profile:portfolio_profile1234!!@ds163835.mlab.com:63835/portfolio_profile
