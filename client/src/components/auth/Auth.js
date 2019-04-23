/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Register from './Register';
import Login from './Login';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true
    };
  }

  render() {
    const { login } = this.state;
    return (
      <div className="container text-center mt-3 auth">
        <h1 className="display-4">
          <span
            className={`${!login && 'text-muted'}`}
            onClick={() => this.setState({ login: !login })}
          >
            Login
          </span>
          <span className="slash text-white mx-4">/</span>
          <span
            className={`${login && 'text-muted'}`}
            onClick={() => this.setState({ login: !login })}
          >
            Register
          </span>
        </h1>
        {login ? (
          <Fragment>
            <Login />
            <span
              className="authSubLinks"
              onClick={() => this.setState({ login: !login })}
            >
              Don't have an account? Register now
            </span>
            <Link className="authSubLinks" to="/password-reset">
              Forgot your password?
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <Register />
            <span
              className="authSubLinks"
              onClick={() => this.setState({ login: !login })}
            >
              Already a member? Sign in
            </span>
          </Fragment>
        )}
      </div>
    );
  }
}

export default connect(null)(Auth);
