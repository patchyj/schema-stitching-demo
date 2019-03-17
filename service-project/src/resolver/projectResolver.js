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
  },
  Mutation: {
    // ========= CREATE =========
    addProject: async (parent, project) => {
      // ...add validation here...
      const newProject = new Project({
        title: project.title,
        tagline: project.tagline,
        about: project.about,
        twitterURL: project.twitterURL,
        websiteURL: project.websiteURL,
        facebookURL: project.facebookURL,
        linkedInURL: project.linkedInURL,
        images: project.images,
        user: project.user
      });

      newProject.save();

      return newProject;
    }
  }
};

export default resolvers;
