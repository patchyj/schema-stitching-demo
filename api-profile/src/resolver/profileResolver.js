/* eslint-disable no-console */
import mongoose from 'mongoose';
import Profile from '../models/Profile';
import config from '../../config/config';
import throwError from '../../tools/throwErrors';
import checkConnection from '../../tools/checkConnection';

mongoose.Promise = require('bluebird');

// CHECK INTERNET CONNECTION
checkConnection((isConnected) => {
	if (isConnected) {
		// connected to the internet
		console.log('Connected to mLab');
		mongoose.connect(config.PROFILE_DB, { useNewUrlParser: true });
	} else {
		// not connected to the internet
		console.log('Connected to localhost');
		mongoose.connect(config.PROFILE_DB_LOCAL, { useNewUrlParser: true });
	}
});
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
			const profile = await Profile.findOne({ user });
			return profile;
		}
	},
	Mutation: {
		// ========= CREATE =========
		addProfile: async (parent, profile, context) => {
			if (!context.user) throwError('AUTH', 'You must be a member to add a post');

			if (profile.user !== context.user.id) throwError('AUTH', 'A profile can only be created by the user');

			const existingProfile = await Profile.findOne({ user: profile.user });

			if (existingProfile !== null) throwError('USER', 'A profile already exists for this user');

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
		updateProfile: async (parent, profile, context) => {
			if (!context.user) throwError('AUTH', 'You must be a member to update this profile');

			if (!profile.id) throwError('AUTH', 'No Profile ID provided');

			if (!profile.user) throwError('AUTH', 'No User ID provided');

			if (profile.user !== context.user.id) throwError('AUTH', 'Only the user can update this profile');

			const userProfile = await Profile.findOne({ user: profile.user });

			if (profile.user !== context.user.id) throwError('USER', 'A profile doesn\'t exist for this User');

			userProfile.experience = profile.experience && profile.experience.length > 0 ? profile.experience : userProfile.experience;
			userProfile.education = profile.education && profile.education.length > 0 ? profile.education : userProfile.education;
			userProfile.skills = profile.skills && profile.skills.length > 0 ? profile.skills : userProfile.skills;

			userProfile.save();

			return userProfile;
		},
		deleteProfile: async (parent, { id, user }, context) => {
			if (!context.user) throwError('AUTH', 'You must be a member to delete this profile');

			const profile = await Profile.findById(id);

			if (!profile) throwError('AUTH', 'A profile with this ID doesn\'t exist');

			if (user !== context.user.id) throwError('AUTH', 'Only the user can delete this profile');

			await profile.remove();

			const isProfileDeleted = await Profile.findById(id);

			const message = isProfileDeleted ? 'Something went wrong' : 'Profile deleted';

			return message;
		},
		deleteProfileByUserId: async (parent, { user }, context) => {
			if (!context.user) throwError('AUTH', 'You must be a member to delete this profile');

			const profile = await Profile.findOne({ user });

			if (!profile) throwError('AUTH', 'A profile with this ID doesn\'t exist');

			if (user !== context.user.id) throwError('AUTH', 'Only the user can delete this profile');

			await profile.remove();

			const isProfileDeleted = await Profile.findOne({ user });

			const message = isProfileDeleted ? 'Something went wrong' : 'Profile deleted';

			return message;
		}
	}
};

export default resolvers;
