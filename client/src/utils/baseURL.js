import config from '../../config';

const { NODE_ENV } = process.env;
let baseURL = '';

switch (NODE_ENV) {
  case 'development':
    baseURL = `${config.BASE_URL_DEV}${config.API_GATEWAY_PORT}`;
  case 'test':
    baseURL = 'http://localhost:4000';
  case 'production':
    baseURL = 'http://localhost:4000';
  default:
    baseURL = 'http://localhost:4000';
    break;
}

export { baseURL };
