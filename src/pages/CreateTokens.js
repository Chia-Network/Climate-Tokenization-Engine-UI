import _ from 'lodash';
import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  Tab,
  Tabs,
  TabPanel,
  DownloadIcon,
  H3,
  DataTable,
  SearchInput,
} from '../components';
import { getTokens, getUntokenizedUnits } from '../store/actions/appActions';
import constants from '../constants';

const StyledSectionContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledHeaderContainer = styled('div')`
  display: flex;
  align-items: center;
  padding: 30px 24px 14px 16px;
`;

// const StyledFiltersContainer = styled('div')`
//   margin: 0rem 1.2813rem;
// `;

const StyledSubHeaderContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 27.23px;
`;

const StyledBodyContainer = styled('div')`
  flex-grow: 1;
`;

const NoDataMessageContainer = styled('div')`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledCSVOperationsContainer = styled('div')`
  display: flex;
  justify-content: flex-end;
  gap: 20px;

  svg {
    cursor: pointer;
  }
`;

const StyledSearchContainer = styled('div')`
  max-width: 25.1875rem;
`;

const CreateTokens = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const pageContainerRef = useRef(null);

  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { untokenizedUnits, paginationNrOfPages, tokens } = useSelector(
    store => store,
  );

  useEffect(() => {
    if (tabValue === 0) {
      dispatch(
        getUntokenizedUnits({
          page: page,
          resultsLimit: constants.TABLE_ROWS,
          searchQuery: searchQuery,
          isRequestMocked: false,
        }),
      );
    } else if (tabValue === 1) {
      dispatch(
        getTokens({
          page: page,
          resultsLimit: constants.TABLE_ROWS,
          searchQuery: searchQuery,
          isRequestMocked: false,
        }),
      );
    }
  }, [page, tabValue, searchQuery]);

  const handleTabChange = useCallback(
    (event, newValue) => {
      setTabValue(newValue);
      setPage(0);
      setSearchQuery('');
    },
    [setTabValue],
  );

  const untokenizedUnitsKeysToBeDisplayed = useMemo(
    () => [
      'projectName',
      'unitOwner',
      'countryJurisdictionOfOwner',
      'serialNumberBlock',
      'unitBlockStart',
      'unitBlockEnd',
      'unitCount',
      'unitStatus',
      'unitType',
    ],
    [],
  );

  const tokenizeUnitButtonConfig = useMemo(
    () => ({
      label: intl.formatMessage({ id: 'create-token' }),
      action: item => console.log('this is my item: ', item),
    }),
    [],
  );

  const onSearch = useMemo(
    () =>
      _.debounce(event => {
        setSearchQuery(event.target.value);
        setPage(0);
      }, 300),
    [setSearchQuery, setPage],
  );

  useEffect(() => {
    return () => {
      onSearch.cancel();
    };
  }, []);

  return (
    <>
      <StyledSectionContainer ref={pageContainerRef}>
        <StyledHeaderContainer>
          <StyledSearchContainer>
            <SearchInput
              key={tabValue}
              size="large"
              onChange={onSearch}
              outline
            />
          </StyledSearchContainer>

          {/* <StyledFiltersContainer>
            <SelectCreatable
              options={['Ken', 'Craig', 'Michael']}
              selected={'Craig'}
              onChange={val => console.log(val)}
            />
          </StyledFiltersContainer> */}
        </StyledHeaderContainer>

        <StyledSubHeaderContainer>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label={intl.formatMessage({ id: 'untokenized-units' })} />
            <Tab label={intl.formatMessage({ id: 'existing-tokens' })} />
          </Tabs>
          <StyledCSVOperationsContainer>
            <DownloadIcon width={20} height={20} />
          </StyledCSVOperationsContainer>
        </StyledSubHeaderContainer>
        <StyledBodyContainer>
          <TabPanel value={tabValue} index={0}>
            {untokenizedUnits?.length > 0 ? (
              <DataTable
                headings={untokenizedUnitsKeysToBeDisplayed}
                data={untokenizedUnits}
                changePageTo={page => setPage(page)}
                currentPage={page}
                numberOfPages={paginationNrOfPages}
                buttonConfig={tokenizeUnitButtonConfig}
              />
            ) : (
              <NoDataMessageContainer>
                <H3>
                  <FormattedMessage id="no-untokenized-units" />
                </H3>
              </NoDataMessageContainer>
            )}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {tokens?.length > 0 ? (
              <DataTable
                headings={untokenizedUnitsKeysToBeDisplayed}
                data={tokens}
                changePageTo={page => setPage(page)}
                currentPage={page}
                numberOfPages={paginationNrOfPages}
              />
            ) : (
              <NoDataMessageContainer>
                <H3>
                  <FormattedMessage id="no-existing-tokens" />
                </H3>
              </NoDataMessageContainer>
            )}
          </TabPanel>
        </StyledBodyContainer>
      </StyledSectionContainer>
    </>
  );
};

export { CreateTokens };
