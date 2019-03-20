export default async schema => ({
  // This will go on Profile...
  author: {
    // ...Profile.author...
    fragment: `fragment ProfileFragment on Profile { id, user }`, // ...default argument of author...
    resolve(profile, args, context, info) {
      // ...implement the resolver...
      // console.log(profile); // ...the PARENT will hold the fields that's you're querying. In order to make a query to User, we need  profile.user (an ID) which will be sent to the USER      
      return info.mergeInfo.delegateToSchema({
        schema, // The schema we're delegating to (User)
        operation: 'query', // it'ss a query
        fieldName: 'user', // ... query { user } in User
        args: {
          id: profile.user // the argument we'll pass along to get our user
        },
        context,
        info
      });
    }
  }
});
