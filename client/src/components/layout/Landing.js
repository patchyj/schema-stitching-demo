import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom"; // Helps redirecting
import { connect } from "react-redux";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="container">
          <h1 className="display-4">Jack McGregor</h1>
          <Link to="/home" className="btn btn--effect">
            Enter
          </Link>
        </div>
        <div className="iconContainer">
          <i className="fab fa-facebook" />
          <i className="fab fa-facebook" />
          <i className="fab fa-facebook" />
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Landing));
