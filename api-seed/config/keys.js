require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5001,
  user_db: process.env.USER_DB || 'mongodb://localhost/portfolio_user',
  USER_DEV_API: process.env.USER_DEV_API || 'http://localhost:4002/',
  project_db: process.env.PROJECT_DB || 'mongodb://localhost/portfolio_project',
  project_pg_db: process.env.PROJECT_PG_DB || 'postgres://localhost/portfolio_project',
  blog_db: process.env.BLOG_DB || 'mongodb://localhost/portfolio_blog',
  profile_db: process.env.PROFILE_DB || 'mongodb://localhost/portfolio_profile'
};
