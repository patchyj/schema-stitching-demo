import makeBlogResolver from './blogResolver'; // Fragments (extra resolvers)
import makeUserResolver from './userResolver'; // Fragments (extra resolvers)
import makeProfileResolver from './profileResolver'; // Fragments (extra resolvers)
import makeProjectResolver from './projectResolver'; // Fragments (extra resolvers)

const makeResolvers = async (schemas) => {
	const userSchema = schemas[0];
	const blogSchema = schemas[1];
	const projectSchema = schemas[2];
	const profileSchema = schemas[3];

	const User = await makeUserResolver(blogSchema, projectSchema, profileSchema);
	const Blog = await makeBlogResolver(userSchema);
	const Project = await makeProjectResolver(userSchema);
	const Profile = await makeProfileResolver(userSchema);

	return {
		User,
		Blog,
		Project,
		Profile
	};
};

export default makeResolvers;
