import React, { useMemo } from 'react';
import {
  AddAddressButton,
  AddressBookActions,
  Column,
  DataTable,
  PageCounter,
  Pagination,
  UpsertAddressModal,
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
        title: <FormattedMessage id="project-developer" />,
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
      <AddAddressButton setActive={setCreateAddressModalActive} />
      <DataTable
        columns={columns}
        data={data}
        onChangeOrder={setOrder}
        onRowClick={onRowClick}
        order={order}
        primaryKey="id"
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
      {(createAddressModalActive || editAddressModalActive) && <UpsertAddressModal onClose={handleCloseUpsertModal} />}
    </>
  );
};

export { AddressBookTable };
