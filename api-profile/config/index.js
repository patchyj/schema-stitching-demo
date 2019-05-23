import dotenv from "dotenv";

dotenv.config();

export default {
  PROFILE_DB: process.env.PROFILE_DB,
  PROFILE_DB_LOCAL: process.env.PROFILE_DB_LOCAL,
  SECRET: process.env.SECRET,
  PORT: process.env.PORT
};
