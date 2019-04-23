import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ------- Auth -------
import { logoutUser, setCurrentUser } from '../../../actions/auth/authActions';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const {
      auth: { isAuthenticated }
    } = this.props;

    const authLinks = (
      <Fragment>
        <li className="nav-item">
          <Link className="nav-link text-white profile-icon" to="/profile">
            <i className="fas fa-user-circle fa-2x" />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/auth" onClick={this.onLogoutClick}>
            <span>Logout</span>
          </Link>
        </li>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <li className="nav-item">
          <Link className="nav-link" to="/auth">
            <span>Login / Register</span>
          </Link>
        </li>
      </Fragment>
    );

    return (
      <nav className="navbar navbar-expand-lg">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navDropDown"
          aria-controls="navDropDown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navDropDown"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/main/about">
                <span>About</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/main/blog">
                <span>Blog</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/main/projects">
                <span>Projects</span>
              </Link>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav authLinks">
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </nav>
    );
  }
}

Navbar.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  router: state.router
});

export default connect(
  mapStateToProps,
  { logoutUser, setCurrentUser }
)(Navbar);
