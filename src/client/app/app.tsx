import styled from 'styled-components';
import React from 'react';

const App = () =>
    <StyledApp>
        <h1>
            HouseworkHelper
        </h1>
    </StyledApp>;


const StyledApp = styled.div`
    h1 {
        text-align: center;
    }
    width: 100vw;
    height: 100vh;
`;

export default App;