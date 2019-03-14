import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.PROJECT_DB, { useNewUrlParser: true });
import { Project } from '../models/Project';

// add some small resolvers
const resolvers = {
  Query: {
    allProjects: async () => {
      const projects = await Project.find();
      return projects;
    },
    project: async (parent, { id }) => {
      const project = await Project.findById(id);
      return project;
    },
    projectsByAuthorId: async (parent, { authorId }) => {
      const projects = await Project.find({ user: authorId });

      return projects;
    }
  }
};

export default resolvers;
