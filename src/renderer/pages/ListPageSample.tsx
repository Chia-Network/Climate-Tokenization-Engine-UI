import React, { useCallback } from 'react';
import { useGetProjectsQuery } from '@/api';
import { useColumnOrderHandler, useQueryParamState, useWildCardUrlHash } from '@/hooks';
import { debounce } from 'lodash';
import { IndeterminateProgressOverlay, ProjectsListTable, SampleDeepLinkedModal, SkeletonTable } from '@/components';
import { FormattedMessage } from 'react-intl';

const ListPageSample: React.FC = () => {
  const [currentPage, setCurrentPage] = useQueryParamState('page', '1');
  const [orgUid /* set func here */] = useQueryParamState('orgUid', undefined);
  const [search /* set func here */] = useQueryParamState('search', undefined);
  const [order, setOrder] = useQueryParamState('order', undefined);
  const handleSetOrder = useColumnOrderHandler(order, setOrder);
  const [projectDetailsFragment, projectDetailsModalActive, setProjectModalActive] = useWildCardUrlHash('project');

  const {
    data: projectsData,
    isLoading: projectsLoading,
    isFetching: projectsFetching,
    error: projectsError,
  } = useGetProjectsQuery({ page: Number(currentPage), orgUid, search, order });

  const handlePageChange = useCallback(
    debounce((page) => setCurrentPage(page), 800),
    [setCurrentPage],
  );

  if (projectsLoading) {
    return <SkeletonTable />;
  }

  if (projectsError) {
    return <FormattedMessage id={'unable-to-load-contents'} />;
  }

  if (!projectsData) {
    return <FormattedMessage id={'no-records-found'} />;
  }

  return (
    <>
      {projectsFetching && <IndeterminateProgressOverlay />}
      {projectsLoading ? (
        <SkeletonTable />
      ) : (
        <ProjectsListTable
          data={projectsData?.data || []}
          rowActions="transfer"
          isLoading={projectsLoading}
          currentPage={Number(currentPage)}
          onPageChange={handlePageChange}
          onRowClick={(row) => setProjectModalActive(true, row.warehouseProjectId)}
          setOrder={handleSetOrder}
          order={order}
          totalPages={projectsData.pageCount}
          totalCount={projectsData.pageCount < 10 ? projectsData.data.length : projectsData.pageCount * 10}
        />
      )}
      {projectDetailsModalActive && (
        <SampleDeepLinkedModal
          onClose={() => setProjectModalActive(false)}
          urlFragmentDerivedData={projectDetailsFragment.replace('project-', '')}
        />
      )}
    </>
  );
};

export { ListPageSample };
