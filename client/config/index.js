import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT,
  API_GATEWAY_PORT: process.env.API_GATEWAY_PORT,
  API_GATEWAY_DEV: process.env.API_GATEWAY_DEV,
  BASE_URL_DEV: process.env.BASE_URL_DEV,
  BASE_URL_TEST: process.env.BASE_URL_TEST,
  BASE_URL_PROD: process.env.BASE_URL_PROD
}