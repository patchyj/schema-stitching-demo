import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import User from '../models/User';
import config from '../../config/config';
import validateRegistration from '../../validation/registration';
import validateLogin from '../../validation/login';

dotenv.config();
mongoose.Promise = require('bluebird');

mongoose.connect(
  config.USER_DB,
  { useNewUrlParser: true }
);

// add some small resolvers
const resolvers = {
  Query: {
    allUsers: async () => {
      const users = await User.find();

      return users.reverse();
    },
    user: async (parent, { id }, context) => {
      // eslint-disable-next-line no-console
      console.log(context);
      const user = await User.findById(id);

      return user;
    }
  },
  Mutation: {
    // ========= CREATE =========
    addUser: async (parent, user) => {
      const { errors } = validateRegistration(user);

      if (Object.keys(errors).length > 0) {
        throw new UserInputError(
          'Failed to get events due to validation errors',
          { errors }
        );
      }

      const existingUser = await User.findOne({ email: user.email });

      if (existingUser !== null) {
        throw new UserInputError('This email is already being used');
      }

      const newUser = new User(user);

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.password, salt).catch((err) => {
        throw new UserInputError(err);
      });

      newUser.password = hash;
      newUser.save();

      return newUser;
    },
    loginUser: async (parent, user) => {
      const { errors } = await validateLogin(user);
      const ifUser = await User.findOne({ email: user.email });

      if (!ifUser) errors.email = 'An account with this email doesn\'t exist';

      if (Object.keys(errors).length > 0) {
        throw new UserInputError(
          'Failed to get events due to validation errors',
          { errors }
        );
      }

      const valid = await bcrypt.compare(user.password, ifUser.password);

      if (!valid) {
        errors.password = 'Password incorrect';
        throw new UserInputError(
          'Failed to get events due to validation errors',
          { errors }
        );
      }

      // return json web token
      // do { user } to return whole user encoded within token
      const token = await jwt.sign(
        {
          id: ifUser._id,
          email: ifUser.email,
          role: ifUser.role || 'user'
        },
        config.SECRET,
        { expiresIn: 3600 }
      );

      return `${token}`;
    },
    updateUser: async (parent, user) => {
      const updatedUser = await User.findOneAndUpdate(user.id, user, {
        new: true
      });

      return updatedUser;
    },
    deleteUser: async (parent, { id }) => {
      await User.findOneAndDelete({ _id: id });
      const ifUser = await User.findOne({ _id: id }) ? 'Something went wrong' : 'User successfully deleted';

      return ifUser;
    },
    updatePassword: async (parent, { id }) => {
      const ifUser = await User.findById(id);
      /* eslint-disable no-console */
      console.log(ifUser);
    }
  }
};

export default resolvers;
