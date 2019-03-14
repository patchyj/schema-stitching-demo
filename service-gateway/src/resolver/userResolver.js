export default async (blogSchema, profileSchema) => ({
  blogs: {
    fragment: `fragment UserFragment on User { id }`, // default param
    resolve(user, args, context, info) {
      console.log(blogSchema);
      const authorId = user.id;
      return info.mergeInfo.delegateToSchema({
        blogSchema,
        operation: 'query', // service-post/src/schema/post.js type Query {}
        fieldName: 'blogsByAuthorId', // service-post/src/schema/post.js Query { postByAuthorId }
        args: {
          authorId // args to be posted to postsByAuthorId
        },
        context,
        info
      });
    }
  },
  profile: {
    fragment: `fragment UserFragment on User { id }`, // default param
    resolve(user, args, context, info) {
      return info.mergeInfo.delegateToSchema({
        profileSchema,
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
});
