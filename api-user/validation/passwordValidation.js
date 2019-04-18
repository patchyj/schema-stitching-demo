/* eslint-disable no-param-reassign */
import validator from 'validator';
import isEmpty from './is-empty';

export default (data) => {
	const errors = {};

	data.password = !isEmpty(data.password) ? data.password : '';
	data.password2 = !isEmpty(data.password2) ? data.password2 : '';

	// === PASSWORD ===
	if (validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}

	if (!validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password should be between 6 and 30 characters';
	}

	// === PASSWORD 2 ===
	if (validator.isEmpty(data.password2)) {
		errors.password2 = 'Password confirmation field is required';
	}

	if (!validator.equals(data.password, data.password2)) {
		errors.password2 = 'Passwords must match';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
