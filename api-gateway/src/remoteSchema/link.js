// import { getClientToken$, authorizationStore } from 'compass-authentication';
import fetch from 'node-fetch';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from './createHttpLink';
// import config from '../config/index';

const customFetch = (uri, options) => {
	// const headers = `Bearer ${1 + 1}`;
	// /* eslint-disable-next-line no-param-reassign */
	// options.headers = { ...(options.headers), ...headers };
	return fetch(uri, options);
};

export const introspectionLink = async (endpoint) => {
	// const token = 'ey123456.abc.def';
	const headers = { Authorization: `` };
	return createHttpLink(endpoint, fetch, headers);
};

export const stitchingLink = endpoint => createHttpLink(endpoint, customFetch);
