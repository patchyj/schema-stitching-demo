import dotenv from 'dotenv';

dotenv.config();

export default {
	USER_DB: process.env.USER_DB,
	PROFILE_DB: process.env.PROFILE_DB,
	SECRET: process.env.SECRET,
	PORT: process.env.PORT,
};
