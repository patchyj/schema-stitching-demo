require('dotenv').config();
const env = require('../config/keys');
const faker = require('faker');
const axios = require('axios');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.project_pg_db, {
  dialect: 'postgres'
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

  const users = await axios.post(env.USER_DEV_API, data);

  return users.data.data.allUsers;
};

Project.drop();

async function createProjects() {
  const users = await getUsers();  

  for (let i = 0; i < users.length; i++) {
    const num = Math.floor(Math.random() * 5) + 2;
    const images = [];
    for (let i = 0; i < num; i++) {
      images.push(faker.image.avatar());
    }
    const title = faker.lorem.sentence();
    await sequelize.sync().then(() => {
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
      })
    })
    .then(project => console.log(project))
    .catch(err => console.log(err));
  }
}

createProjects();
