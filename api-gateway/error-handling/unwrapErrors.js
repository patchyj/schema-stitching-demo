export default function unwrapErrors(err) {
	// console.log('==== unwrapError ====\n', err.extensions.exception.stacktrace, '\n==== unwrapError ====');
	if (err.originalError) {
		return unwrapErrors(err.originalError);
	}

	if (err.extensions) {
		return unwrapErrors(err.extensions);
	}

	if (err.exception) {
		return unwrapErrors(err.exception);
	}

	if (err.errors) {
		return unwrapErrors(err.errors);
	}


	return err;
}
