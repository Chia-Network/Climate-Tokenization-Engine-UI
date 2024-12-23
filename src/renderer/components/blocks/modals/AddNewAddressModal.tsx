import { useCreateAddressMutation } from '@/api';
import { AddNewAddressForm, Modal } from '@/components';
import { Alert } from 'flowbite-react';
import React, { useState } from 'react';
import { HiInformationCircle } from 'react-icons/hi';
import { FormattedMessage } from 'react-intl';

interface AddNewAddressModalProps {
  onClose: () => void;
}

const AddNewAddressModal: React.FC<AddNewAddressModalProps> = ({ onClose }) => {
  const [showAddressCreationFailure, setShowAddressCreationFailure] = useState<boolean>(false);
  const [triggerAddressCreation, { error: addressCreationError }] = useCreateAddressMutation();

  const handleSubmitAddNewAddress = async (data: { name: string; walletAddress: string }): Promise<void> => {
    if (data?.name && data?.walletAddress) {
      const result = await triggerAddressCreation({
        name: data.name,
        walletAddress: data.walletAddress,
      });
      if (result?.error || addressCreationError) {
        setShowAddressCreationFailure(true);
      } else {
        onClose();
      }
    } else {
      setShowAddressCreationFailure(true);
    }
  };

  return (
    <Modal onClose={onClose} show={true} size={'2xl'}>
      <Modal.Header>
        <p className="capitalize">
          <FormattedMessage id="add-new-address" />
        </p>
      </Modal.Header>
      <Modal.Body>
        {showAddressCreationFailure && (
          <Alert color="failure" icon={HiInformationCircle} onDismiss={() => setShowAddressCreationFailure(false)}>
            <p className="sentence-case">
              <FormattedMessage id="an-error-occurred-while-trying-to-tokenize" />
            </p>
          </Alert>
        )}
        <AddNewAddressForm onSubmit={handleSubmitAddNewAddress} />
      </Modal.Body>
    </Modal>
  );
};

export { AddNewAddressModal };
