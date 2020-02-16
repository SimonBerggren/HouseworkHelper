import React from 'react';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Location as ILocation } from 'history';

import LoginPage from '../pages/login-page/login-page';
import HomePage from '../pages/home-page/home-page';
import styled from 'styled-components';

interface Props {
    location: ILocation
}

const AnimatedSwitch: React.FC<Props> = ({ location }: Props) => {
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
                            <Route path="/login" render={() => <LoginPage />} />
                            <Route path="/" render={() => <HomePage />} />
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
    width: 100%;
    top: 0;
    left: 0;
`;

export default withRouter(AnimatedSwitch);