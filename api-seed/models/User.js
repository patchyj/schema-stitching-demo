const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

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
  tagline: {
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
  linkedInURL: {
    type: String
  },
  facebookURL: {
    type: String
  },
  twitterURL: {
    type: String
  },
  avatar: {
    type: String
  }
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
