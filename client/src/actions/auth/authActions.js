import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import { baseURL } from "../../utils/baseURL";
import {
	registerUserQuery,
	loginUserQuery,
	verifyUserQuery
} from "./authQueries";
import {
	SET_CURRENT_USER,
	REGISTER_USER_STARTED,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	LOGIN_USER_STARTED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	VERIFY_USER_STARTED,
	VERIFY_USER_SUCCESS,
	VERIFY_USER_FAILURE,
	RESET_AUTH
} from "../types";

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
			// if invalid details throw error
			if (user.data.errors && user.data.errors.length > 0) {
				const err = {
					validations: user.data.errors[0].extensions.exception
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
export const loginUser = (userData, history) => dispatch => {
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
					validations: user.data.errors[0].extensions.exception
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
			history.push("/profile");
		})
		.catch(err => {
			dispatch({
				type: LOGIN_USER_FAILURE,
				payload: err
			});
		});
};

// Verify User
export const verifyUser = (token, history) => dispatch => {
	dispatch({ type: VERIFY_USER_STARTED });

	axios
		.post(`${baseURL}/graphql`, {
			query: verifyUserQuery(),
			variables: { token }
		})
		.then(user => {
			dispatch({
				type: VERIFY_USER_SUCCESS,
				payload: user.data.data.verifyUser
			});
			history.push("/profile");
		})
		.catch(err => {
			dispatch({
				type: VERIFY_USER_FAILURE,
				payload: err
			});
		});
};

// Set loggedin user
export const setCurrentUser = decoded => ({
	type: SET_CURRENT_USER,
	payload: decoded
});

export const setCurrentUserFromToken = token => dispatch => {
	const decoded = jwt_decode(token);
	dispatch(setCurrentUser(decoded));
};

// Log out user
export const logoutUser = () => dispatch => {
	// Remove token from local storage
	localStorage.removeItem("jwtToken");
	// Remove auth header for future ressponses
	setAuthToken(false);
	// Set current user to empty object which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
	window.location.href = "/auth";
};

export const resetAuth = () => dispatch => {
	dispatch({ type: RESET_AUTH });
};
