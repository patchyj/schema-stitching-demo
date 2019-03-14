import { mergeSchemas } from 'graphql-tools';
import makeResolvers from '../resolver';
import createRemoteExecutableSchemas from '../remoteSchema';
import relationsSchema from './relationsSchema';

export default async () => {
  // Get all remote schemas
  const schemas = await createRemoteExecutableSchemas();
  //
  // const resolvers = await makeResolvers(schemas);
  // console.log(schemas[0]);

  return mergeSchemas({
    schemas: [...schemas, relationsSchema],
    resolver: {
      User: {
        blogs: {
          fragment: `... on User { id }`, // default param
          resolve(user, args, context, info) {
            return info.mergeInfo.delegateToSchema({
              schema: schemas[0],
              operation: 'query', // service-post/src/schema/post.js type Query {}
              fieldName: 'blogsByAuthorId', // service-post/src/schema/post.js Query { postByAuthorId }
              args: {
                authorId: user.id // args to be posted to postsByAuthorId
              },
              context,
              info
            });
          }
        },
        profile: {
          fragment: `... on User { id }`, // default param
          resolve(user, args, context, info) {
            return info.mergeInfo.delegateToSchema({
              schema: schemas[0],
              operation: 'query', // service-post/src/schema/post.js type Query {}
              fieldName: 'profileByUserID', // service-post/src/schema/post.js Query { userProfile }
              args: {
                userID: user.id // args to be posted to postsByAuthorId
              },
              context,
              info
            });
          }
        }
      },
      Blog: {
        author: {
          // ...Blog.author...
          fragment: `... on Blog { user }`, // ...default argument of author...
          resolve(blog, args, context, info) {
            // ...implement the resolver...
            // console.log(blog); // ...the PARENT will hold the fields that's you're querying. In order to make a query to User, we need  blog.user (an ID) which will be sent to the USER
            return info.mergeInfo.delegateToSchema({
              schema: schemas[1], // The schema we're delegating to (User)
              operation: 'query', // it'ss a query
              fieldName: 'user', // ... query { user } in User
              args: {
                id: blog.user // the argument we'll pass along to get our user
              },
              context,
              info
            });
          }
        }
      }
    }
  });
};
// ======= IMPORTED IN SRC?INDEX.JS ======
