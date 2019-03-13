const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;

// Create Schema
const BlogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  tagline: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  bannerPic: {
    type: String
  },
  images: [String],
  user: {
    type: String
  }
});

const Blog = mongoose.model('blogs', BlogSchema);

module.exports = Blog;
