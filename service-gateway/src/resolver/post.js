export default schema => ({
  user: {
    fragment: `fragment PostFragment on Post { authorId }`,
    resolve(parent, args, context, info) {
      const id = parseInt(parent.user);
      return info.mergeInfo.delegateToSchema({
        schema,
        operation: 'query',
        fieldName: 'authorId',
        args: {
          id
        },
        context,
        info
      });
    }
  }
});
