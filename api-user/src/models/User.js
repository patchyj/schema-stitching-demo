import mongoose from 'mongoose';

mongoose.Promise = require('bluebird');

const { Schema, model } = mongoose;

// Create Schema
const UserSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	bio1: {
		type: String
	},
	bio2: {
		type: String
	},
	bio3: {
		type: String
	},
	tagline: {
		type: String
	},
	avatar: {
		type: String
	},
	linkedInURL: {
		type: String
	},
	twitterURL: {
		type: String
	},
	facebookURL: {
		type: String
	},
	verified: {
		type: Boolean,
		default: false
	},
	verificationToken: {
		type: String
	},
	verificationTokenExpires: {
		type: Date
	}
});

export default model('users', UserSchema);
