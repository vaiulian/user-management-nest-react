/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectComponent = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
        localStorage.getItem('jwt-data')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )}
  />
)