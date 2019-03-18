const env = require('../config/keys');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.project_pg_db, {
  dialect: 'postgres'
});

// Create Schema
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

module.exports = {sequelize, Project};
