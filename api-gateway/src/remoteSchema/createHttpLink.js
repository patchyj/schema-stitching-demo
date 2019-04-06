import { execute, concat } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import fetch from 'node-fetch';
import gql from 'graphql-tag';
import { GraphQLError } from 'graphql';
import { print } from 'graphql/language/printer';
import Rx from 'rxjs';
import errorTypes from '../../error-handling/errorTypes';

function createHttpLink(uri, customFetch = null, headers = null) {
	const httpLink = new HttpLink({ uri, headers, fetch: customFetch || fetch });

	const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
		if (graphQLErrors) {
			graphQLErrors.forEach((error, index) => {
				const {
					type, message, detail, state, stack
				} = error;

				// we'll create a new GraphQL error because what graphQLErrors have are not throwable Errors
				const err = new GraphQLError('message'); // change message to state and it becomes the title in the Error
				err.type = type;
				err.state = state;
				err.stack = stack;
				err.detail = detail || `Remote service returned error: ${message}
				remote service: ${uri}
																with query: ${JSON.stringify(print(operation.query))}
																with variables: ${JSON.stringify(operation.variables)}
																with state:${JSON.stringify(state)}`;

				// we mutate graphQLErrors collection because we want to throw them later

				graphQLErrors[index] = err; // eslint-disable-line no-param-reassign
				// console.log('=====CREATEHTTPLINK=====\n', graphQLErrors[index], '\n=====CREATEHTTPLINK=====');
			});
		}

		if (networkError) {
			/* eslint-disable no-param-reassign */
			networkError.type = errorTypes.ERROR;
			networkError.detail = `Network Error: ${networkError.message}
														remote service: ${uri}
														with query: ${JSON.stringify(print(operation.query))}
														with variables: ${JSON.stringify(operation.variables)}`;
		}
		/* eslint-enable no-param-reassign */
	});

	return concat(errorLink, httpLink);
}

function callGraphQl$(uri, query, variables, headers = null, customFetch = null) {
	const link = createHttpLink(uri, customFetch, headers);

	const gqlQuery = gql`${query}`;

	const operation = { query: gqlQuery, variables };

	return Rx.Observable.defer(() => execute(link, operation))
        .map((result) => { // eslint-disable-line
			if (!result.errors) return result.data;

			result.errors.map((err) => {
				throw err; // this is bubbling up errors!
			});
		});
}

export { createHttpLink, callGraphQl$ };
