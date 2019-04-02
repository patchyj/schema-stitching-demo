/* eslint-disable no-param-reassign */
'use strict';

import { GraphQLError } from 'graphql';
import errorTypes from './errorTypes';

export class GraphQlValidationError extends GraphQLError {
  constructor(errors) {
    super('The request is invalid.');
    const arr = Object.entries(errors);

    // console.log(errors);
    // console.log("=========================");
    // console.log(arr);
    // console.log("=========================");
    this.state = arr.reduce((result, error) => {
      if (error[0] === 'errors') {
        result.errors = [error[1]];
      } else {
        result.message = [errors.message]
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
