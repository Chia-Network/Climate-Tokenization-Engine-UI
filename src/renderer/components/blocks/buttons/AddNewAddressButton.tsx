import React from 'react';
import { Button } from '@/components';
import { FormattedMessage } from 'react-intl';
// import { useUrlHash } from '@/hooks';

interface AddNewAddressButtonProps {
  setActive: (active: boolean) => void;
}

const AddNewAddressButton: React.FC<AddNewAddressButtonProps> = ({ setActive }) => {
  // const [showAddNewAddressModal, setShowAddNewAddressModal] = useUrlHash('add-address');

  return (
    <>
      <Button onClick={() => setActive(true)}>
        <p className="capitalize">
          <FormattedMessage id="add-new-address" />
        </p>
      </Button>
    </>
  );
};

export { AddNewAddressButton };
