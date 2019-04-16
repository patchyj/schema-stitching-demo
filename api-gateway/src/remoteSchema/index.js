import { makeRemoteExecutableSchema, introspectSchema } from 'graphql-tools';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import fetch from 'node-fetch';
import config from '../../config';

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

		let remoteLink = new HttpLink({ uri : api.uri, fetch });
		let remoteContext = setContext((req, previous) => {
			// if the authorization token doesn't exist, or is malformed, do not pass it upstream
			// The 'authorization' is set in the ApolloServer creation in index.js
			if (
				!previous.graphqlContext.authorization
				||
				!previous.graphqlContext.authorization.match(/^Bearer /)
			) {
				return;
			}
	
			return {
				headers: {
					'authorization': previous.graphqlContext.authorization,
				}
			}
		});

		let remoteError = onError(({ networkError, graphQLErrors }) => {
			if (graphQLErrors) {
				graphQLErrors.forEach((val) => {
					// This is the magic line that bubbles up the error
					// It takes every incoming error and assigns the Error prototype to it so the gateway can throw the error as if it were its own
					Object.setPrototypeOf(val, Error.prototype);
				});
			}
		});

		let remoteSchema  = await introspectSchema(remoteLink);

		let remoteExecutableSchema = makeRemoteExecutableSchema({
			schema : remoteSchema,
			link : ApolloLink.from([
				remoteContext,
				remoteError,
				remoteLink
			])
		});

		schemas.push(remoteExecutableSchema);
	}

	return schemas;
};
