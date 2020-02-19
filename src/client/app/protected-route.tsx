import React from 'react';
import { Route, RouteProps as IRouteProps, Redirect } from 'react-router-dom';
import { isAuthenticated } from './authentication';

const ProtectedRoute = ({ component, ...routeProps }: IRouteProps) => (
    <Route {...routeProps} render={(props) => (
        isAuthenticated()
            ? { component }
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )} />
);

export default ProtectedRoute;