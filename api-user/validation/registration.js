/* eslint-disable no-param-reassign */
import validator from 'validator';
import isEmpty from './is-empty';

export default (data) => {
  const errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // === FIRST NAME ===
  if (validator.isEmpty(data.firstName)) {
    errors.firstName = 'First Name field is required';
  }

  // === LAST NAME ===
  if (validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last Name field is required';
  }

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

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password should be between 6 and 30 characters';
  }

  // === PASSWORD 2 ===
  if (validator.isEmpty(data.password2)) {
    errors.password2 = 'Password2 field is required';
  }

  if (!validator.equals(data.password,data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
