import React from 'react';
import { AddNewAddressModal, Button } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useUrlHash } from '@/hooks';

const AddNewAddressButton: React.FC = () => {
  const [showAddNewAddressModal, setShowAddNewAddressModal] = useUrlHash('addAddress');

  return (
    <>
      <Button onClick={() => setShowAddNewAddressModal(true)}>
        <p className="capitalize">
          <FormattedMessage id="add-new" />
        </p>
      </Button>
      {showAddNewAddressModal && <AddNewAddressModal onClose={() => setShowAddNewAddressModal(false)} />}
    </>
  );
};

export { AddNewAddressButton };
