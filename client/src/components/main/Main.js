import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// ------- Static -------
import * as postActions from "../../actions/posts/postActions";

class Main extends Component {
  componentDidMount() {
    this.props.actions.getPosts();
  }

  render() {
    return (
      <div>
        <h1 className="display-3">Main</h1>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(postActions, dispatch)
  };
};

Main.propTypes = {
  actions: PropTypes.func
};

Main.defaultProps = {
  actions: PropTypes.shape(PropTypes.func)
};

export default connect(
  null,
  mapDispatchToProps
)(Main);
