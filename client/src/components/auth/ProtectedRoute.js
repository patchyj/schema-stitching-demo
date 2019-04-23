import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        isAuthenticated
          ? <Component {...props} />
          : <Redirect to="/auth" />
      )}
    />
  )
};

export default PrivateRoute;
