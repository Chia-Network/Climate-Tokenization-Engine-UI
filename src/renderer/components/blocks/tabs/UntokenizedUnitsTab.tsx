import { FormattedMessage } from 'react-intl';
import { UntokenizedUnitListTable, SkeletonTable } from '@/components';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useColumnOrderHandler, useQueryParamState } from '@/hooks';
import { debounce } from 'lodash';
import { GetUnitsResponse, useLazyGetProjectsByIdsQuery, useGetUntokenizedUnitsQuery } from '@/api';
import { Unit } from '@/schemas/Unit.schema';
import { Project } from '@/schemas/Project.schema';

interface UnitAndProjectResult extends Omit<GetUnitsResponse, 'data'> {
  data: (Unit & Project)[];
}

interface PageTabProps {
  search: string;
  order: string;
  setOrder: (order: string) => void;
}

const UntokenizedUnitsTab: React.FC<PageTabProps> = ({ search, order, setOrder }: PageTabProps) => {
  const [currentPage, setCurrentPage] = useQueryParamState('page', '1');
  const handleSetOrder = useColumnOrderHandler(order, setOrder);

  const [dataLoading, setDataLoading] = useState<boolean>();
  const {
    data: untokenizedUnitsResponse,
    isFetching: untokenizedUnitsLoading,
    error: untokenizedUnitsError,
  } = useGetUntokenizedUnitsQuery({ page: Number(currentPage), search, order }, { refetchOnMountOrArgChange: true });
  const [triggerGetProjects, { data: projectsResponse, isLoading: projectsLoading, error: projectsError }] =
    useLazyGetProjectsByIdsQuery();

  useEffect(() => {
    if (untokenizedUnitsLoading) {
      setDataLoading(true);
    } else if (
      dataLoading &&
      !untokenizedUnitsLoading &&
      untokenizedUnitsResponse &&
      !projectsLoading &&
      !projectsResponse
    ) {
      const projectIds: string[] = untokenizedUnitsResponse.data.reduce<string[]>(
        (projectIds: string[], unit: Unit) => {
          if (unit?.issuance?.warehouseProjectId) {
            projectIds.push(unit?.issuance?.warehouseProjectId);
          }
          return projectIds;
        },
        [],
      );
      triggerGetProjects({ projectIds });
    } else if (
      dataLoading &&
      !untokenizedUnitsLoading &&
      !projectsLoading &&
      untokenizedUnitsResponse &&
      projectsResponse
    ) {
      setDataLoading(false);
    }
  }, [
    dataLoading,
    projectsResponse,
    projectsLoading,
    triggerGetProjects,
    untokenizedUnitsResponse,
    untokenizedUnitsLoading,
  ]);

  const unifiedResult = useMemo<UnitAndProjectResult | undefined>(() => {
    if (projectsResponse && untokenizedUnitsResponse) {
      const result: UnitAndProjectResult = { ...untokenizedUnitsResponse, data: [] };
      untokenizedUnitsResponse.data.forEach((unit: Unit) => {
        const associatedProject = projectsResponse.find(
          (project) => project.warehouseProjectId === unit.issuance?.warehouseProjectId,
        );
        if (associatedProject) {
          result.data.push({ ...unit, ...associatedProject });
        } else {
          console.error('unit did not have associated project');
        }
      });
      return result;
    } else {
      return undefined;
    }
  }, [
    projectsError,
    projectsLoading,
    projectsResponse,
    untokenizedUnitsError,
    untokenizedUnitsLoading,
    untokenizedUnitsResponse,
  ]);

  const handlePageChange = useCallback(
    debounce((page) => setCurrentPage(page), 800),
    [setCurrentPage],
  );

  if (untokenizedUnitsError || projectsError) {
    return <FormattedMessage id={'unable-to-load-contents'} />;
  }

  if (dataLoading) {
    return <SkeletonTable />;
  }

  if (!unifiedResult) {
    return <FormattedMessage id={'no-records-found'} />;
  }

  return (
    <>
      {untokenizedUnitsLoading ? (
        <SkeletonTable />
      ) : (
        <UntokenizedUnitListTable
          data={unifiedResult.data || []}
          rowActions="tokenize"
          isLoading={untokenizedUnitsLoading}
          currentPage={Number(currentPage)}
          onPageChange={handlePageChange}
          setOrder={handleSetOrder}
          order={order}
          totalPages={unifiedResult.pageCount}
          totalCount={unifiedResult.pageCount < 10 ? unifiedResult.data.length : unifiedResult.pageCount * 10}
        />
      )}
    </>
  );
};

export { UntokenizedUnitsTab };
