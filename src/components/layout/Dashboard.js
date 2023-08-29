import React from 'react';
import styled, { withTheme } from 'styled-components';

import { LeftNav, AppHeader, ErrorBoundary } from '../../components';

const Main = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.default.gray4};
`;

const BodyText = styled('div')`
  max-width: calc(100% - 3rem);
  width: calc(100% - 3rem);
  margin: 1.5rem;
  background-color: ${props => props.theme.colors.default.onButton};
  overflow: hidden;
  box-sizing: border-box;
  padding: 0;
`;

const InnerContainer = styled('div')`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

const Dashboard = withTheme(({ children }) => {
  return (
    <Main>
      {window.self === window.top && (
        <AppHeader />
      )}
      <InnerContainer>
        <ErrorBoundary>
          <LeftNav />
          <BodyText>{children}</BodyText>
        </ErrorBoundary>
      </InnerContainer>
    </Main>
  );
});

export { Dashboard };
