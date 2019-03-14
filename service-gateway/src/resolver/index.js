import makeBlogResolver from './blogResolver'; // Fragments (extra resolvers)
import makeUserResolver from './userResolver'; // Fragments (extra resolvers)
import makeProfileResolver from './profileResolver'; // Fragments (extra resolvers)

const makeResolvers = async (schemas) => {
  const userSchema = schemas[0];
  const blogSchema = schemas[1];
  const profileSchema = schemas[2];
  
  const Blog = await makeBlogResolver(userSchema);
  const User = await makeUserResolver(blogSchema, profileSchema);
  const Profile = await makeProfileResolver(userSchema);

  return { Blog, User, Profile };
};

export default makeResolvers;
