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
  Table,
  TableColumnTypeEnum,
  SearchInput,
  modalTypeEnum,
  Modal,
  CreateTokenModal,
  SelectCreatable,
} from '../components';
import {
  getCountForTokensAndUntokenizedUnits,
  getTokens,
  getUntokenizedUnits,
} from '../store/actions/appActions';
import constants from '../constants';
import { downloadXlsxFromDataAndHeadings } from '../utils/xlsxUtils';

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

const StyledSearchContainer = styled('div')`
  max-width: 25.1875rem;
`;

const CreateTokens = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [unitToBeTokenized, setUnitToBeTokenized] = useState(null);
  const pageContainerRef = useRef(null);

  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const {
    untokenizedUnits,
    paginationNrOfPages,
    tokens,
    notification,
    untokenizedUnitsCount,
    tokensCount,
  } = useSelector(store => store);
  const [
    isTokenCreationPendingModalVisible,
    setIsTokenCreationPendingModalVisible,
  ] = useState(false);
  const sortOrderOptions = ['Ascending', 'Descending'];
  const [sortOrder, setSortOrder] = useState(sortOrderOptions[1]);

  useEffect(() => {
    dispatch(getCountForTokensAndUntokenizedUnits());
  }, []);

  const untokenizedUnitsTabLabel = untokenizedUnitsCount
    ? `${intl.formatMessage({
        id: 'untokenized-units',
      })} (${untokenizedUnitsCount})`
    : intl.formatMessage({
        id: 'untokenized-units',
      });

  const tokensTabLabel = tokensCount
    ? `${intl.formatMessage({
        id: 'existing-tokens',
      })} (${tokensCount})`
    : intl.formatMessage({
        id: 'existing-tokens',
      });

  useEffect(() => {
    if (tabValue === 0) {
      dispatch(
        getUntokenizedUnits({
          page: page,
          resultsLimit: constants.TABLE_ROWS,
          searchQuery: searchQuery,
          isRequestMocked: false,
          sortOrder: sortOrder,
        }),
      );
    } else if (tabValue === 1) {
      dispatch(
        getTokens({
          page: page,
          resultsLimit: constants.TABLE_ROWS,
          searchQuery: searchQuery,
          isRequestMocked: false,
          sortOrder: sortOrder,
        }),
      );
    }
  }, [page, tabValue, searchQuery, sortOrder]);

  const handleTabChange = useCallback(
    (event, newValue) => {
      setTabValue(newValue);
      setPage(0);
      setSearchQuery('');
    },
    [setTabValue],
  );

  const tokensTableConfig = useMemo(
    () => ({
      columns: [
        {
          title: 'Registry Project Id',
          key: 'registryProjectId',
          type: TableColumnTypeEnum.string,
          isTooltipVisible: true,
        },
        {
          title: 'Project Name',
          key: 'projectName',
          type: TableColumnTypeEnum.string,
          isTooltipVisible: true,
        },
        {
          title: 'Serial Number Block',
          key: 'serialNumberBlock',
          type: TableColumnTypeEnum.string,
          isTooltipVisible: true,
        },
        {
          title: 'Unit Count',
          key: 'unitCount',
          type: TableColumnTypeEnum.quantity,
        },
        {
          title: 'Marketplace',
          key: 'marketplace',
          type: TableColumnTypeEnum.string,
        },
        {
          title: 'Marketplace Identifier',
          key: 'marketplaceIdentifier',
          type: TableColumnTypeEnum.string,
          isTooltipVisible: true,
        },
        {
          title: 'Marketplace Link',
          key: 'marketplaceLink',
          type: TableColumnTypeEnum.string,
        },
      ],
    }),
    [],
  );

  const tokensKeysToBeDisplayed = useMemo(
    () => tokensTableConfig.columns.map(configItem => configItem.key),
    [tokensTableConfig],
  );

  const untokenizedUnitsTableConfig = useMemo(
    () => ({
      columns: [
        {
          title: 'Registry Project Id',
          key: 'registryProjectId',
          type: TableColumnTypeEnum.string,
          isTooltipVisible: true,
        },
        {
          title: 'Project Name',
          key: 'projectName',
          type: TableColumnTypeEnum.string,
          isTooltipVisible: true,
        },
        {
          title: 'Serial Number Block',
          key: 'serialNumberBlock',
          type: TableColumnTypeEnum.string,
          isTooltipVisible: true,
        },
        {
          title: 'Unit Status',
          key: 'unitStatus',
          type: TableColumnTypeEnum.string,
        },
        {
          title: 'Unit Count',
          key: 'unitCount',
          type: TableColumnTypeEnum.quantity,
        },
        {
          title: 'Actions',
          key: 'actions',
          type: TableColumnTypeEnum.button,
          buttonLabel: intl.formatMessage({ id: 'create-token' }),
          buttonOnClick: item => setUnitToBeTokenized(item),
        },
      ],
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

  const isTokenCreationPending =
    notification && notification.id === 'unit-was-tokenized';
  useEffect(() => {
    if (isTokenCreationPending) {
      setIsTokenCreationPendingModalVisible(true);
    }
  }, [notification]);

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

          <StyledFiltersContainer>
            <SelectCreatable
              options={sortOrderOptions}
              selected={sortOrder}
              isClearable={false}
              onChange={val => setSortOrder(val)}
            />
          </StyledFiltersContainer>
        </StyledHeaderContainer>

        <StyledSubHeaderContainer>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label={untokenizedUnitsTabLabel} />
            <Tab label={tokensTabLabel} />
          </Tabs>
          <StyledCSVOperationsContainer>
            {tabValue === 1 && (
              <DownloadIcon
                width={20}
                height={20}
                onClick={() =>
                  downloadXlsxFromDataAndHeadings(
                    tokens,
                    tokensKeysToBeDisplayed,
                  )
                }
              />
            )}
          </StyledCSVOperationsContainer>
        </StyledSubHeaderContainer>
        <StyledBodyContainer>
          <TabPanel value={tabValue} index={0}>
            {untokenizedUnits?.length > 0 ? (
              <Table
                config={untokenizedUnitsTableConfig}
                data={untokenizedUnits}
                changePageTo={page => setPage(page)}
                currentPage={page}
                numberOfPages={paginationNrOfPages}
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
              <Table
                config={tokensTableConfig}
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
        {unitToBeTokenized && (
          <CreateTokenModal
            onClose={() => setUnitToBeTokenized(null)}
            data={unitToBeTokenized}
          />
        )}
      </StyledSectionContainer>
      {isTokenCreationPendingModalVisible && (
        <Modal
          title={intl.formatMessage({
            id: 'token-creation-pending',
          })}
          body={intl.formatMessage({
            id: 'unit-was-tokenized',
          })}
          modalType={modalTypeEnum.confirmation}
          onClose={() => setIsTokenCreationPendingModalVisible(false)}
          hideButtons
        />
      )}
    </>
  );
};

export { CreateTokens };
