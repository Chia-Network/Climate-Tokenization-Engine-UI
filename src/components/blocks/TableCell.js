import React from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';

import {
  TableColumnTypeEnum,
  ToolTip,
  ToolTipPlacement,
  PrimaryButton,
} from '..';
import { getISODateWithHyphens } from '../../utils/dateUtils';
import { isStringOfNoValueType } from '../../utils/stringUtils';

const Text = styled('p')`
  color: ${props => props.color || props.theme.colors.default.secondary};
  font-size: 0.875rem;
  font-family: ${props => props.theme.typography.primary.regular};
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
`;

const StyledAlignedDiv = styled('div')`
  text-align: center;
`;

const StyledCenterContentContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TableCell = withTheme(({ config, value, record }) => {
  const appStore = useSelector(state => state);

  if (config.type === TableColumnTypeEnum.button) {
    return (
      <StyledCenterContentContainer>
        <PrimaryButton
          label={config.buttonLabel}
          onClick={() => config.buttonOnClick(record)}
        />
      </StyledCenterContentContainer>
    );
  }

  if (isStringOfNoValueType(value)) {
    return <Text selectedTheme={appStore.theme}>--</Text>;
  }

  if (config.type === TableColumnTypeEnum.image) {
    return (
      <StyledAlignedDiv>
        <img width="25" height="25" src={value.toString()} />
      </StyledAlignedDiv>
    );
  }

  if (config.type === TableColumnTypeEnum.date) {
    return (
      <Text selectedTheme={appStore.theme}>{getISODateWithHyphens(value)}</Text>
    );
  }

  if (config.type === TableColumnTypeEnum.quantity) {
    return (
      <Text selectedTheme={appStore.theme}>
        {value.toLocaleString(navigator.language)}
      </Text>
    );
  }

  const valueToDisplay = value.toString();
  return config?.isTooltipVisible ? (
    <ToolTip body={valueToDisplay} placement={ToolTipPlacement.Top}>
      <Text selectedTheme={appStore.theme}>{valueToDisplay}</Text>
    </ToolTip>
  ) : (
    <Text selectedTheme={appStore.theme}>{valueToDisplay}</Text>
  );
});

export { TableCell };
