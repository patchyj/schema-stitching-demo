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
    type: String
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
  user: {
    type: String
  }
});

export const Project = mongoose.model('projects', ProjectSchema);
