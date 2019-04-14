import { UserInputError, AuthenticationError } from 'apollo-server-express';

export default (type, message, obj = {}) => {
	switch (type) {
	case 'AUTH':
		throw new AuthenticationError(message, obj);
	case 'USER':
		throw new UserInputError(message, obj);
	default:
		throw new Error(message, obj);
	}
};