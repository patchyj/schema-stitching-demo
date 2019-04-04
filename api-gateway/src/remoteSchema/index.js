import { makeRemoteExecutableSchema, introspectSchema } from 'graphql-tools';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import fetch from 'node-fetch';
import config from '../../config/config';
import { introspectionLink, stitchingLink } from './link';


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

		// const ContextLink = setContext((request, previousContext) => {
		// 	const { authScope } = previousContext.graphqlContext;
		// 	return {
		// 		headers: {
		// 			authorization: authScope // authScope is what's returned from src/index.js CONTEXT  
		// 		}
		// 	};
		// });

		// INTROSPECTION LINK
		const apiIntroSpectionLink = await introspectionLink(api.uri);
		
		// INTROSPECT SCHEMA
		const remoteSchema = await introspectSchema(apiIntroSpectionLink);

		// STITCHING LINK
		const apiSticthingLink = stitchingLink(api.uri);
		
		// MAKE REMOTE SCHEMA
		const remoteExecutableSchema = makeRemoteExecutableSchema({
			schema: remoteSchema,
			link: apiSticthingLink
		});

		schemas.push(remoteExecutableSchema);
		/*eslint-disable*/
	}

	return schemas;
};
