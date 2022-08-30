import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme, css } from 'styled-components';

import { TableCellHeaderText, TableCellText } from '../typography';
import { convertPascalCaseToSentenceCase } from '../../utils/stringUtils';
import { BasicMenu } from '..';
import { useWindowSize } from '../../hooks/useWindowSize';
import { FormattedMessage } from 'react-intl';

const Table = styled('table')`
  box-sizing: border-box;
  background-color: ${props => props.theme.colors.default.onButton};
  width: 100%;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;
`;

const THead = styled('thead')`
  font-weight: 500;
  background-color: ${props =>
    props.theme.colors[props.selectedTheme].secondary};
  border-left: 1px solid whitesmoke;
  border-right: 1px solid whitesmoke;
`;

const Th = styled('th')`
  padding: 1rem;
  color: ${props => props.theme.colors[props.selectedTheme].onSurface};
  display: table-cell;
  text-align: left;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  letter-spacing: 0.01071em;
  vertical-align: inherit;
  :nth-child(1) {
    display: none;
  }

  ${props =>
    props.stick &&
    css`
      position: sticky;
      right: 0px;
      background-color: rgba(242, 242, 242);
    `}
`;

const Tr = styled('tr')`
  color: ${props => props.theme.colors[props.selectedTheme].onSurface};
  background-color: ${props => props.theme.colors.default.onButton};

  :hover {
    cursor: zoom-in;
    background-color: ${props =>
      props.theme.hexToRgba(
        props.theme.colors[props.selectedTheme].secondary,
        0.3,
      )};
  }
`;

const Td = styled('td')`
  display: table-cell;
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  letter-spacing: 0.01071em;
  vertical-align: inherit;
  max-width: 100px;
  :nth-child(1) {
    display: none;
  }
  ${props =>
    props.sticky &&
    css`
      position: sticky;
      right: 0px;
      background-color: ${props.theme.colors.default.onButton};
    `}

  ${props =>
    props.columnId === 'orgUid' &&
    `
  text-align: center;
  `}
`;

export const StyledPaginationContainer = styled('div')`
  box-sizing: border-box;
  background-color: ${props => props.theme.colors.default.onButton};
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70px;
  width: 100%;
  max-height: 70px;
  margin: 25px 0px 25px 0px;
`;

const StyledRefContainer = styled('div')`
  height: 100%;
  position: relative;
`;

const StyledScalableContainer = styled('div')`
  overflow: auto;
  position: relative;
  width: 100%;
  ${props =>
    props.height &&
    css`
      height: ${props.height};
    `}
`;

const DataTable = withTheme(({ headings, data, actions }) => {
  const { theme } = useSelector(state => state);
  const ref = React.useRef(null);
  const [height, setHeight] = React.useState(0);
  const windowSize = useWindowSize();

  useEffect(() => {
    setHeight(windowSize.height - ref.current.getBoundingClientRect().top - 20);
  }, [ref.current, windowSize.height]);

  return (
    <StyledRefContainer ref={ref}>
      <StyledScalableContainer height={`${height}px`}>
        <Table selectedTheme={theme}>
          <THead selectedTheme={theme}>
            <tr>
              {headings.map((heading, index) => (
                <Th selectedTheme={theme} key={index}>
                  <TableCellHeaderText>
                    {heading && convertPascalCaseToSentenceCase(heading)}
                  </TableCellHeaderText>
                </Th>
              ))}
              <Th selectedTheme={theme} key={'action'} sticky>
                <TableCellHeaderText>
                  <FormattedMessage id="actions" />
                </TableCellHeaderText>
              </Th>
            </tr>
          </THead>
          <tbody style={{ position: 'relative' }}>
            {data.map((record, index) => (
              <Tr index={index} selectedTheme={theme} key={index}>
                {headings.map((key, index) => (
                  <Td selectedTheme={theme} columnId={key} key={index}>
                    <TableCellText
                      tooltip={
                        record[key] &&
                        `${convertPascalCaseToSentenceCase(key)}: ${record[
                          key
                        ].toString()}`
                      }>
                      {record[key] === 'null' ||
                      record[key] === '' ||
                      record[key] === null ||
                      !record[key]
                        ? '--'
                        : record[key].toString()}
                    </TableCellText>
                  </Td>
                ))}

                <Td style={{ cursor: 'pointer' }} selectedTheme={theme} sticky>
                  <BasicMenu options={actions} item={record} />
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
        {/* <StyledPaginationContainer>
              <APIPagination actions={actions} />
            </StyledPaginationContainer> */}
      </StyledScalableContainer>
    </StyledRefContainer>
  );
});

export { DataTable };
