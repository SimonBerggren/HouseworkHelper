import React from 'react';

import { Route, RouteProps as IRouteProps, Redirect } from 'react-router-dom';

import { isAuthenticated } from '../user/authentication';

const ProtectedRoute: React.FC<IRouteProps> = ({ render, ...routeProps }: IRouteProps) =>
    <Route {...routeProps} render={(renderProps) =>
        isAuthenticated()
            ? render && render(renderProps)
            : <Redirect to={{
                pathname: '/login',
            }} />
    } />;

export default ProtectedRoute;