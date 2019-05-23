const config = require('../config');
const faker = require('faker');
const axios = require('axios');
const Sequelize = require('sequelize');

// ============ GET USERS ============
const getUsers = async () => {
  const data = {
    query: `query allUsers { allUsers { id, email } }`
  };

  const users = await axios.post(config.USER_DEV_API, data);
  
  return users.data.data.allUsers;
};

// ============ CREATE PROJECTS ============
const createProjects = async (isOnline) => {
  const sequelize = new Sequelize(`${isOnline ? config.PROJECT_PG_DB : config.PROJECT_PG_DB_LOCAL}`, {
    dialect: 'postgres',
    logging: false
  });
  
  const Project = sequelize.define('project', {
    title: Sequelize.STRING,
    tagline: Sequelize.STRING,
    about: Sequelize.TEXT,
    twitterURL: Sequelize.STRING,
    websiteURL: Sequelize.STRING,
    facebookURL: Sequelize.STRING,
    linkedInURL: Sequelize.STRING,
    images: Sequelize.ARRAY(Sequelize.STRING),
    user: Sequelize.STRING
  });

  Project.drop();

  const users = await getUsers();

  for (let i = 0; i < users.length; i++) {
    const numOfProjs = Math.floor(Math.random() * 5) + 2;

    for (let j = 0; j < numOfProjs; j++) {
      const numOfImgs = Math.floor(Math.random() * 5) + 2;
      const images = [];

      for (let k = 0; k < numOfImgs; k++) {
        images.push(faker.image.avatar());
      }

      const title = faker.lorem.sentence();
      await sequelize
        .sync()
        .then(() => {
          Project.create({
            title: title,
            tagline: faker.lorem.sentence(),
            about: faker.lorem.paragraphs(),
            linkedInURL: `http://www.linkedin.com/user${i}`,
            twitterURL: `http://www.twitter.com/user${i}`,
            facebookURL: `http://www.facebook.com/user${i}`,
            websiteURL: `http://www.${title}.com`,
            images: images,
            user: users[i].id
          });
        });
    }
  }

  const projects = await Project.findAll();
  console.log(`${projects.length} projects created`)
}


async function init(){
  const isOnline = false; // TRUE ? ONLINE : OFFLINE
  console.log(`Connected to ${isOnline ? 'ElephantSQL' : 'localhost'}`);
  await createProjects(isOnline);
}

init();