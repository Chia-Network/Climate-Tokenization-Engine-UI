import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryParamState, useUrlHash } from '@/hooks';
import { debounce } from 'lodash';
import {
  Button,
  UntokenizedUnitsTab,
  ComponentCenteredSpinner,
  IndeterminateProgressOverlay,
  SearchBox,
  Tabs,
} from '@/components';
import { FormattedMessage } from 'react-intl';
import { Organization } from '@/schemas/Organization.schema';
import { useNavigate } from 'react-router-dom';
import { useGetOrganizationsListQuery } from '@/api';
// @ts-ignore
import { useGetStagedProjectsQuery } from '@/api/cadt/v1/staging';

enum TabTypes {
  TOKENIZED,
  UNTOKENIZED,
}

interface ProcessedStagingData {
  staged: any[];
  pending: any[];
  failed: any[];
  transfer: any;
}

const MyProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [orgUid, setOrgUid] = useQueryParamState('orgUid', undefined);
  const [search, setSearch] = useQueryParamState('search', undefined);
  const [order, setOrder] = useQueryParamState('order', undefined);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [projectStagedSuccess, setProjectStagedSuccess] = useUrlHash('success-stage-project');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [commitModalActive, setCommitModalActive] = useUrlHash('commit-staged-items');
  const [, setCreateProjectModalActive] = useUrlHash('create-project');
  const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.UNTOKENIZED);
  const [committedDataLoading, setCommittedDataLoading] = useState<boolean>(false);
  const { data: unprocessedStagedProjects, isLoading: stagingDataLoading } = useGetStagedProjectsQuery();
  const { data: organizationsListData, isLoading: organizationsListLoading } = useGetOrganizationsListQuery();
  const myOrganization = useMemo<Organization | undefined>(
    () => organizationsListData?.find((org: Organization) => org.isHome),
    [organizationsListData],
  );

  const processedStagingData: ProcessedStagingData = useMemo<ProcessedStagingData>(() => {
    const data: ProcessedStagingData = { staged: [], pending: [], failed: [], transfer: undefined };
    if (unprocessedStagedProjects?.forEach) {
      unprocessedStagedProjects.forEach((stagedProject: any) => {
        if (stagedProject?.table === 'Projects') {
          if (!stagedProject.commited && !stagedProject.failedCommit && !stagedProject.isTransfer) {
            data.staged.push(stagedProject);
          } else if (stagedProject.commited && !stagedProject.failedCommit && !stagedProject.isTransfer) {
            data.pending.push(stagedProject);
          } else if (!stagedProject.commited && stagedProject.failedCommit && !stagedProject.isTransfer) {
            data.failed.push(stagedProject);
          } else if (stagedProject.commited && stagedProject.isTransfer) {
            data.transfer = stagedProject;
          }
        }
      });
    }
    return data;
  }, [unprocessedStagedProjects]);

  const contentsLoading = useMemo<boolean>(() => {
    return committedDataLoading || stagingDataLoading;
  }, [committedDataLoading, stagingDataLoading]);

  useEffect(() => {
    if (myOrganization) {
      setOrgUid(myOrganization.orgUid);
    }
  }, [myOrganization, myOrganization?.orgUid, organizationsListData, setOrgUid]);

  useEffect(() => {
    if (!myOrganization && !organizationsListLoading) {
      navigate('/');
    }
  }, [myOrganization, navigate, organizationsListLoading]);

  const handleSearchChange = useCallback(
    debounce((event: any) => {
      setSearch(event.target.value);
    }, 800),
    [setSearch, debounce],
  );

  if (!myOrganization || organizationsListLoading) {
    return <ComponentCenteredSpinner />;
  }

  return (
    <>
      <div className="pt-2 pl-2 pr-2 h-full">
        {contentsLoading && <IndeterminateProgressOverlay />}
        <div className="flex flex-col md:flex-row gap-6 my-2.5 relative z-30 items-center h-auto">
          {activeTab === TabTypes.UNTOKENIZED && (
            <>
              <Button disabled={contentsLoading} onClick={() => setCreateProjectModalActive(true)}>
                <FormattedMessage id="create-project" />
              </Button>
              <SearchBox defaultValue={search} onChange={handleSearchChange} />
            </>
          )}
          {activeTab === TabTypes.TOKENIZED && (
            <>
              <Button
                disabled={contentsLoading || !processedStagingData.staged.length}
                onClick={() => setCommitModalActive(true)}
              >
                <FormattedMessage id="commit" />
              </Button>
            </>
          )}
        </div>
        <div className="h-13">
          <Tabs onActiveTabChange={(tab: TabTypes) => setActiveTab(tab)}>
            <Tabs.Item
              title={
                <p className="capitalize">
                  <FormattedMessage id="untokenized-units" />
                </p>
              }
            />
            <Tabs.Item
              title={
                <p className="capitalize">
                  <FormattedMessage id="tokenized-units" />
                  {' (' + String(processedStagingData.staged.length + ') ')}
                </p>
              }
            />
          </Tabs>
        </div>
        <div id="tabs content">
          {activeTab === TabTypes.UNTOKENIZED && (
            <UntokenizedUnitsTab
              orgUid={orgUid}
              search={search}
              order={order}
              setOrder={setOrder}
              setIsLoading={setCommittedDataLoading}
            />
          )}
          {activeTab === TabTypes.TOKENIZED && <div>TODO: tokenized units tab</div>}
        </div>
      </div>
    </>
  );
};

export { MyProjectsPage };
