/* eslint-disable no-param-reassign */
import validator from 'validator';
import isEmpty from './is-empty';

export default (data) => {
	const errors = {};

	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	// === EMAIL ===
	if (validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	}

	if (!validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	// === PASSWORD ===
	if (validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
