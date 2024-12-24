import React from 'react';
import { Button } from '@/components';
import { FormattedMessage } from 'react-intl';

interface AddAddressButtonProps {
  setActive: (active: boolean) => void;
}

const AddAddressButton: React.FC<AddAddressButtonProps> = ({ setActive }) => {
  return (
    <>
      <Button onClick={() => setActive(true)}>
        <p className="capitalize">
          <FormattedMessage id="add-address" />
        </p>
      </Button>
    </>
  );
};

export { AddAddressButton };
