import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.PROFILE_DB, { useNewUrlParser: true });
import { Profile } from '../models/Profile';
import { UserInputError } from 'apollo-server';

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
      const existingProfile = await Profile.findOne({ user: profile.user });

      if (existingProfile !== null) {
        return null;
      }
      // ...add validation here...
      const newProfile = await new Profile({
        experience: profile.experience,
        education: profile.education,
        skills: profile.skills,
        user: profile.user
      });

      await newProfile.save();

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
      updatedProfile.save();

      return updatedProfile;
    }
  }
};

export default resolvers;
