export default async userSchema => ({
  // This will go on Blog...
  author: {
    // ...Blog.author...
    fragment: `fragment BlogFragment on Blog { user }`, // ...default argument of author...
    resolve(blog, args, context, info) {
      // ...implement the resolver...
      // console.log(blog); // ...the PARENT will hold the fields that's you're querying. In order to make a query to User, we need  blog.user (an ID) which will be sent to the USER
      return info.mergeInfo.delegateToSchema({
        userSchema, // The schema we're delegating to (User)
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
});
