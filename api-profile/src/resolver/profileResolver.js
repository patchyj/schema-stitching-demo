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
      const userProfile = await Profile.findOne({ user: profile.user });

      userProfile.experience = (profile.experience && profile.experience.length > 0) ? profile.experience : userProfile.experience;
      userProfile.education = (profile.education && profile.education.length > 0) ? profile.education : userProfile.education;
      userProfile.skills = (profile.skills && profile.skills.length > 0) ? profile.skills : userProfile.skills;

      userProfile.save()

      return userProfile;
    },
    deleteProfile: async (parent, { id }) => {
      await Profile.deleteOne({ _id: id });

      const isProfileDeleted = Profile.findById(id) ? 'Unable to delete' : 'Profile deleted';

      return isProfileDeleted;
    },
    deleteProfileByUserId: async (parent, { user }) => {
      await Profile.deleteOne({ user: user });

      const isProfileDeleted = await Profile.findOne({ user: user }) ? 'Unable to delete' : 'Profile deleted';
      
      return isProfileDeleted;
    }
  }
};

export default resolvers;
