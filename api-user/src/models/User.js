import mongoose from 'mongoose';

mongoose.Promise = require('bluebird');

const { Schema, model } = mongoose;

// Create Schema
const UserSchema = new Schema({
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String
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
	}
});

export default model('users', UserSchema);
