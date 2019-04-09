import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { baseURL } from "../../utils/baseURL";
import { registerUserQuery, loginUserQuery } from "./authQueries";

import {
  SET_CURRENT_USER,
  REGISTER_USER_STARTED,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_STARTED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  RESET_AUTH
} from "../../actions/types";

export const registerUser = (userData, history) => dispatch => {
  dispatch({ type: REGISTER_USER_STARTED });

  axios
    .post(`${baseURL}/graphql`, {
      query: registerUserQuery(),
      variables: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        password2: userData.password2
      }
    })
    .then(user => {
      if (user.data.errors && user.data.errors.length > 0) {
        const err = {
          validations: user.data.errors[0].extensions.exception.validationErrors
        };
        throw err;
      }

      dispatch({
        type: REGISTER_USER_SUCCESS
      });
      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: REGISTER_USER_FAILURE,
        payload: err
      });
    });
};

// Login - get user token
export const loginUser = userData => dispatch => {
  dispatch({ type: LOGIN_USER_STARTED });
  axios
    .post(`${baseURL}/graphql`, {
      query: loginUserQuery(),
      variables: {
        email: userData.email,
        password: userData.password
      }
    })
    .then(user => {
      // if invalid details throw error
      if (user.data.errors && user.data.errors.length > 0) {
        const err = {
          validations: user.data.errors[0].extensions.exception.validationErrors
        };
        throw err;
      }
      // Save to local storage
      const token = user.data.data.loginUser;
      // set token to local storage, which only stores string
      localStorage.setItem("jwtToken", token);

      // set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // set current user
      // dispatch(setCurrentUser(decoded));
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: decoded
      });
    })
    .catch(err => {
      dispatch({
        type: LOGIN_USER_FAILURE,
        payload: err
      });
    });
};

// Set loggedin user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log out user
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future ressponses
  setAuthToken(false);
  // Set current user to empty object which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  window.location.href = "/login";
};

export const resetAuth = () => dispatch => {
  dispatch({ type: RESET_AUTH });
};
