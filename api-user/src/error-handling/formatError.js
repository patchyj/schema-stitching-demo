import errorTypes from './errorTypes';
import unwrapErrors from './unwrapErrors';

export default shouldIncludeStack => (error) => {
	const unwrappedError = unwrapErrors(error);
	// console.log('======= /formatError.js ======= \n', unwrappedError, '\n======= /formatError.js =======');

	const formattedError = {
		message: unwrappedError.message || error.message,
		type: unwrappedError.type || error.type || errorTypes.ERROR,
		state: unwrappedError.state || error.state,
		detail: unwrappedError.detail || error.detail,
		path: unwrappedError.path || error.path,
	};

	if (shouldIncludeStack) {
		formattedError.stack = unwrappedError.stack || error.extensions.exception.stacktrace;
	}

	return formattedError;
};
