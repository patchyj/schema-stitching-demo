const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
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

const Project = mongoose.model('projects', ProjectSchema);

module.exports = Project;
