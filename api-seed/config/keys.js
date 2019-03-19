require('dotenv').config();

module.exports = {
  // === PORT ===
  port: process.env.PORT || 5001,
  // === USER ===
  user_db: process.env.USER_DB || 'mongodb://localhost/portfolio_user',
  USER_DEV_API: process.env.USER_DEV_API || 'http://localhost:4001/',
  // === PROJECT ===
  project_db: process.env.PROJECT_DB || 'mongodb://localhost/portfolio_project',
  project_pg_db:
    process.env.PROJECT_PG_DB || 'postgres://localhost/portfolio_project',
  PROJECT_DEV_API: process.env.PROJECT_DEV_API || 'http://localhost:4003/',
  // === BLOG ===
  blog_db: process.env.BLOG_DB || 'mongodb://localhost/portfolio_blog',
  BLOG_DEV_API: process.env.BLOG_DEV_API || 'http://localhost:4002/',
  // === PROFILE ===
  profile_db: process.env.PROFILE_DB || 'mongodb://localhost/portfolio_profile',
  PROFILE_DEV_API: process.env.PROFILE_DEV_API || 'http://localhost:4003/'
};
