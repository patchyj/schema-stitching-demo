import formatError from './formatError';

export default includeStack => (error) => {
  const formattedError = formatError(includeStack)(error);

  return formattedError;
};
