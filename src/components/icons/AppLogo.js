import React from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components';

import appLogo from '../../assets/img/tokenization-engine-logo.png';

const LogoContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${props => props.theme.colors.default.secondary};
  font-family: ${props => props.theme.typography.primary.bold};
  gap: 10px;
  font-size: 1rem;
  text-transform: uppercase;
`;

const AppLogo = withTheme(({ width, height }) => {
  return (
    <LogoContainer>
      <img src={appLogo} width={height} height={width} />
      Carbon Tokenization Engine
    </LogoContainer>
  );
});

export { AppLogo };
