import dotenv from 'dotenv';

dotenv.config();

export default {
	USER_DB: process.env.USER_DB,
	BLOG_DB: process.env.BLOG_DB,
	SECRET: process.env.SECRET,
	PORT: process.env.PORT,
};
