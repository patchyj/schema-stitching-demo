import React, { Component } from "react";
import PropTypes from "prop-types";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import App from "./App";

// ------- Auth -------
import jwtDecode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import {
  setCurrentUser,
  logoutUser,
  resetAuth
} from "../actions/auth/authActions";

export default class Root extends Component {
  render() {
    const { store, history } = this.props;

    // // Check for token
    if (localStorage.jwtToken) {
      // Set Auth token header off
      setAuthToken(localStorage.jwtToken);
      // Decode token and get user info
      const decoded = jwtDecode(localStorage.jwtToken);
      // Set user and is authenticated
      store.dispatch(setCurrentUser(decoded));

      // Check for expired token
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        // Logout User
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "/login";
      }
    } else {
      store.dispatch(resetAuth());
    }

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
