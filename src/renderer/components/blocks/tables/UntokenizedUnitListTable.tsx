import { DebouncedFunc } from 'lodash';
import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Column, DataTable, PageCounter, Pagination, CreateTokenModal, Tooltip } from '@/components';
import { Project } from '@/schemas/Project.schema';
import { Badge } from 'flowbite-react';
import { useUrlHash, useWildCardUrlHash } from '@/hooks';
import { Unit } from '@/schemas/Unit.schema';

interface TableProps {
  data: (Unit & Project)[];
  rowActions?: 'tokenize';
  isLoading: boolean;
  currentPage: number;
  onPageChange: DebouncedFunc<(page: any) => void>;
  setOrder?: (sort: string) => void;
  onRowClick?: (row: any) => void;
  order?: string;
  totalPages: number;
  totalCount: number;
}

const UntokenizedUnitListTable: React.FC<TableProps> = ({
  data,
  rowActions,
  isLoading,
  currentPage,
  onPageChange,
  onRowClick,
  setOrder,
  order,
  totalPages,
  totalCount,
}) => {
  const [, editProjectModalActive, setEditProjectModalActive] = useWildCardUrlHash('edit-project');
  const [createProjectModalActive, setCreateProjectModalActive] = useUrlHash('create-project');

  const handleCloseUpsertModal = () => {
    setCreateProjectModalActive(false);
    setEditProjectModalActive(false);
  };

  const columns = useMemo(() => {
    const actionColumn: Column[] = [
      {
        title: '',
        key: 'actionColumn',
        ignoreChildEvents: true,
        ignoreOrderChange: true,
        render: (row: Project) => {
          if (rowActions === 'tokenize') {
            return <Button>optional {row.projectName}</Button>;
          } else {
            return <></>;
          }
        },
      },
    ];

    const staticColumns: Column[] = [
      {
        title: <FormattedMessage id="registry-project-id" />,
        key: 'warehouseProjectId',
        render: (row: Project) => <span className="font-bold">{row.currentRegistry || '-'}</span>,
      },
      {
        title: <FormattedMessage id="project-name" />,
        key: 'projectName',
      },
      {
        title: <FormattedMessage id="serial-number-block" />,
        key: 'serialNumberBlock',
        render: (row: Project) => (
          <div className="m-1 p-3 bg-white rounded-lg border shadow-sm dark:border-gray-500 dark:bg-transparent text-center overflow-hidden">
            <Tooltip content={row.projectId}>
              <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-gray-50">{row.projectId}</h5>
            </Tooltip>
          </div>
        ),
      },
      {
        title: <FormattedMessage id="unit-status" />,
        key: 'unitStatus',
        render: (row: Unit & Project) => {
          let color: string = '';
          switch (row.unitStatus) {
            case 'Held': {
              color = 'success';
              break;
            }
            case 'Retired': {
              color = 'purple';
              break;
            }
            case 'Cancelled': {
              color = 'warning';
              break;
            }
            case 'Expired': {
              color = 'failure';
              break;
            }
            case 'Buffer': {
              color = 'info';
              break;
            }
            case 'Pending Export': {
              color = 'pink';
              break;
            }
            case 'Exported': {
              color = 'gray';
              break;
            }
            default: {
              color = 'black';
              break;
            }
          }

          return (
            <Badge color={color} style={{ display: 'inline-flex' }}>
              {row.unitStatus}
            </Badge>
          );
        },
      },
      {
        title: <FormattedMessage id="unit-count" />,
        key: 'unitCount',
      },
    ];

    return rowActions ? actionColumn.concat(staticColumns) : staticColumns;
  }, [rowActions]);

  return (
    <>
      <DataTable
        columns={columns}
        onChangeOrder={setOrder}
        onRowClick={onRowClick}
        order={order}
        data={data}
        primaryKey="warehouseUnitId"
        isLoading={isLoading}
        tableHeightOffsetPx={170}
        footer={
          <>
            <PageCounter currentPage={currentPage} totalCount={totalCount} />
            <Pagination
              currentPage={currentPage}
              layout="pagination"
              onPageChange={onPageChange}
              showIcons={true}
              totalPages={totalPages || 1}
            />
          </>
        }
      />
      {(createProjectModalActive || editProjectModalActive) && (
        <CreateTokenModal urlFragmentDerivedData={''} onClose={handleCloseUpsertModal} />
      )}
    </>
  );
};

export { UntokenizedUnitListTable };
