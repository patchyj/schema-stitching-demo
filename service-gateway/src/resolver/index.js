import makeBlogResolver from './blogResolver'; // Fragments (extra resolvers)
import makeUserResolver from './userResolver'; // Fragments (extra resolvers)

const makeResolvers = async (schemas) => {
  const userSchema = schemas[0];
  const blogSchema = schemas[1];
  
  const Blog = await makeBlogResolver(userSchema);
  const User = await makeUserResolver(blogSchema);

  return { Blog, User };
};

export default makeResolvers;
