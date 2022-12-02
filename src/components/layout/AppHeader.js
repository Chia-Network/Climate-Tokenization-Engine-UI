import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { LocaleSwitcher, AppLogo, Connect } from '../../components';

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

const ButtonsContainer = styled('div')`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  align-items: center;

  .MuiSelect-root,
  .MuiSvgIcon-root {
    color: ${props => props.theme.colors[props.selectedTheme].onSurface};
  }
`;

const AppHeader = () => {
  const appStore = useSelector(state => state);

  return (
    <AppHeaderContainer>
      <AppLogo height={40} width={40} />
      <ButtonsContainer selectedTheme={appStore.theme}>
        <Connect />
        <LocaleSwitcher />
      </ButtonsContainer>
    </AppHeaderContainer>
  );
};

export { AppHeader };
