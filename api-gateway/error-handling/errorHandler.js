import formatError from './formatError';

export default includeStack => (error) => {
  const formattedError = formatError(includeStack)(error);
  // console.log('==== errorHandler ====\n', formattedError.extensions.exception, '\n==== errorHandler ====');
  
  return formattedError;
};
