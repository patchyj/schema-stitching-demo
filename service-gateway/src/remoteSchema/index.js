import { makeRemoteExecutableSchema, introspectSchema } from 'graphql-tools';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

// graphql API metadata
const graphqlApis = [
  { uri: process.env.USER_URL },
  { uri: process.env.BLOG_URL },
  { uri: process.env.PROFILE_URL }
];

// create executable schemas from remote GraphQL APIs
export default async () => {
  let schemas = [];
  for (const api of graphqlApis) {
    const link = new HttpLink({
      uri: api.uri,
      fetch
    });
    const remoteSchema = await introspectSchema(link);
    const remoteExecutableSchema = makeRemoteExecutableSchema({
      schema: remoteSchema,
      link
    });
    schemas.push(remoteExecutableSchema);
  }

  return schemas;
};
