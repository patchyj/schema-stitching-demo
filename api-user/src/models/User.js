const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

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
	linkedinInURL: {
		type: String
	},
	twitterURL: {
		type: String
	},
	facebookURL: {
		type: String
	}
});

export default mongoose.model('users', UserSchema);
