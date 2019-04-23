import {
  GET_USERS_STARTED,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  GET_USER_STARTED,
  GET_USER_SUCCESS,
  GET_USER_FAILURE
} from '../actions/types';

const initialState = {
  user: {},
  loading: false,
  errors: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS_STARTED:
      return {
        ...state,
        loading: true
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: {},
        users: action.payload.data.data.getUsers
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.message
      };
    case GET_USER_STARTED:
      return {
        ...state,
        loading: true
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: {},
        user: action.payload.data.user
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.message
      };
    default:
      return state;
  }
}
