import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyUser } from '../../actions/auth/authActions';


const VerifyAccount = (props) => {
  const { match: { params: { token } }, history } = props;
  return (
    <div className="container p-5">
      <div className="row text-center">
        <div className="col-12 text-white">
          <h3>Click the link to verify your account</h3>
          <button
            type="button"
            className="btn btn-lg btn-primary text-white"
            onClick={() => props.verifyUser(token, history)}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

VerifyAccount.propTypes = {
  match: PropTypes.shape(PropTypes.shape({})),
  history: PropTypes.shape(PropTypes.shape({})),
  verifyUser: PropTypes.func,
};

VerifyAccount.defaultProps = {
  match: {},
  history: {},
  verifyUser: () => {}
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { verifyUser }
)(withRouter(VerifyAccount));