// Require Modules
const logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// DB Config
const { PORT } = require('./config');

// Initialise App
const app = express();

// Enable Morgan
app.use(logger('dev'));

app.listen(PORT, () => console.log(`Seed app is running on http://localhost:${PORT}/api/blogs/graphql`));
