const faker = require('faker');
const axios = require('axios');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('../config');
const Profile = require('../models/Profile');
const checkConnection = require('../tools/checkConnection');

// CHECK INTERNET CONNECTION
checkConnection((isConnected) => {
  if (isConnected) {
    // connected to the internet
    console.log(`Connected to mLab`);
    mongoose.connect(config.PROFILE_DB, { useNewUrlParser: true });
  } else {
    // not connected to the internet
    console.log(`Connected to localhost`);
    mongoose.connect(config.PROFILE_DB_LOCAL, { useNewUrlParser: true });
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

  const users = await axios.post(config.USER_DEV_API, data);

  return users.data.data.allUsers;
};

// ============ CREATE PROFILE ============

Profile.collection.drop();

const profiles = [];

async function createProfiles() {
  const users = await getUsers();

  for (let i = 0; i < users.length; i++) {
    const experience = [];
    const education = [];
    const skills = [];
    // experience
    for (let i = 0; i < 3; i++) {
      const newExp = {
        title: faker.lorem.word(),
        company: faker.company.companyName(),
        location: faker.address.city(),
        from: faker.date.past(2),
        to: faker.date.past(1),
        current: Math.random() < 0.5 ? true : false,
        description: faker.lorem.paragraph()
      };
      experience.push(newExp);
    }
    // education
    for (let i = 0; i < 3; i++) {
      const newEdu = {
        school: faker.lorem.word(),
        degree: faker.lorem.word(),
        fieldofstudy: faker.lorem.word(),
        from: faker.date.past(2),
        to: faker.date.past(1),
        current: Math.random() < 0.5 ? true : false,
        description: faker.lorem.paragraph()
      };
      education.push(newEdu);
    }
    // skills
    for (let i = 0; i < 10; i++) {
      const newSkill = {
        name: faker.lorem.word(),
        level: Math.floor(Math.random() * 10)
      };
      skills.push(newSkill);
    }

    const newProfile = {
      experience: experience,
      education: education,
      skills: skills,
      user: users[i].id
    };

    profiles.push(newProfile);
  }

  await Profile.create(profiles)
    .then(profiles => console.log(`${profiles.length} profiles created!`))
    .catch(err => console.log(err));

  mongoose.connection.close()
}

// getUsers();
createProfiles();
