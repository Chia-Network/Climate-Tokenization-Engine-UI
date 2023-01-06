import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme, css } from 'styled-components';

import { Pagination, TableCell } from '..';
import { useWindowSize } from '../../hooks/useWindowSize';

const TableColumnTypeEnum = {
  string: 'string',
  quantity: 'quantity',
  date: 'date',
  image: 'image',
  button: 'button',
  link: 'link',
};

const StyledTable = styled('table')`
  box-sizing: border-box;
  background-color: ${props => props.theme.colors.default.onButton};
  width: 100%;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;
  overflow-x: scroll;
`;

const StyledTableHead = styled('thead')`
  font-weight: 500;
  background-color: ${props => props.theme.colors.default.gray3};
  border-left: 1px solid whitesmoke;
  border-right: 1px solid whitesmoke;
  position: sticky;
  top: 0;
  z-index: 2;
`;

const Th = styled('th')`
  padding: 1rem;
  display: table-cell;
  text-align: left;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  letter-spacing: 0.01071em;
  vertical-align: inherit;
  text-align: center;
  color: ${props => props.color || props.theme.colors.default.secondary};
  font-size: 0.875rem;
  font-family: ${props => props.theme.typography.primary.semiBold};
  font-style: normal;
  font-weight: 600;
  line-height: 1.375rem;
`;

const Tr = styled('tr')`
  color: ${props => props.theme.colors.default.secondary};
  background-color: ${props => props.theme.colors.default.onButton};

  ${props =>
    props.onClick &&
    css`
      :hover {
        background-color: ${props => props.theme.colors.default.gray6};
        cursor: pointer;
      }
    `}
`;

const Td = styled('td')`
  display: table-cell;
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  letter-spacing: 0.01071em;
  vertical-align: inherit;
  max-width: 200px;
  text-align: center;
  button {
    white-space: nowrap;
  }
  overflow: hidden;
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

const Table = withTheme(
  ({ data, config, changePageTo, currentPage, numberOfPages }) => {
    const { theme } = useSelector(state => state);
    const ref = React.useRef(null);
    const [height, setHeight] = React.useState(0);
    const windowSize = useWindowSize();

    useEffect(() => {
      setHeight(
        windowSize.height - ref.current.getBoundingClientRect().top - 20,
      );
    }, [ref.current, windowSize.height]);

    return (
      <StyledRefContainer ref={ref}>
        <StyledScalableContainer height={`${height}px`}>
          <StyledTable selectedTheme={theme}>
            <StyledTableHead selectedTheme={theme}>
              <tr>
                {config.columns.map(columnConfig => (
                  <Th selectedTheme={theme} key={columnConfig.key}>
                    {columnConfig.title}
                  </Th>
                ))}
              </tr>
            </StyledTableHead>
            <tbody style={{ position: 'relative' }}>
              {data.map((record, index) => (
                <Tr
                  selectedTheme={theme}
                  key={index}
                  onClick={
                    config?.rows?.onRowClick
                      ? () => config?.rows?.onRowClick(record)
                      : undefined
                  }
                >
                  {config.columns.map(columnConfig => (
                    <Td selectedTheme={theme} key={columnConfig.key}>
                      <TableCell
                        config={columnConfig}
                        value={record[columnConfig.key]}
                        record={record}
                      />
                    </Td>
                  ))}
                </Tr>
              ))}
            </tbody>
          </StyledTable>
          <StyledPaginationContainer>
            <Pagination
              callback={changePageTo}
              pages={numberOfPages}
              current={currentPage}
              showLast
            />
          </StyledPaginationContainer>
        </StyledScalableContainer>
      </StyledRefContainer>
    );
  },
);

export { Table, TableColumnTypeEnum };
