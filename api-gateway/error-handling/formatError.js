import errorTypes from './errorTypes';
import unwrapErrors from './unwrapErrors';

export default shouldIncludeStack => (error) => {
	const unwrappedError = unwrapErrors(error);

	const formattedError = {
		message: unwrappedError.message || error.message,
		type: unwrappedError.type || error.type || errorTypes.ERROR,
		state: unwrappedError.state,
		detail: unwrappedError.detail,
		path: unwrappedError.path || error.path,
		errors: unwrappedError.errors || error.extensions.exception.errors
	};

	if (shouldIncludeStack) {
		formattedError.stack = unwrappedError.stack || error.extensions.exception.stacktrace;
	}

	return formattedError;
};
