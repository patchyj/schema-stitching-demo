import { UserInputError, AuthenticationError } from 'apollo-server-express';

export default (type, message) => {
	switch (type) {
	case 'AUTH':
		throw new AuthenticationError(message);
	case 'USER':
		throw new UserInputError(message);
	default:
		throw new Error(message);
	}
};
