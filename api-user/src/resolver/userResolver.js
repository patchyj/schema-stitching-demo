/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User';
import config from '../../config';
import validateRegistration from '../../validation/registration';
import validateLogin from '../../validation/login';
import validatePasswords from '../../validation/passwordValidation';
import throwError from '../../tools/throwErrors';
import checkConnection from '../../tools/checkConnection';
import emailer from '../../tools/emailer';
import emailContent from '../lib/emails';
import {
	CONFIRM_ACCOUNT_1, CONFIRM_ACCOUNT_2, PASSWORD_RESET_1, PASSWORD_RESET_2, DELETE_ACCOUNT_1, DELETE_ACCOUNT_2
} from '../lib/emails/emailTypes';

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

			return user;
		}
	},
	Mutation: {
		// ========= CREATE =========
		registerUser: async (parent, user) => {
			// PASS USER PARAMS THROUGH VALIDATOR
			const { errors } = validateRegistration(user);

			// THROW ERRORS IF ANY INITIAL VALIDATION FAILS
			if (Object.keys(errors).length > 0) throwError('USER', 'Failed to get events due to validation errors', { errors });

			// LOOK FOR A USER BY THE EMAIL GIVEN
			const existingUser = await User.findOne({ email: user.email });

			// THROW ERROR IF EMAIL IS TAKEN
			if (existingUser !== null) throwError('USER', 'This email is already being used');

			// CREATE NEW USER MODEL
			const newUser = new User(user);

			// HASH THE PASSWORD
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(newUser.password, salt);
			newUser.password = hash;

			// CREATE TOKEN FOR VERIFICATION PURPOSES - TOKEN IS BOTH SENT IN VERIFICATION EMAIL AND STORED WITH USER
			const buf = await crypto.randomBytes(20);
			const token = buf.toString('hex');
			newUser.verificationToken = token;

			// SAVE THE USER
			newUser.save();

			// WHILE BUILDING THE API WE'LL KEEP THIS HERE SO WE CAN USE IT TO VERIFY USER
			console.log(token);

			// CREATE EMAIL OBJECT TO SEND
			const messageBody = emailContent(CONFIRM_ACCOUNT_1, { name: `${newUser.firstName} ${newUser.lastName}`, token });

			// SEND EMAIL
			await emailer('jackjwmcgregor@gmail.com', messageBody); // REPLACE WITH NEWUSER.EMAIL

			return newUser;
		},
		verifyUser: async (parent, { id, token }) => {
			// FIND USER WITH THE TOKEN
			const user = await User.findOne({ verificationToken: token });

			// THROW ERROR IF NO USER FOUND
			if (user === null) throwError('USER', 'No user found');

			// THROW ERROR IF USER TOKEN DOESNT MATCH EMAIL LINK TOKEN
			if (user.verificationToken !== token) throwError('USER', 'Token invalid');

			// UPDATE USER
			user.verificationToken = '';
			user.verified = true;
			user.save();

			// CREATE EMAIL OBJECT TO SEND
			const messageBody = emailContent(CONFIRM_ACCOUNT_2, { name: `${user.firstName} ${user.lastName}` });

			// SEND EMAIL
			await emailer('jackjwmcgregor@gmail.com', messageBody); // REPLACE WITH NEWUSER.EMAIL

			return user;
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
		deleteUserRequest: async (parent, args, context) => {
			if (!context.user) throwError('USER', 'Not allowed');

			const user = await User.findOne({ email: context.user.email });

			if (user === null) throwError('USER', 'Failed to get events due to validation errors', { errors: { email: "An account with this email doesn't exist" } });

			// CREATE TOKEN FOR VERIFICATION PURPOSES - TOKEN IS BOTH SENT IN VERIFICATION EMAIL AND STORED WITH USER
			const buf = await crypto.randomBytes(20);
			const token = buf.toString('hex');
			user.verificationToken = token;
			console.log(token);
			user.save();

			// CREATE EMAIL OBJECT TO SEND
			const messageBody = emailContent(DELETE_ACCOUNT_1, { name: `${user.firstName} ${user.lastName}`, token });

			// SEND EMAIL
			await emailer('jackjwmcgregor@gmail.com', messageBody); // USER.EMAIL

			return 'An email has been sent';
		},
		deleteUser: async (parent, { id, verificationToken }, context) => {
			if (!context.user) throwError('AUTH', 'Must be logged in');
			if (!verificationToken) throwError('AUTH', 'No verification token present');
			if (id !== context.user.id) throwError('AUTH', 'You must be the author to perform this action');

			const userByEmail = await User.findOne({ email: context.user.email });
			const userByToken = await User.findOne({ verificationToken });

			if (userByEmail === null) throwError('USER', 'Failed to get events due to validation errors', { errors: { email: `An account with email: ${context.user.email} doesn't exist` } });
			if (userByEmail.id !== userByToken.email) throwError('AUTH', 'Users dont match');

			await User.findOneAndDelete({ _id: id });
			const ifUserDeleted = await User.findOne({ _id: id });

			if (!ifUserDeleted) {
				// CREATE EMAIL OBJECT TO SEND
				const messageBody = emailContent(DELETE_ACCOUNT_2, { name: `${userByEmail.firstName} ${userByEmail.lastName}` });

				// SEND EMAIL
				await emailer('jackjwmcgregor@gmail.com', messageBody); // USER.EMAIL

				return 'User successfully deleted';
			}


			return 'Something went wrong';
		},
		updatePasswordRequest: async (parent, { email }) => {
			const user = await User.findOne({ email });

			if (!user) throwError('USER', 'Failed to get events due to validation errors', { errors: { email: "An account with this email doesn't exist" } });

			// CREATE TOKEN FOR VERIFICATION PURPOSES - TOKEN IS BOTH SENT IN VERIFICATION EMAIL AND STORED WITH USER
			const buf = await crypto.randomBytes(20);
			const token = buf.toString('hex');
			user.verificationToken = token;
			console.log(token);
			user.save();

			// CREATE EMAIL OBJECT TO SEND
			const messageBody = emailContent(PASSWORD_RESET_1, { name: `${user.firstName} ${user.lastName}`, token });

			// SEND EMAIL
			await emailer('jackjwmcgregor@gmail.com', messageBody); // USER.EMAIL

			return 'An email has been sent';
		},
		updatePassword: async (parent, { verificationToken, password, password2 }) => {
			// FIND USER WITH THE TOKEN
			const user = await User.findOne({ verificationToken });

			// THROW ERROR IF NO USER FOUND
			if (user === null) throwError('USER', 'No user found');

			// THROW ERROR IF USER TOKEN DOESNT MATCH EMAIL LINK TOKEN
			if (user.verificationToken !== verificationToken) throwError('USER', 'Token invalid');

			//  CHECK PASSWORDS MATCH
			const { errors } = validatePasswords({ password, password2 });
			if (Object.keys(errors).length > 0) throwError('USER', 'Failed to get events due to validation errors', { errors });

			// UPDATE USER
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);
			user.password = hash;

			user.verificationToken = '';

			user.save();

			// CREATE EMAIL OBJECT TO SEND
			const messageBody = emailContent(PASSWORD_RESET_2, { name: `${user.firstName} ${user.lastName}` });

			// SEND EMAIL
			await emailer('jackjwmcgregor@gmail.com', messageBody); // USER.EMAIL

			return user;
		}
	}
};

export default resolvers;
