import React, { useMemo } from 'react';
import { Column, DataTable, PageCounter, Pagination } from '@/components';
import { DebouncedFunc } from 'lodash';
import { FormattedMessage } from 'react-intl';

interface TableProps {
  data: any;
  isLoading: boolean;
  currentPage: number;
  onPageChange: DebouncedFunc<(page: any) => void>;
  setOrder?: (sort: string) => void;
  onRowClick?: (row: any) => void;
  order?: string;
  totalPages: number;
  totalCount: number;
}

const AddressBookTable: React.FC<TableProps> = ({
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
  const columns = useMemo(() => {
    const staticColumns: Column[] = [
      {
        title: <FormattedMessage id="name" />,
        key: 'name',
      },
      {
        title: <FormattedMessage id="wallet-address" />,
        key: 'walletAddress',
      },
    ];

    return staticColumns;
  }, []);

  return (
    <>
      <DataTable
        columns={columns}
        onChangeOrder={setOrder}
        onRowClick={onRowClick}
        order={order}
        data={data}
        primaryKey="addressBookId"
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

export { AddressBookTable };
