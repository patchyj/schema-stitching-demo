const faker = require('faker');
const axios = require('axios');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('../config');
const Blog = require('../models/Blog');
const checkConnection = require('../tools/checkConnection');

checkConnection((isConnected) => {
  if (isConnected) {
    // connected to the internet
    console.log(`Connected to mLab`);
    mongoose.connect(config.BLOG_DB, { useNewUrlParser: true });
  } else {
    // not connected to the internet
    console.log(`Connected to localhost`);
    mongoose.connect(config.BLOG_DB_LOCAL, { useNewUrlParser: true });
  }
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

  const users = await axios
    .post(config.USER_DEV_API, data)
    .catch(err => console.log(err));

  return users.data.data.allUsers;
};

// ============ CREATE PROFILE ============

Blog.collection.drop();

const blogs = [];

async function createBlogs() {
  const users = await getUsers();

  for (let i = 0; i < users.length; i++) {
    const numOfBlogs = Math.floor(Math.random() * 10) + 5;
    
    for (let j = 0; j < numOfBlogs; j++) {
      const num = Math.floor(Math.random() * 10) + 5;
      const images = [];
      
      for (let k = 0; k < num; k++) {
        images.push(faker.image.avatar());
      }

      const newBlog = {
        title: faker.lorem.sentence(),
        tagline: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(),
        bannerPic: faker.image.avatar(),
        images: images,
        user: users[i].id
      };

      blogs.push(newBlog);
    }
  }

  await Blog.create(blogs)
    .then(blogs => console.log(`${blogs.length} blogs created!`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
}

createBlogs();
