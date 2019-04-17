/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User';
import config from '../../config';
import validateRegistration from '../../validation/registration';
import validateLogin from '../../validation/login';
import throwError from '../../tools/throwErrors';
import checkConnection from '../../tools/checkConnection';
import emailer from '../../tools/emailer'

mongoose.Promise = require('bluebird');

// CHECK INTERNET CONNECTION
checkConnection((isConnected) => {
	if (isConnected) {
		// connected to the internet
		console.log('Connected to mLab');
		mongoose.connect(config.USER_DB, { useNewUrlParser: true });
	} else {
		// not connected to the internet
		console.log('Connected to localhost');
		mongoose.connect(config.USER_DB_LOCAL, { useNewUrlParser: true });
	}
});

// add some small resolvers
const resolvers = {
	Query: {
		allUsers: async () => {
			const email = JSON.stringify('../lib/emails/test.html');
			console.log(email);

			const users = await User.find();
			return users.reverse();
		},
		user: async (parent, { id }) => {
			// eslint-disable-next-line no-console
			const user = await User.findById(id);
			// Tricky one: this resolver gets called by other resources (Blog, Profile, Projects)
			// If user has been deleted but resource hasn't and still has userID
			// It will break when trying to request it, so must return null, not Error
			if (!user) return null;

			const messageBody = {
				subject: 'Well hello there',
				text: 'Jar Jar Binks was an abomination',
				html: '<h1>Jar Jar Binks was an abomination</h1>'
			};

			await emailer('jackjwmcgregor@gmail.com', messageBody, null);

			return user;
		}
	},
	Mutation: {
		// ========= CREATE =========
		addUser: async (parent, user) => {
			const { errors } = validateRegistration(user);

			if (Object.keys(errors).length > 0) throwError('USER', 'Failed to get events due to validation errors', { errors });

			const existingUser = await User.findOne({ email: user.email });

			if (existingUser !== null) throwError('USER', 'This email is already being used');

			const newUser = new User(user);

			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(newUser.password, salt);

			newUser.password = hash;
			newUser.save();

			return newUser;
		},
		loginUser: async (parent, user) => {
			const { errors } = await validateLogin(user);

			const ifUser = await User.findOne({ email: user.email });

			if (!ifUser) errors.email = "An account with this email doesn't exist";

			if (Object.keys(errors).length > 0) throwError('USER', 'Failed to get events due to validation errors', { errors });

			const valid = await bcrypt.compare(user.password, ifUser.password);

			if (!valid) {
				errors.password = 'Wrong password';
				throwError('USER', 'Failed to get events due to validation errors', { errors });
			}

			// return json web token
			const token = await jwt.sign(
				{
					id: ifUser._id,
					email: ifUser.email
				},
				config.SECRET,
				{ expiresIn: 36000 }
			);

			return `${token}`;
		},
		updateUser: async (parent, user, context) => {
			// 1. CHECK IF TOKEN IS VALID
			if (!context.user) throwError('AUTH', 'You must be authenticated to perform this action');

			const ifUser = await User.findById(user.id);

			// 2. CHECK USER EXISTS
			if (ifUser === null) throwError('AUTH', 'A User with this ID doesn\'t exist');

			// 3. CHECK USER IS AUTHOR
			if (user.id !== context.user.id) throwError('AUTH', 'Only a user can edit their own details');

			// 4. CHECK EMAIL IS UNIQUE
			const ifEmailTaken = await User.findOne({ email: user.email });

			if (ifEmailTaken !== null) throwError('AUTH', 'This email is already being used');

			// 5. UPDATE VIA EMAIL
			const updatedUser = await User.findOneAndUpdate({ _id: user.id }, user, { new: true });

			return updatedUser;
		},
		deleteUser: async (parent, { id }, { user }) => {
			if (id !== user.id) throwError('AUTH', 'You must be the author to view this page');

			await User.findOneAndDelete({ _id: id });
			const ifUserDeleted = await User.findOne({ _id: id });
			const message = ifUserDeleted
				? 'Something went wrong'
				: 'User successfully deleted';

			return message;
		},
		updatePassword: async (parent, { id }) => {
			const user = await User.findById(id);
			console.log(user);

			// to do
		}
	}
};

export default resolvers;
