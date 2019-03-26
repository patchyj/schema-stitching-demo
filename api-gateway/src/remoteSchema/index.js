import { makeRemoteExecutableSchema, introspectSchema } from 'graphql-tools';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import config from '../../config/config';

// graphql API metadata
const graphqlApis = [
	{ uri: config.USER_DEV_API },
	{ uri: config.BLOG_DEV_API },
	{ uri: config.PROJECT_DEV_API },
	{ uri: config.PROFILE_DEV_API }
];

// create executable schemas from remote GraphQL APIs
export default async () => {
	const schemas = [];

	/*eslint-disable*/
	for (const api of graphqlApis) {
		const link = new HttpLink({
			uri: api.uri,
			fetch
		});
		const remoteSchema = await introspectSchema(link);
		const remoteExecutableSchema = makeRemoteExecutableSchema({
			schema: remoteSchema,
			link
		});
		schemas.push(remoteExecutableSchema);
		/*eslint-disable*/
	}

	return schemas;
};
