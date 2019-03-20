import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server';
dotenv.config();
mongoose.Promise = require('bluebird');
mongoose.connect(
  process.env.USER_DB,
  { useNewUrlParser: true }
);
import { User } from '../models/User';

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

      await bcrypt.genSalt(10, async (err, salt) => {
        await bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save();
        });
      });

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

      const userDeleted = await User.findById(user.id);

      let message;
      message =
        userDeleted === null
          ? "That user doesn't exist"
          : 'User successfully deleted';

      return message;
    }
  }
};

export default resolvers;
