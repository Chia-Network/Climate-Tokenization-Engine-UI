import { DebouncedFunc } from 'lodash';
import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Column, CreateTokenModal, DataTable, PageCounter, Pagination } from '@/components';
import { Project } from '@/schemas/Project.schema';
import { Badge } from 'flowbite-react';
import { useWildCardUrlHash } from '@/hooks';
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
  const [tokenizeModalFragment, tokenizeModalActive, setTokenizeModalActive] = useWildCardUrlHash('tokenize');

  const columns = useMemo(() => {
    const actionColumn: Column[] = [
      {
        title: '',
        key: 'actionColumn',
        ignoreChildEvents: true,
        ignoreOrderChange: true,
        render: (row: Unit & Project) => {
          if (rowActions === 'tokenize') {
            const urlHashValue = row.warehouseUnitId + '^' + row.warehouseProjectId || undefined;
            return (
              <Button onClick={() => setTokenizeModalActive(true, urlHashValue)}>
                <p className="capitalize">
                  <FormattedMessage id="tokenize" />
                </p>
              </Button>
            );
          } else {
            return <></>;
          }
        },
      },
    ];

    const staticColumns: Column[] = [
      {
        title: <FormattedMessage id="registry-project-id" />,
        key: 'projectId',
      },
      {
        title: <FormattedMessage id="project-name" />,
        key: 'projectName',
      },
      {
        title: <FormattedMessage id="serial-number-block" />,
        key: 'serialNumberBlock',
        render: (row: Unit) => (
          <div className="m-1 p-3 bg-white rounded-lg border shadow-sm dark:border-gray-500 dark:bg-transparent text-center overflow-hidden">
            <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-gray-50">
              {row.serialNumberBlock}
            </h5>
          </div>
        ),
      },
      {
        title: <FormattedMessage id="unit-status" />,
        key: 'unitStatus',
        render: (row: Unit) => {
          let color: string = '';
          switch (row.unitStatus) {
            case 'Held': {
              color = 'lime';
              break;
            }
            case 'Retired': {
              color = 'purple';
              break;
            }
            case 'Cancelled': {
              color = 'yellow';
              break;
            }
            case 'Expired': {
              color = 'red';
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
            case 'Inactive': {
              color = 'dark';
              break;
            }
            default: {
              color = 'gray';
              break;
            }
          }

          return (
            <div className="flex">
              <Badge color={color} size="sm">
                {row.unitStatus}
              </Badge>
            </div>
          );
        },
      },
      {
        title: <FormattedMessage id="unit-count" />,
        key: 'unitCount',
      },
    ];

    return rowActions ? actionColumn.concat(staticColumns) : staticColumns;
  }, [rowActions, setTokenizeModalActive]);

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
        tableHeightOffsetPx={320}
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
      {tokenizeModalActive && (
        <CreateTokenModal onClose={() => setTokenizeModalActive(false)} tokenizeUrlFragment={tokenizeModalFragment} />
      )}
    </>
  );
};

export { UntokenizedUnitListTable };
