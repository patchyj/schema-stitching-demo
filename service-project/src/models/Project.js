import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;

// Create Schema
const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  tagline: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  twitterURL: {
    type: String
  },
  websiteURL: {
    type: String
  },
  facebookURL: {
    type: String
  },
  linkedInURL: {
    type: String
  },
  images: [String],
  userID: {
    type: String
  }
});

export const Project = mongoose.model('projects', ProjectSchema);
