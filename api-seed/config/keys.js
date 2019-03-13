const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 5001,
  user_db: process.env.USER_DB || 'mongodb://localhost/portfolio_user',
  project_db: process.env.PROJECT_DB || 'mongodb://localhost/portfolio_project',
  blog_db: process.env.BLOG_DB || 'mongodb://localhost/portfolio_blog',
  profile_db: process.env.PROFILE_DB || 'mongodb://localhost/portfolio_profile'
};
