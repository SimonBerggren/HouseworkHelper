import styled from 'styled-components';
import React from 'react';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Location as ILocation } from 'history';

import Lazy from './lazy';

interface AnimatedSwitchProps {
    location: ILocation
}

const Error404Page = () => <Lazy importFunc={() => import('../pages/error-404-page/error-404-page')} />;
const SignUpPage = () => <Lazy importFunc={() => import('../pages/signup-page/signup-page')} />;
const LoginPage = () => <Lazy importFunc={() => import('../pages/login-page/login-page')} />;
const HomePage = () => <Lazy importFunc={() => import('../pages/home-page/home-page')} />;

const AnimatedSwitch: React.FC<AnimatedSwitchProps> = ({ location }: AnimatedSwitchProps) => {
    return (
        <SwitchContainer>
            <TransitionGroup className="transition-group">

                <CSSTransition
                    key={location.key}
                    timeout={{ enter: 300, exit: 300 }}
                    classNames='fade'
                >

                    <RouteSection>
                        <Switch location={location}>
                            <Route exact path="/signup" render={() => <SignUpPage />} />
                            <Route exact path="/login" render={() => <LoginPage />} />
                            <Route exact path="/" render={() => <HomePage />} />
                            <Route render={() => <Error404Page />} />
                        </Switch>
                    </RouteSection>

                </CSSTransition>
            </TransitionGroup>
        </SwitchContainer>
    );
};

const SwitchContainer = styled.div`

    @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    div {
        animation: fadeIn 300ms;
    }

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
    width: 100%;
    top: 0;
    left: 0;
`;

export default withRouter(AnimatedSwitch);