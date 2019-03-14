export default async schema => ({
  // This will go on Project...
  author: {
    // ...Project.author...
    fragment: `fragment ProjectFragment on Project { user }`, // ...default argument of author...
    resolve(project, args, context, info) {
      // ...implement the resolver...
      // ...the PARENT will hold the fields that's you're querying. In order to make a query to User, we need  project.user (an ID) which will be sent to the USER
      return info.mergeInfo.delegateToSchema({
        schema, // The schema we're delegating to (User)
        operation: 'query', // it'ss a query
        fieldName: 'user', // ... query { user } in User
        args: {
          id: project.user // the argument we'll pass along to get our user
        },
        context,
        info
      });
    }
  }
});
