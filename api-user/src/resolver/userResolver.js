/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import { validationError, GraphQlValidationError } from '../error-handling/errors';
import User from '../models/User';
import config from '../../config/config';
import validateRegistration from '../../validation/registration';
import validateLogin from '../../validation/login';

mongoose.Promise = require('bluebird');

mongoose.connect(
	config.USER_DB,
	{ useNewUrlParser: true }
);

// add some small resolvers
const resolvers = {
	Query: {
		allUsers: async () => {
			const users = await User.find();

			return users.reverse();
		},
		user: async (parent, { id }) => {
			// eslint-disable-next-line no-console
			const user = await User.findById(id);

			return user;
		}
	},
	Mutation: {
		// ========= CREATE =========
		addUser: async (parent, user) => {
			const { errors } = validateRegistration(user);

			if (Object.keys(errors).length > 0) {
				throw new UserInputError(
					'Failed to get events due to validation errors',
					{ errors }
				);
			}

			const existingUser = await User.findOne({ email: user.email });

			if (existingUser !== null) {
				throw new UserInputError('This email is already being used');
			}

			const newUser = new User(user);

			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(newUser.password, salt).catch((err) => {
				throw new UserInputError(err);
			});

			newUser.password = hash;
			newUser.save();

			return newUser;
		},
		loginUser: async (parent, user) => {
			const { errors } = await validateLogin(user);
			const errorArray = [];

			const ifUser = await User.findOne({ email: user.email });

			if (!ifUser) errors.email = 'An account with this email doesn\'t exist';

			if (Object.keys(errors).length > 0) {
				throw new UserInputError(
					'Failed to get events due to validation errors',
					{ errors }
				);
			}

			const valid = await bcrypt.compare(user.password, ifUser.password);

			if (!valid) {
				errorArray.push(validationError('password', 'password incorrect'));
				throw new GraphQlValidationError(errorArray);
			}

			// return json web token
			// do { user } to return whole user encoded within token
			const token = await jwt.sign(
				{
					id: ifUser._id,
					email: ifUser.email,
					role: ifUser.role || 'user'
				},
				config.SECRET,
				{ expiresIn: 3600 }
			);

			return `${token}`;
		},
		updateUser: async (parent, user, context) => {
			if (user.id !== context.user.id) {
				throw new AuthenticationError('You must be the author to view this page');
			}

			const updatedUser = await User.findOneAndUpdate({ _id: user.id }, user, {
				new: true
			});

			return updatedUser;
		},
		deleteUser: async (parent, { id }, { user }) => {
			if (id !== user.id) {
				throw new AuthenticationError('You must be the author to view this page');
			}
			await User.findOneAndDelete({ _id: id });
			const ifUser = await User.findOne({ _id: id }) ? 'Something went wrong' : 'User successfully deleted';

			return ifUser;
		},
		updatePassword: async (parent, { id }) => {
			const ifUser = await User.findById(id);

			console.log(ifUser);
		}
	}
};

export default resolvers;
