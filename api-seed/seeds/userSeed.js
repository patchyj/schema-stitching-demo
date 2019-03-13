const bcrypt = require('bcryptjs');
const faker = require('faker');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const env = require('../config/keys');
mongoose.connect(env.user_db, { useNewUrlParser: true });

const User = require('../models/User');

User.collection.drop();

const users = [];

async function createUsers() {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash('password', salt);

  for (let i = 0; i < 10; i++) {
    const newUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: `test${i}@test.com`,
      password: hash,
      tagline: faker.lorem.sentence(),
      bio1: faker.lorem.paragraphs(),
      bio2: faker.lorem.paragraphs(),
      bio3: faker.lorem.paragraphs(),
      linkedInURL: `http://www.linkedin.com/user${i}`,
      twitterURL: `http://www.twitter.com/user${i}`,
      facebookURL: `http://www.facebook.com/user${i}`,
      avatar: faker.image.avatar()
    };

    users.push(newUser);
  }

  await User.create(users)
    .then(users => console.log(`${users.length} users created!`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
}

createUsers();
