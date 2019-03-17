import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.PROFILE_DB, { useNewUrlParser: true });
import { Profile } from '../models/Profile';

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
    profileByUserID: async (parent, { user }) => {
      const profile = await Profile.findOne({ user: user });
      return profile;
    }
  },
  Mutation: {
    // ========= CREATE =========
    addProfile: async (parent, profile) => {
      // ...add validation here...
      const newProfile = new Profile({
        experience: profile.Experience,
        education: profile.Education,
        skills: profile.Skill,
        user: profile.user
      });

      newProfile.save();

      return newProfile;
    },
    updateProfile: async (parent, profile) => {
      const updatedProfile = await Profile.findOneAndUpdate(
        profile.id,
        profile,
        {
          new: true
        }
      );
      console.log(updatedProfile);

      return updatedProfile;
    }
  }
};

export default resolvers;
