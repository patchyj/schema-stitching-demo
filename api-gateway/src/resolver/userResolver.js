// pass in the user schema
export default async (blogSchema, projectSchema, profileSchema) => ({
  blogs: {
    fragment: `fragment BlogFragment on User { id }`, // default param
    resolve(user, args, context, info) {
      return info.mergeInfo.delegateToSchema({
        schema: blogSchema,
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
  projects: {
    fragment: `fragment ProjectFragment on User { id }`, // default param
    resolve(user, args, context, info) {
      return info.mergeInfo.delegateToSchema({
        schema: projectSchema,
        operation: 'query', // service-project/src/schema/project.js type Query {}
        fieldName: 'projectsByAuthorId', // service-project/src/schema/project.js Query { projectByAuthorId }
        args: {
          authorId: user.id // args to be projected to projectsByAuthorId
        },
        context,
        info
      });
    }
  },
  profile: {
    fragment: `fragment ProfileFragment on User { id }`, // default param
    resolve(user, args, context, info) {
      return info.mergeInfo.delegateToSchema({
        schema: profileSchema,
        operation: 'query', // service-profile/src/schema/profile.js type Query {}
        fieldName: 'profileByUserID', // service-profile/src/schema/profile.js Query { userProfile }
        args: {
          user: user.id // args to be profileed to profilesByAuthorId
        },
        context,
        info
      });
    }
  }
});
