import dotenv from 'dotenv';

dotenv.config();

export default {
	BLOG_DB: process.env.BLOG_DB,
	BLOG_DB_LOCAL: process.env.BLOG_DB_LOCAL,
	SECRET: process.env.SECRET,
	PORT: process.env.PORT,
};
