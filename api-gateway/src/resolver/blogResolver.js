export default async schema => ({
	// This will go on Blog...
	author: {
		// ...Blog.author...
		fragment: 'fragment BlogFragment on Blog { user }', // ...default argument of author...
		resolve(blog, args, context, info) {
			// ...implement the resolver...
			return info.mergeInfo.delegateToSchema({
				schema, // The schema we're delegating to (User)
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
