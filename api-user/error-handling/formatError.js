import errorTypes from './errorTypes';
import unwrapErrors from './unwrapErrors';

export default shouldIncludeStack => (error) => {
  const unwrappedError = unwrapErrors(error);

//   console.log(unwrappedError);

  const formattedError = {
    message: unwrappedError.message || error.message,
    type: unwrappedError.type || error.type || errorTypes.ERROR,
    identifier: unwrappedError.identifier || error.identifier || null,
    clientName: unwrappedError.clientName || error.clientName || null,
    clientPortfolioName: unwrappedError.clientPortfolioName || error.clientPortfolioName || null,
    state: unwrappedError.state,
    detail: unwrappedError.detail,
    path: unwrappedError.path || error.path
  };

  if (shouldIncludeStack) {
    formattedError.stack = unwrappedError.stack || error.stack;
  }

  return formattedError;
};
