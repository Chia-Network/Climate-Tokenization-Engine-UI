import React from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme, css } from 'styled-components';
import { CircularProgress } from '@mui/material';
import { ButtonText } from '../typography';

const Button = styled('button')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  max-width: 100%;
  background-color: ${props =>
    props.danger ? '#FF4D4F' : props.theme.colors.default.primaryDark};
  border: 1px solid #1a8385;
  border-radius: 5px;
  padding: 10px;
  height: 32px;
  cursor: pointer;

  ${props => props.size === 'large' && `height: 40px !important;`};
  ${props => props.size === 'small' && `height: 28px !important;`};

  ${props => props.size === 'large' && `padding: 15px !important;`};
  ${props => props.size === 'small' && `padding: 3px !important;`};

  &:hover {
    background-color: ${props =>
      props.danger ? '#FF7875' : props.theme.colors.default.primary};
  }

  &:active {
    background-color: ${props =>
      props.danger ? '#F5222D' : props.theme.colors.default.primary};
  }

  ${props =>
    props.loading &&
    `
      background-color: ${props => (props.danger ? '#FF7875' : '#40A9FF')};
    opacity: 0.65;
  `}

  &:disabled {
    background-color: #f5f5f5;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    cursor: default;
  }

  ${props => {
    if (props.type === 'default') {
      if (props.loading) {
        return `
          background-color: white;
          :hover, :active {
            background-color: white;
          };
          h4 { color: #BFBFBF };
          border: 1px solid #e5e5e5;
        `;
      }
      return css`
        background-color: white;
        :hover,
        :active {
          background-color: white;
        }

        border: 1px solid #e5e5e5;

        h4 {
          color: ${props.theme.colors.default.primaryDark};
        }
        h4:hover,
        h4:active {
          color: ${props.theme.colors.default.primary};
        }
      `;
    }
  }};
`;

const PrimaryButton = withTheme(
  ({
    label,
    loading,
    icon,
    size,
    danger,
    disabled,
    onClick,
    type = 'primary',
  }) => {
    const appStore = useSelector(state => state);
    return (
      <Button
        loading={loading}
        disabled={disabled}
        size={size}
        danger={danger}
        type={type}
        selectedTheme={appStore.theme}
        onClick={onClick}
      >
        {loading && (
          <>
            <CircularProgress size={15} thickness={5} />
            <span style={{ width: size === 'small' ? 2 : 5 }}></span>
          </>
        )}
        {icon && (
          <>
            {icon}
            <span style={{ width: size === 'small' ? 2 : 5 }}></span>
          </>
        )}
        <ButtonText color={disabled ? '#BFBFBF' : '#0E172B'}>
          {label}
        </ButtonText>
      </Button>
    );
  },
);

export { PrimaryButton };
