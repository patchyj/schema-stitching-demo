// Require Modules
const logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// DB Config
const config = require('./config/keys');

// Initialise App
const app = express();

// Enable Morgan
app.use(logger('dev'));

app.listen(config.port, () =>
  console.log(
    `API is running on http://localhost:${config.port}/api/blogs/graphql`
  )
);
