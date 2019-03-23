import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import User from '../models/User';

dotenv.config();
mongoose.Promise = require('bluebird');

mongoose.connect(
  process.env.USER_DB,
  { useNewUrlParser: true }
);

// add some small resolvers
const resolvers = {
  Query: {
    allUsers: async () => {
      const users = await User.find();

      return users.reverse();
    },
    user: async (parent, { id }) => {
      const user = await User.findById(id);
      return user;
    }
  },
  Mutation: {
    // ========= CREATE =========
    addUser: async (parent, user) => {
      const existingUser = await User.findOne({ email: user.email });

      if (existingUser !== null) {
        return new UserInputError('This email is already being used');
      }

      const newUser = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
      });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.password, salt).catch((err) => {
        throw new UserInputError(err);
      });

      newUser.password = hash;
      newUser.save();

      return newUser;
    },
    updateUser: async (parent, user) => {
      const updatedUser = await User.findOneAndUpdate(user.id, user, {
        new: true
      });

      return updatedUser;
    },
    deleteUser: async (parent, user) => {
      await User.findOneAndDelete({ _id: user.id });
      const ifUser = await User.findOne({ id: user.id }) ? 'Something went wrong' : 'User successfully deleted';

      return ifUser;
    }
  }
};

export default resolvers;
