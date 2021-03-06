const faker = require('faker');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const env = require('../config/keys');
const Blog = require('../models/Blog');
mongoose.connect(env.blog_db, { useNewUrlParser: true });

// ============ CREATE USERS ============

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

  return users.data.data.getUsers;
};

// ============ CREATE PROFILE ============

Blog.collection.drop();

const blogs = [];

async function createBlogs() {
  const users = await getUsers();

  for (let i = 0; i < users.length; i++) {
    const num = Math.floor(Math.random() * 10) + 5;
    const images = [];
    for (let i = 0; i < num; i++) {
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

  await Blog.create(blogs)
    .then(blogs => console.log(`${blogs.length} blogs created!`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
}

createBlogs();
