import axios from "axios";
import { baseURL } from './baseURL';

axios.defaults.baseURL = baseURL;
// console.log('==========================\n', axios.defaults.baseURL, '\n==========================');

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;