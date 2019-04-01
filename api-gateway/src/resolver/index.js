import makeBlogResolver from './blogResolver'; // Fragments (extra resolvers)
import makeUserResolver from './userResolver'; // Fragments (extra resolvers)
import makeProfileResolver from './profileResolver'; // Fragments (extra resolvers)
import makeProjectResolver from './projectResolver'; // Fragments (extra resolvers)

const makeResolvers = async (schemas) => {
	const userSchema = schemas.filter(schema => schema._typeMap.User)[0];
	const blogSchema = schemas.filter(schema => schema._typeMap.Blog)[0];
	const projectSchema = schemas.filter(schema => schema._typeMap.Project)[0];
	const profileSchema = schemas.filter(schema => schema._typeMap.Profile)[0];

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
