const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  experience: [
    {
      title: {
        type: String
      },
      company: {
        type: String
      },
      location: {
        type: String
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String
      },
      degree: {
        type: String
      },
      fieldofstudy: {
        type: String
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  skills: [
    {
      name: String,
      level: Number
    }
  ],
  user: {
    type: String
  }
});

export const Profile = mongoose.model('profiles', ProfileSchema);