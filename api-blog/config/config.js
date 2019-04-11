import dotenv from 'dotenv';

dotenv.config();

export default {
	BLOG_DB: process.env.BLOG_DB,
	SECRET: process.env.SECRET,
	PORT: process.env.PORT,
};
