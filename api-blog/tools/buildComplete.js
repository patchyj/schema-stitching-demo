const chalk = require('chalk');
const pkg = require('../package.json');

/* eslint-disable no-console */

console.log(`Completed build of ${chalk.white(pkg.name)}:${chalk.white(pkg.version)}`);
