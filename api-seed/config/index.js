require('dotenv').config();

module.exports = {
  // === PORT ===
  PORT: process.env.PORT || 5001,
  // === USER ===
  USER_DB: process.env.USER_DB,
  USER_DB_LOCAL: process.env.USER_DB_LOCAL,
  USER_DEV_API: process.env.USER_DEV_API || 'http://localhost:4001/',
  // === PROJECT ===
  PROJECT_PG_DB: process.env.PROJECT_PG_DB,
  PROJECT_PG_DB_LOCAL: process.env.PROJECT_PG_DB_LOCAL,
  PROJECT_DEV_API: process.env.PROJECT_DEV_API || 'http://localhost:4003/',
  // === BLOG ===
  BLOG_DB: process.env.BLOG_DB,
  BLOG_DB_LOCAL: process.env.BLOG_DB_LOCAL,
  BLOG_DEV_API: process.env.BLOG_DEV_API || 'http://localhost:4002/',
  // === PROFILE ===
  PROFILE_DB: process.env.PROFILE_DB,
  PROFILE_DB_LOCAL: process.env.PROFILE_DB_LOCAL,
  PROFILE_DEV_API: process.env.PROFILE_DEV_API || 'http://localhost:4003/'
};
