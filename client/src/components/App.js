/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-named-as-default */
// ------- React -------
import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// ------- Redux -------
import { connect } from 'react-redux';
// ------- Webpack -------
import { hot } from 'react-hot-loader';
// ======= COMPONENTS =======
// ------- Layout -------
import Navbar from './layout/navigation/Navbar';
import Main from './main/Main';
// ------- Static -------
import Landing from './layout/Landing';
// ------- Sections -------
import ProfileContainer from './main/profile/ProfileContainer';
import AboutContainer from './main/about/AboutContainer';
import BlogContainer from './main/blog/BlogContainer';
import ProjectsContainer from './main/projects/ProjectsContainer';
// ------- Auth -------
import Auth from './auth/Auth';
import VerifyAccount from './auth/VerifyAccount';
import ProtectedRoute from './auth/ProtectedRoute';

class App extends Component {
  render() {
    const {
      router: {
        location: { pathname }
      },
      auth: { isAuthenticated }
    } = this.props;

    return (
      <div>
        {pathname !== '/' && <Navbar />}
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/auth/token/:token" component={VerifyAccount} />
          <ProtectedRoute exact path="/profile" component={ProfileContainer} isAuthenticated={isAuthenticated} />
          <Route exact path="/main/about" component={AboutContainer} />
          <Route exact path="/main/blog" component={BlogContainer} />
          <Route exact path="/main/projects" component={ProjectsContainer} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  router: PropTypes.shape({}).isRequired,
  auth: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  router: state.router
});

// export default hot(module)(connect(mapStateToProps)(App));
export default hot(module)(connect(mapStateToProps)(withRouter(App)));
