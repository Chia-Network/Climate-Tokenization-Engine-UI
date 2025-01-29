import { DebouncedFunc } from 'lodash';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Column, DataTable, PageCounter, Pagination, Tooltip } from '@/components';
import { Project } from '@/schemas/Project.schema';
import { Unit } from '@/schemas/Unit.schema';
import { Badge } from 'flowbite-react';

interface TableProps {
  data: (Unit & Project)[];
  isLoading: boolean;
  currentPage: number;
  onPageChange: DebouncedFunc<(page: any) => void>;
  setOrder?: (sort: string) => void;
  onRowClick?: (row: any) => void;
  order?: string;
  totalPages: number;
  totalCount: number;
}

const TokenizedUnitListTable: React.FC<TableProps> = ({
  data,
  isLoading,
  currentPage,
  onPageChange,
  onRowClick,
  setOrder,
  order,
  totalPages,
  totalCount,
}) => {
  const columns: Column[] = [
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
          <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-gray-50">{row.serialNumberBlock}</h5>
        </div>
      ),
    },
    {
      title: <FormattedMessage id="unit-count" />,
      key: 'unitCount',
    },
    {
      title: <FormattedMessage id="marketplace" />,
      key: 'marketplace',
      render: (row: Unit) => {
        const color: string = row.marketplace === 'Tokenized on Chia' ? 'success' : 'info';
        return (
          <div className="flex">
            <Badge color={color} size="sm">
              {row.marketplace}
            </Badge>
          </div>
        );
      },
    },
    {
      title: <FormattedMessage id="marketplace-identifier" />,
      key: 'marketplaceIdentifier',
    },
    {
      title: <FormattedMessage id="marketplace-link" />,
      key: 'marketplaceLink',
      render: (unit: Unit) => (
        <Tooltip content={unit.marketplaceLink}>
          <div style={{ maxWidth: '310px' }}>
            <p className="text-left text-ellipsis w-full overflow-hidden whitespace-nowrap capitalize">
              {unit.marketplaceLink ? unit.marketplaceLink : <FormattedMessage id="not-specified" />}
            </p>
          </div>
        </Tooltip>
      ),
    },
  ];

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
    </>
  );
};

export { TokenizedUnitListTable };
