import React, { useMemo } from 'react';
import { AddressBookActions, Column, DataTable, PageCounter, Pagination } from '@/components';
import { DebouncedFunc, partial } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { AddressBook } from '@/schemas/AddressBook.schemas';
import { useWildCardUrlHash } from '@/hooks';

interface TableProps {
  data: any;
  isEditable: boolean;
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
  isEditable,
  isLoading,
  currentPage,
  onPageChange,
  onRowClick,
  setOrder,
  order,
  totalPages,
  totalCount,
}) => {
  const [, editAddressModalActive, setEditAddressModalActive] = useWildCardUrlHash('edit-address');

  const columns = useMemo(() => {
    const editColumn: Column[] = [
      {
        title: '',
        key: 'actionColumn',
        ignoreChildEvents: true,
        ignoreOrderChange: true,
        render: (row: AddressBook) => (
          <AddressBookActions uuid={row?.id || ''} openEditModal={partial(setEditAddressModalActive, true)} />
        ),
      },
    ];

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

    return isEditable ? editColumn.concat(staticColumns) : staticColumns;
  }, [isEditable]);

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
      {editAddressModalActive && <div>edit modal most probably</div>}
    </>
  );
};

export { AddressBookTable };
