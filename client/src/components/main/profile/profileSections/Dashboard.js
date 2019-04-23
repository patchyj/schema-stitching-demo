import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../../../../actions/users/userActions';

import Card from '../../../common/Card';

class Dashboard extends Component {
  componentDidMount() {
    const { userID } = this.props;
    console.log('=======\n', userID, '\n=======');
    this.props.getUser(userID);
  }

  render() {
    return (
      <div>
        <h1 className="text-center text-white py-3">Dashboard</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Card
                title="Posts"
                subtitle="All of your posts"
                text="Lorem ipsum dolr cantem"
                link="posts"
              />
            </div>
            <div className="col-md-6">
              <Card
                title="Projects"
                subtitle="All of your projects"
                text="Lorem ipsum dolr cantem"
                link="projects"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getUser: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  auth: PropTypes.shape({}).isRequired,
  userID: PropTypes.string,
};

Dashboard.defaultProps = {
  userID: ''
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

export default connect(
  mapStateToProps,
  { getUser }
)(Dashboard);
