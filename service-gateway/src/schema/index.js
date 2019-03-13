import { mergeSchemas } from 'graphql-tools';

import makeResolvers from '../resolver';

import makeBlogSchema from '../remoteSchema/remoteBlogSchema';
import makeUserSchema from '../remoteSchema/remoteUserSchema';
import makeProfileSchema from '../remoteSchema/remoteProfileSchema';
import relationsSchema from './relationsSchema';

// use schema stitching technique to merge schems together
export default async () => {
  const blogSchema = await makeBlogSchema();
  const userSchema = await makeUserSchema();
  const profileSchema = await makeProfileSchema();

  const resolvers = makeResolvers({ blogSchema, userSchema, profileSchema });

  return mergeSchemas({
    schemas: [blogSchema, userSchema, profileSchema, relationsSchema],
    resolvers
  });
};
