import makeBlogResolver from './blogResolver'; // Fragments (extra resolvers)
import makeUserResolver from './userResolver'; // Fragments (extra resolvers)
import makeProfileResolver from './profileResolver'; // Fragments (extra resolvers)
import makeProjectResolver from './ProjectResolver'; // Fragments (extra resolvers)

const makeResolvers = async schemas => {
  const userSchema = schemas[0];
  const blogSchema = schemas[1];
  const projectSchema = schemas[2];
  const profileSchema = schemas[3];

  const Blog = await makeBlogResolver(userSchema);
  const User = await makeUserResolver(blogSchema, projectSchema, profileSchema);
  const Project = await makeProjectResolver(userSchema);
  const Profile = await makeProfileResolver(userSchema);

  return { Blog, User, Project, Profile };
};

export default makeResolvers;
