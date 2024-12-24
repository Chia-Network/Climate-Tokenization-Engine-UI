import { useCreateAddressMutation, useEditAddressBookItemMutation, useGetAddressQuery } from '@/api';
import { AddNewAddressForm, ComponentCenteredSpinner, Modal } from '@/components';
import { useUrlHash, useWildCardUrlHash } from '@/hooks';
import { Address } from '@/schemas/AddressBook.schemas';
import { Alert } from 'flowbite-react';
import React, { useMemo, useState } from 'react';
import { HiInformationCircle } from 'react-icons/hi';
import { FormattedMessage } from 'react-intl';

interface AddNewAddressModalProps {
  onClose: () => void;
}

const AddNewAddressModal: React.FC<AddNewAddressModalProps> = ({ onClose }) => {
  const [showAddressCreationFailure, setShowAddressCreationFailure] = useState<boolean>(false);
  const [triggerAddressCreation, { error: addressCreationError }] = useCreateAddressMutation();
  const [triggerAddressUpdate] = useEditAddressBookItemMutation();

  const [createAddressModalActive] = useUrlHash('create-address');
  const [addressUpsertFragment, editAddressModalActive] = useWildCardUrlHash('edit-address');

  const addressId = editAddressModalActive ? addressUpsertFragment?.replace('edit-address-', '') : null;
  const { data: addressData, isLoading: addressLoading } = useGetAddressQuery(
    { id: addressId || '' },
    { skip: !addressId },
  );

  const handleSubmitAddNewAddress = async (data: Address): Promise<void> => {
    console.log('Data Received', data);
    if (data?.name && data?.walletAddress) {
      if (addressId && !data?.id) {
        setShowAddressCreationFailure(true);
        return;
      }
      const result = addressId
        ? await triggerAddressUpdate({ ...data, id: data.id! })
        : await triggerAddressCreation(data);
      if (result?.error || addressCreationError) {
        setShowAddressCreationFailure(true);
      } else {
        onClose();
      }
    } else {
      setShowAddressCreationFailure(true);
    }
  };

  const ModalHeader: React.FC = () => {
    const title: string = useMemo(() => {
      if (createAddressModalActive) {
        return 'create-address';
      } else if (editAddressModalActive) {
        return 'edit-address';
      } else {
        return '';
      }
    }, []);

    return (
      <Modal.Header>
        <FormattedMessage id={title} />
      </Modal.Header>
    );
  };

  if (addressLoading) {
    return (
      <Modal show={true} onClose={onClose}>
        <ModalHeader />
        <Modal.Body>
          <ComponentCenteredSpinner />
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose} show={true} size={'2xl'}>
      <Modal.Header>
        <p className="capitalize">
          <FormattedMessage id={addressId ? 'edit-address' : 'add-new-address'} />
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
        <AddNewAddressForm onSubmit={handleSubmitAddNewAddress} data={addressData} onClose={onClose} />
      </Modal.Body>
    </Modal>
  );
};

export { AddNewAddressModal };
