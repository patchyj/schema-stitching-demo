// import { HttpLink } from 'apollo-link-http';
// import fetch from 'node-fetch';
// import { introspectSchema, makeRemoteExecutableSchema } from 'graphql-tools';
// import dotenv from 'dotenv';
// dotenv.config();

// const profileUrl = process.env.PROFILE_URL;

// // use the remote blog schema
// export default async () => {
//   const link = new HttpLink({ uri: profileUrl, fetch });

//   const schema = await introspectSchema(link);

//   return makeRemoteExecutableSchema({
//     schema,
//     link
//   });
// };
