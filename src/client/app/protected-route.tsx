import React from 'react';
import { Route, RouteProps as IRouteProps, Redirect } from 'react-router-dom';

import { isFullyConfigured } from './authentication';

const ProtectedRoute = ({ render, ...routeProps }: IRouteProps) =>
    <Route {...routeProps} render={(props) =>
        isFullyConfigured()
            ? render && render(props)
            : <Redirect to={{
                pathname: '/',
            }} />
    } />;

export default ProtectedRoute;