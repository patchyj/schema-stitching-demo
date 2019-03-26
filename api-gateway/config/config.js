import dotenv from 'dotenv';

dotenv.config();

export default {
	USER_DB: process.env.USER_DB,
	SECRET: process.env.SECRET,
	PORT: process.env.PORT,
	USER_DEV_API: process.env.USER_DEV_API,
	BLOG_DEV_API: process.env.BLOG_DEV_API,
	PROJECT_DEV_API: process.env.PROJECT_DEV_API,
	PROFILE_DEV_API: process.env.PROFILE_DEV_API
};
