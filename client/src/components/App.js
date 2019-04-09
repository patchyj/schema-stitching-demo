/* eslint-disable import/no-named-as-default */
// ------- React -------
import React from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
// ------- Redux -------
import { connect } from "react-redux";
// ------- Webpack -------
import { hot } from "react-hot-loader";
// ======= COMPONENTS =======
// ------- Layout -------
import Navbar from "./layout/navigation/Navbar";
import Main from "./main/Main";
import AboutContainer from "./main/about/AboutContainer";
import BlogContainer from "./main/blog/BlogContainer";
import ProjectsContainer from "./main/projects/ProjectsContainer";
import Landing from "./layout/Landing";
// ------- Auth -------
import Auth from "./auth/Auth";

class App extends React.Component {
  render() {
    const {
      router: {
        location: { pathname }
      }
    } = this.props;

    return (
      <div>
        {pathname !== "/" && <Navbar />}
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/auth" component={Auth} />
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
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  router: state.router
});

export default hot(module)(connect(mapStateToProps)(App));
