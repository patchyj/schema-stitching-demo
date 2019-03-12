import { mergeSchemas } from 'graphql-tools';

import makeResolvers from '../resolver';

import makeBlogSchema from '../remoteSchema/remoteBlogSchema';
import makeUserSchema from '../remoteSchema/remoteUserSchema';
import relationsSchema from './relationsSchema';

// use schema stitching technique to merge schems together
export default async () => {
  const blogSchema = await makeBlogSchema();
  const userSchema = await makeUserSchema();

  const resolvers = makeResolvers({ blogSchema, userSchema });

  return mergeSchemas({
    schemas: [blogSchema, userSchema, relationsSchema],
    resolvers
  });
};
