import { find } from 'lodash';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config()
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.USER_DB, { useNewUrlParser: true });
import { User } from '../models/User'

// add some small resolvers
const resolvers = {
  Query: {
    allUsers: async () => {
      const users = await User.find();

      return users.reverse();
    },
    user: async (parent, { id }) => {
      console.log(id);
      
      const user = await User.findById(id);
      return user;
    },
  }
};

export default resolvers;
