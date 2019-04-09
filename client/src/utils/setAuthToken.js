import axios from "axios";
// Change the port depending on what the Node ENV is
if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:4000"; // make sure dev server is running
} else if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "https://patchyj-portfolio-api.herokuapp.com";
}

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
