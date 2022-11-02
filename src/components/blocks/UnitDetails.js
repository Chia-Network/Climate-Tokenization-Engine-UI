import React from 'react';
import styled from 'styled-components';

import { Body } from '../../components';

export const StyledDetailedViewTabItem = styled('div')`
  display: flex;
  justify-content: center;
  background: #fafafa;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 16px 21px;
  margin: 20px 0px;
  gap: 20px;
`;

export const StyledDetailedViewTab = styled('div')`
  display: grid;
  grid-template-columns: 50% 50%;
  column-gap: 1rem;
`;

export const StyledItem = styled('div')`
  overflow-wrap: break-word;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

const UnitDetails = ({ data }) => {
  const isDataOfArrayType = data instanceof Array;

  const getShouldKeyValueBeDisplayed = value =>
    typeof value !== 'object' || value === null;

  if (isDataOfArrayType) return data.map((item, arrayIndex) => (
    <StyledDetailedViewTabItem key={arrayIndex}>
      <div style={{ width: '60%' }}>
        <StyledDetailedViewTab>
          {Object.keys(item).map(
            (key, index) =>
              getShouldKeyValueBeDisplayed(item[key]) && (
                <StyledItem key={index}>
                  <Body size="Bold" width="100%">
                    {key}
                  </Body>
                  <Body>{item[key]}</Body>
                </StyledItem>
              ),
          )}
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  ));

  return (
    <StyledDetailedViewTabItem>
      <div style={{ width: '60%' }}>
        <StyledDetailedViewTab>
          {Object.keys(data).map(
            (key, index) =>
              getShouldKeyValueBeDisplayed(data[key]) && (
                <StyledItem key={index}>
                  <Body size="Bold" width="100%">
                    {key}
                  </Body>
                  <Body>{data[key]}</Body>
                </StyledItem>
              ),
          )}
        </StyledDetailedViewTab>
      </div>
    </StyledDetailedViewTabItem>
  );
};

export { UnitDetails };
