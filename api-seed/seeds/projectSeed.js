const faker = require('faker');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const env = require('../config/keys');
mongoose.connect(env.project_db, { useNewUrlParser: true });

const Project = require('../models/Project');

// ============ GET USERS ============

const getUsers = async () => {
  const data = {
    query: `
      query allUsers {
        allUsers {
          id
          email
          }
        }
      `
  };

  const users = await axios.post(`${process.env.USER_DEV_API}`, data);

  return users.data.data.allUsers;
};

Project.collection.drop();

const projects = [];

async function createProjects() {
  const users = await getUsers();

  for (let i = 0; i < users.length; i++) {
    const num = Math.floor(Math.random() * 5) + 2;
    const images = [];
    for (let i = 0; i < num; i++) {
      images.push(faker.image.avatar());
    }
    const title = faker.lorem.sentence();
    const newProject = {
      title: title,
      tagline: faker.lorem.sentence(),
      about: faker.lorem.paragraphs(),
      linkedInURL: `http://www.linkedin.com/user${i}`,
      twitterURL: `http://www.twitter.com/user${i}`,
      facebookURL: `http://www.facebook.com/user${i}`,
      websiteURL: `http://www.${title}.com`,
      images: images,
      user: users[i].id
    };

    projects.push(newProject);
  }

  await Project.create(projects)
    .then(projects => console.log(`${projects.length} projects created!`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
}

createProjects();
