'use strict';

import { GraphQLError } from 'graphql';
import errorTypes from './errorTypes';

export class GraphQlValidationError extends GraphQLError {
  constructor(errors) {
    super('The request is invalid.');
    // console.log(errors);
    this.state = errors.reduce((result, error) => {
      if (Object.prototype.hasOwnProperty.call(result, error.key)) {
        result[error.key].push(error.message);
      } else {
        /* eslint-disable no-param-reassign */
        result[error.key] = [error.message];
        /* eslint-enable no-param-reassign */
      }
      return result;
    }, {});
    this.type = errorTypes.VALIDATION_ERROR;
  }
}

/* eslint-disable import/prefer-default-export */
export class PassthroughGraphQlError extends GraphQLError {
  constructor(error) {
    super(error.message);
    const thisKeys = Object.keys(this);
    Object.keys(error).forEach((k) => {
      if (!thisKeys.includes(k)) {
        this[k] = error[k];
      }
    });
  }
}

export const validationError = (key, message) => ({ key, message });
