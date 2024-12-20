import { useCreateAddressMutation } from '@/api';
import { AddNewAddressForm, Modal } from '@/components';
import React from 'react';
import { FormattedMessage } from 'react-intl';

interface AddNewAddressModalProps {
  onClose: () => void;
}

const AddNewAddressModal: React.FC<AddNewAddressModalProps> = ({ onClose }) => {
  const [triggerAddressCreation] = useCreateAddressMutation();

  const handleSubmitAddNewAddress = async (data: { name: string; walletAddress: string }): Promise<void> => {
    triggerAddressCreation({
      name: data.name,
      walletAddress: data.walletAddress,
    });
  };

  return (
    <Modal onClose={onClose} show={true} size={'2xl'}>
      <Modal.Header>
        <p className="capitalize">
          <FormattedMessage id="add-new-address" />
        </p>
      </Modal.Header>
      <Modal.Body>
        <AddNewAddressForm onSubmit={handleSubmitAddNewAddress} />
      </Modal.Body>
    </Modal>
  );
};

export { AddNewAddressModal };
