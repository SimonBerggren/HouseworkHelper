import styled from 'styled-components';
import React from 'react';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Location as ILocation } from 'history';

import ProtectedRoute from '../common/utils/protected-route';

import Lazy from './lazy';
import MenuBar from './menu-bar';

type AnimatedSwitchProps = {
    location: ILocation
}

const HouseholdPage = () => <Lazy importFunc={() => import('../pages/household-page/household-page')} />;
const Error404Page = () => <Lazy importFunc={() => import('../pages/error-404-page/error-404-page')} />;
const RequestsPage = () => <Lazy importFunc={() => import('../pages/requests-page/requests-page')} />;
const RewardsPage = () => <Lazy importFunc={() => import('../pages/rewards-page/rewards-page')} />;
const SignUpPage = () => <Lazy importFunc={() => import('../pages/signup-page/signup-page')} />;
const LoginPage = () => <Lazy importFunc={() => import('../pages/login-page/login-page')} />;
const UsersPage = () => <Lazy importFunc={() => import('../pages/users-page/users-page')} />;
const UserPage = () => <Lazy importFunc={() => import('../pages/user-page/user-page')} />;
const HomePage = () => <Lazy importFunc={() => import('../pages/home-page/home-page')} />;

const AnimatedSwitch: React.FC<AnimatedSwitchProps> = ({ location }: AnimatedSwitchProps) => {
    return (
        <SwitchContainer>

            <TransitionGroup className='transition-group'>
                <CSSTransition
                    key={location.key}
                    timeout={{ enter: 300, exit: 300 }}
                    classNames='fade'
                >
                    <RouteSection>

                        <MenuBar />

                        <Switch location={location}>

                            <ProtectedRoute exact path='/household' render={() => <HouseholdPage />} />
                            <ProtectedRoute exact path='/requests' render={() => <RequestsPage />} />
                            <ProtectedRoute exact path='/rewards' render={() => <RewardsPage />} />
                            <ProtectedRoute exact path='/user' render={() => <UserPage />} />

                            <ProtectedRoute onlyLoginRequired exact path='/users' render={() => <UsersPage />} />

                            <Route exact path='/signup' render={() => <SignUpPage />} />
                            <Route exact path='/login' render={() => <LoginPage />} />
                            <Route exact path='/' component={HomePage} />

                            <Route render={() => <Error404Page />} />

                        </Switch>

                    </RouteSection>

                </CSSTransition>
            </TransitionGroup>

        </SwitchContainer>
    );
};



const SwitchContainer = styled.div`

    .fade-enter {
        opacity: 0;
    }

    .fade-enter.fade-enter-active {
        opacity: 1;
        transition: opacity 300ms linear;
    }

    .fade-exit {
        opacity: 1;
    }

    .fade-exit.fade-exit-active {
        opacity: 0;
        transition: opacity 300ms linear;
    }

    div.transition-group {
        position: relative;
    }
`;

const RouteSection = styled.section`
    position: absolute;
    top: 64px;
    left: 0;
`;

export default withRouter(AnimatedSwitch);