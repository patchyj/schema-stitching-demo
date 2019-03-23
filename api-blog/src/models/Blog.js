const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { Schema, model } = mongoose;

// Create Schema
const BlogSchema = new Schema({
	title: {
		type: String
	},
	tagline: {
		type: String
	},
	body: {
		type: String
	},
	user: {
		type: String
	}
});

export default model('blogs', BlogSchema);
