const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;

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

export const Blog = mongoose.model('blogs', BlogSchema);
