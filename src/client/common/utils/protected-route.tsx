import React from 'react';

import { Route, RouteProps as IRouteProps, Redirect } from 'react-router-dom';

import { isAuthenticated, isFullyConfigured } from '../user/authentication';

type ProtectedRouteProps = IRouteProps & {
    onlyLoginRequired?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ render, onlyLoginRequired, ...routeProps }: ProtectedRouteProps) =>
    <Route {...routeProps} render={(renderProps) =>
        (onlyLoginRequired && isAuthenticated()) || isFullyConfigured()
            ? render && render(renderProps)
            : <Redirect to={{
                pathname: '/login',
            }} />
    } />;

export default ProtectedRoute;