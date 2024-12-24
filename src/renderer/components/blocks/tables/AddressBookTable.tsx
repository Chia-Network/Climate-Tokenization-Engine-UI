import React, { useEffect, useMemo } from 'react';
import {
  AddNewAddressButton,
  AddNewAddressModal,
  AddressBookActions,
  Column,
  DataTable,
  PageCounter,
  Pagination,
} from '@/components';
import { DebouncedFunc, partial } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Address } from '@/schemas/AddressBook.schemas';
import { useUrlHash, useWildCardUrlHash } from '@/hooks';

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
  const [createAddressModalActive, setCreateAddressModalActive] = useUrlHash('create-address');

  const handleCloseUpsertModal = () => {
    setEditAddressModalActive(false);
    setCreateAddressModalActive(false);
  };

  const columns = useMemo(() => {
    const editColumn: Column[] = [
      {
        title: '',
        key: 'actionColumn',
        ignoreChildEvents: true,
        ignoreOrderChange: true,
        render: (row: Address) => (
          <AddressBookActions addressId={row?.id || ''} openEditModal={partial(setEditAddressModalActive, true)} />
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

  useEffect(() => console.log(createAddressModalActive), [createAddressModalActive]);

  return (
    <>
      <AddNewAddressButton setActive={setCreateAddressModalActive} />
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
      {(createAddressModalActive || editAddressModalActive) && <AddNewAddressModal onClose={handleCloseUpsertModal} />}
    </>
  );
};

export { AddressBookTable };
