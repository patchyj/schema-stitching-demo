import errorTypes from './errorTypes';
import unwrapErrors from './unwrapErrors';

export default shouldIncludeStack => (error) => {
	console.log(error.extensions.exception.errors);
	console.log('==============================================');
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

	// console.log(formattedError);

	return formattedError;
};
