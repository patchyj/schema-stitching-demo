import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.PROFILE_DB, { useNewUrlParser: true });
import Profile from '../models/Profile';

// add some small resolvers
const resolvers = {
  Query: {
    allProfiles: async () => {
      const profiles = await Profile.find();
      return profiles;
    },
    profile: async (parent, { id }) => {
      const profile = await Profile.findById(id);
      return profile;
    },
    profileByUserID: async (parent, { userID }) => {
      const profile = await Profile.find({ user: userID });
      console.log(profile);
      
      return profile;
    }
  }
};

export default resolvers;
