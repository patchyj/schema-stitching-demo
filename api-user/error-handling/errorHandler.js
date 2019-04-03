import formatError from './formatError';

export default includeStack => (error) => {
  // console.log('======= /errorHandler.js ======= \n', error, '\n======= /errorHandler.js =======');

  const formattedError = formatError(includeStack)(error);

  return formattedError;
};
