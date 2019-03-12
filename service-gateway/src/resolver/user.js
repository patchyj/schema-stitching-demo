export default schema => ({
  posts: {
    fragment: `fragment UserFragment on User { id }`, // default param
    resolve(user, args, context, info) {
      const authorId = user.id;
      return info.mergeInfo.delegateToSchema({
        schema,
        operation: 'query', // service-post/src/schema/post.js type Query {}
        fieldName: 'postsByAuthorId', // service-post/src/schema/post.js Query { postByAuthorId }
        args: {
          authorId // args to be posted to postsByAuthorId
        },
        context,
        info
      });
    }
  }
});
