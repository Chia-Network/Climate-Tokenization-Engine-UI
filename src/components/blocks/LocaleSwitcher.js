import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, MenuItem } from '@mui/material';
import { LANGUAGE_CODES } from '../../translations';
import { setLocale } from '../../store/actions/appActions';
import styled, { withTheme } from 'styled-components';

const Container = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .MuiSelect-root,
  .MuiSvgIcon-root,
  .MuiSelect-select {
    color: ${props => props.theme.colors.default.primaryDark};
    font-family: ${props => props.theme.typography.primary.semiBold};
  }

  .MuiSelect-select {
    color: ${props => props.theme.colors.default.primary}};
  }

  .MuiSelect-root:hover,
  .MuiSvgIcon-root:hover,
  .MuiSelect-select:hover {
    color: ${props => props.theme.colors.default.primary};
  }

  .MuiOutlinedInput-notchedOutline {
    border: 0 !important;
    outline: 0;
  }
`;

const LocaleSwitcher = withTheme(() => {
  const dispatch = useDispatch();
  const appStore = useSelector(state => state);

  const handleLocaleChange = event => {
    dispatch(setLocale(event.target.value));
  };

  return (
    <Container>
      <Select value={appStore.locale} onChange={handleLocaleChange}>
        {Object.keys(LANGUAGE_CODES).map(key => (
          <MenuItem key={LANGUAGE_CODES[key]} value={LANGUAGE_CODES[key]}>
            {key}
          </MenuItem>
        ))}
      </Select>
    </Container>
  );
});

export { LocaleSwitcher };
