import React from 'react';
import styled from 'styled-components';

import { LocaleSwitcher, ClimateWarehouseLogo } from '..';
import Connect from '../blocks/Connect';

const AppHeaderContainer = styled('div')`
  width: 100%;
  height: 4rem;
  background-color: ${props => props.theme.colors.default.onButton};
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 0rem 1.5rem;
  box-sizing: border-box;
`;

const LogoContainer = styled('div')`
  align-self: center;
  height: 100%;
`;

const AppHeader = () => {
  return (
    <AppHeaderContainer>
      <LogoContainer>
        <ClimateWarehouseLogo width="100%" height="100%" />
      </LogoContainer>
      <Connect />
      <LocaleSwitcher />
    </AppHeaderContainer>
  );
};

export { AppHeader };
