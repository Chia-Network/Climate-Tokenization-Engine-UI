import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  SearchInput,
  Tab,
  Tabs,
  TabPanel,
  DownloadIcon,
  H3,
  SelectCreatable,
} from '../components';
import { getUntokenizedUnits } from '../store/actions/appActions';

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

const StyledSearchContainer = styled('div')`
  max-width: 25.1875rem;
`;

const StyledFiltersContainer = styled('div')`
  margin: 0rem 1.2813rem;
`;

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

const CreateTokens = () => {
  const [tabValue, setTabValue] = useState(0);
  const pageContainerRef = useRef(null);
  const intl = useIntl();
  const dispatch = useDispatch();
  const { untokenizedUnits } = useSelector(store => store);

  useEffect(() => {
    dispatch(
      getUntokenizedUnits({
        page: 1,
        resultsLimit: 5,
        searchQuery: 'testing',
        isRequestMocked: true,
      }),
    );
  }, []);

  const handleTabChange = useCallback(
    (event, newValue) => {
      setTabValue(newValue);
    },
    [setTabValue],
  );

  console.log('untokenizedUnits: ', untokenizedUnits);

  return (
    <>
      <StyledSectionContainer ref={pageContainerRef}>
        <StyledHeaderContainer>
          <StyledSearchContainer>
            <SearchInput
              size="large"
              onChange={() => console.log('search')}
              outline
            />
          </StyledSearchContainer>

          <StyledFiltersContainer>
            <SelectCreatable
              options={['Ken', 'Craig', 'Michael']}
              selected={'Craig'}
              onChange={val => console.log(val)}
            />
          </StyledFiltersContainer>
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
            <NoDataMessageContainer>
              <H3>
                <FormattedMessage id="no-untokenized-units" />
              </H3>
            </NoDataMessageContainer>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <NoDataMessageContainer>
              <H3>
                <FormattedMessage id="no-existing-tokens" />
              </H3>
            </NoDataMessageContainer>
          </TabPanel>
        </StyledBodyContainer>
      </StyledSectionContainer>
    </>
  );
};

export { CreateTokens };
