import errorTypes from './errorTypes';
import unwrapErrors from './unwrapErrors';
import { GraphQlValidationError } from './errors';

export default shouldIncludeStack => (error) => {
  const unwrappedError = unwrapErrors(error);

  const formattedError = {
    message: unwrappedError.message || error.message,
    type: unwrappedError.type || error.type || errorTypes.ERROR,
    state: unwrappedError.state,
    detail: unwrappedError.detail,
    path: unwrappedError.path || error.path,
    errors: unwrappedError.errors || error.extensions.exception.errors
  };

  if (shouldIncludeStack) {
    formattedError.stack = unwrappedError.stack || error.extensions.exception.stacktrace;
  }

  const newError = new GraphQlValidationError(formattedError);
  console.log(newError);
  return newError;
};
