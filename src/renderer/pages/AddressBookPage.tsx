import React, { useCallback } from 'react';
import { AddressBookTable, SkeletonTable } from '@/components';
import { useGetAddressBookQuery } from '@/api';
import { useColumnOrderHandler, useQueryParamState } from '@/hooks';
import { FormattedMessage } from 'react-intl';
import { debounce } from 'lodash';
import { RECORDS_PER_PAGE } from '../api/tokenization-engine/index';

const AddressBookPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useQueryParamState('page', '1');
  const [order, setOrder] = useQueryParamState('order', undefined);
  const handleSetOrder = useColumnOrderHandler(order, setOrder);

  const {
    data: addressBookResponse,
    isFetching: addressBookLoading,
    error: addressBookError,
  } = useGetAddressBookQuery({ page: Number(currentPage), order, limit: RECORDS_PER_PAGE });

  const handlePageChange = useCallback(
    debounce((page) => setCurrentPage(page), 800),
    [setCurrentPage],
  );

  if (addressBookLoading) {
    return <SkeletonTable />;
  }

  if (addressBookError) {
    return <FormattedMessage id={'unable-to-load-contents'} />;
  }

  if (!addressBookResponse) {
    return <FormattedMessage id={'no-records-found'} />;
  }

  return (
    <>
      <div className="h-full pt-2 pl-2 pr-2">
        <AddressBookTable
          isEditable={true}
          data={addressBookResponse.data || []}
          isLoading={addressBookLoading}
          currentPage={Number(currentPage)}
          onPageChange={handlePageChange}
          setOrder={handleSetOrder}
          order={order}
          totalPages={addressBookResponse.pageCount}
          totalCount={
            addressBookResponse.pageCount < 10 ? addressBookResponse.data.length : addressBookResponse.pageCount * 10
          }
        />
      </div>
    </>
  );
};

export { AddressBookPage };
