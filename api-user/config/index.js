import dotenv from 'dotenv';

dotenv.config();

export default {
	USER_DB: process.env.USER_DB,
	USER_DB_LOCAL: process.env.USER_DB_LOCAL,
	SECRET: process.env.SECRET,
	PORT: process.env.PORT,
	HOST: process.env.HOST,
	USER_EMAIL: process.env.USER_EMAIL,
	USER_PASSWORD: process.env.USER_PASSWORD,
};

// HOST=smtp.ethereal.email
// USER_EMAIL=mcttester6@gmail.com
// USER_PASSWORD=superSecurePassword1234?!