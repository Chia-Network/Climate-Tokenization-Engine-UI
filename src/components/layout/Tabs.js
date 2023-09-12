import React from 'react';
import MuiTabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styled from 'styled-components';

const StyledTabs = styled(MuiTabs)`
  .MuiButtonBase-root {
    color: #6e7d7f;
    font-family: ${props => props.theme.typography.primary.semiBold};
  }

  .MuiButtonBase-root:hover {
    color: ${props => props.theme.colors.default.primary};
  }

  button.Mui-selected {
    color: ${props => props.theme.colors.default.primary};
  }

  .MuiTabs-indicator {
    background-color: ${props => props.theme.colors.default.primaryDark};
  }
`;

const Tabs = ({ ...props }) => {
  return <StyledTabs {...props} />;
};

export { Tabs, Tab };
