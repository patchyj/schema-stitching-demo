/* eslint-disable indent */
import {
  CONFIRM_ACCOUNT_1,
  CONFIRM_ACCOUNT_2,
  PASSWORD_RESET_1,
  PASSWORD_RESET_2,
  DELETE_ACCOUNT_1,
  DELETE_ACCOUNT_2
} from './emailTypes';
import {
  confirmAccount1,
  confirmAccount2,
  passwordReset1,
  passwordReset2,
  deleteAccount1,
  deleteAccount2
} from './createEmail';

// EMAILING
// TYPES:
// -- CONFIRM ACCOUNT => name, email, message
// -- CONFIRM_ACCOUNT_2 => name, email, message
// -- PASSWORD RESET 1: 'CLCIK THE LINK TO RESET YOUR PASSWORD' => name, email, message, link
// -- PASSWORD RESET 2: 'YOUR PASSWORD WAS RESET' => name, email
// -- ACCOUNT DELETION CONFIRMATION => name, email, message

export default (type, args) => {
  switch (type) {
    case CONFIRM_ACCOUNT_1:
      return confirmAccount1(args);
    case CONFIRM_ACCOUNT_2:
      return confirmAccount2(args);
    case PASSWORD_RESET_1:
      return passwordReset1(args);
    case PASSWORD_RESET_2:
      return passwordReset2(args);
    case DELETE_ACCOUNT_1:
      return deleteAccount1(args);
    case DELETE_ACCOUNT_2:
      return deleteAccount2(args);
    default:
      return null;
  }
};
