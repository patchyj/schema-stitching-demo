export default schema => ({
  blogs: {
    fragment: `fragment UserFragment on User { id }`, // default param
    resolve(user, args, context, info) {
      // console.log(user);
      const authorId = user.id;
      return info.mergeInfo.delegateToSchema({
        schema,
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
      console.log(args);

      return info.mergeInfo.delegateToSchema({
        schema,
        operation: 'query', // service-post/src/schema/post.js type Query {}
        fieldName: 'userProfile', // service-post/src/schema/post.js Query { userProfile }
        args: {
          user: user.id // args to be posted to postsByAuthorId
        },
        context,
        info
      });
    }
  }
});
