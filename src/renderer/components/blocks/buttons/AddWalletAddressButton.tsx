import React from 'react';
import { Button } from '@/components';
import { FormattedMessage } from 'react-intl';

interface AddWalletAddressButtonProps {
  setActive: (active: boolean) => void;
}

const AddWalletAddressButton: React.FC<AddWalletAddressButtonProps> = ({ setActive }) => {
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

export { AddWalletAddressButton };
