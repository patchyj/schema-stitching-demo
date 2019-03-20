// import { HttpLink } from 'apollo-link-http';
// import fetch from 'node-fetch';
// import { introspectSchema, makeRemoteExecutableSchema } from 'graphql-tools';
// import dotenv from 'dotenv';
// dotenv.config();

// const blogUrl = process.env.BLOG_URL; /* || 'http://localhost:3010/graphql' */

// // use the remote blog schema
// export default async () => {
//   const link = new HttpLink({ uri: blogUrl, fetch });

//   const schema = await introspectSchema(link);

//   return makeRemoteExecutableSchema({
//     schema,
//     link
//   });
// };
