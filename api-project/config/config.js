import dotenv from 'dotenv';

dotenv.config();

export default {
	PROJECT_PG_DB: process.env.PROJECT_PG_DB || process.env.PROJECT_PG_DB_LOCAL,
	SECRET: process.env.SECRET,
	PORT: process.env.PORT
};
