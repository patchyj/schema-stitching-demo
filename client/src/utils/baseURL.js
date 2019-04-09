let baseURL;
if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:4000"; // make sure dev server is running
} else if (process.env.NODE_ENV === "production") {
  baseURL = "https://patchyj-portfolio-api.herokuapp.com";
}

export { baseURL };
