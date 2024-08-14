import React from 'react';
import styled, { withTheme } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Body } from '..';
import constants from '../../constants';

const Container = styled('div')`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const StyledAppVersion = styled('div')`
  position: absolute;
  bottom: 12px;
  left: 50px;
`;

const NavContainer = styled('div')`
  padding-top: 40px;
  width: 16rem;
  min-width: 16rem;
  height: 100%;
  background-color: ${props => props.theme.colors.default.leftNav.bg};
`;

const MenuItem = styled(Link)`
  background: ${props =>
    props.selected
      ? props.theme.colors.default.leftNav.highlight
      : 'transparent'};
  :hover {
    background: ${props => props.theme.colors.default.primary};
  }
  padding: 0.5625rem 0rem 0.75rem 3.25rem;
  text-transform: uppercase;
  color: ${props =>
    props.selected
      ? props.theme.colors.default.primary
      : props.theme.colors.default.leftNav.text};
  font-family: ${props => props.theme.typography.primary.bold};
  cursor: pointer;
  display: block;
  text-decoration: none;
  width: calc(100% - 1.625rem);
  margin: auto;
  font-size: 1.1rem;
  box-sizing: border-box;
  border-radius: 0.625rem;
  margin-bottom: 0.625rem;
`;

const LeftNav = withTheme(({ children }) => {
  const location = useLocation();

  return (
    <Container>
      <NavContainer>
        <MenuItem
          selected={location.pathname.includes(constants.ROUTES.createTokens)}
          to={constants.ROUTES.createTokens}
        >
          <FormattedMessage id="create-tokens" />
        </MenuItem>
        <div></div>
        <MenuItem
          selected={location.pathname.includes(constants.ROUTES.revertTokens)}
          to={constants.ROUTES.revertTokens}
        >
          <FormattedMessage id="revert-tokens" />
        </MenuItem>
      </NavContainer>
      {children}
      <StyledAppVersion>
        <Body size="X-Small" color="white">
          {typeof process !== 'undefined' &&
            process?.env?.REACT_APP_VERSION &&
            `v${process?.env?.REACT_APP_VERSION}`}
        </Body>
      </StyledAppVersion>
    </Container>
  );
});

export { LeftNav };
