export default schema => ({ // This will go on Post...
  author: { // ...Post.author...
    fragment: `fragment PostFragment on Post { user }`, // ...default argument of author...
    resolve(post, args, context, info) { // ...implement the resolver...
      console.log(post); // ...the PARENT will hold the fields that's you're querying. In order to make a query to User, we need  post.user (an ID) which will be sent to the USER      
      return info.mergeInfo.delegateToSchema({
        schema, // The schema we're delegating to (User)
        operation: 'query', // it'ss a query
        fieldName: 'user', // ... query { user } in User
        args: {
          id: post.user // the argument we'll pass along to get our user
        },
        context,
        info
      });
    }
  }
});
