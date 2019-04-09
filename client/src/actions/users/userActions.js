import axios from "axios";
import { baseURL } from "../../utils/baseURL";
import {
  GET_USERS_STARTED,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  GET_USER_STARTED,
  GET_USER_SUCCESS,
  GET_USER_FAILURE
} from "../types";
import { getUserQuery, getUsersQuery } from "./userQueries";

export const getUser = userData => dispatch => {
  dispatch({ type: GET_USER_STARTED });
  axios({
    url: `${baseURL}/graphql`,
    method: "post",
    data: {
      query: getUserQuery()
    },
    variables: {
      id: userData.id
    }
  })
    .then(res => {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_USER_FAILURE,
        payload: err
      });
    });
};

export const getUsers = dispatch => {
  dispatch({ type: GET_USERS_STARTED });
  axios({
    url: `${baseURL}/graphql`,
    method: "post",
    data: {
      query: getUsersQuery()
    }
  })
    .then(res => {
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_USERS_FAILURE,
        payload: err
      });
    });
};
