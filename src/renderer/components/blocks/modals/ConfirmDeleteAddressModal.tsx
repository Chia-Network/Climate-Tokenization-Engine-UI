import React from 'react';
import { Button, Modal } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useDeleteAddressMutation } from '@/api';

interface ConfirmDeleteModalProps {
  uuid: string;
  onClose: () => void;
}

const ConfirmDeleteAddressModal: React.FC<ConfirmDeleteModalProps> = ({ uuid, onClose }: ConfirmDeleteModalProps) => {
  const [triggerDeleteAddressBookItem, { isLoading: addressBookItemDeletionLoading }] = useDeleteAddressMutation();

  const handleConfirm = async () => {
    await triggerDeleteAddressBookItem({ uuid });
    onClose();
  };

  const handleClickClose = async () => {
    onClose();
  };

  return (
    <Modal show={true} onClose={onClose}>
      <Modal.Header>
        <FormattedMessage id="confirm-delete" />
      </Modal.Header>
      <Modal.Body>
        <p>
          <FormattedMessage id="are-you-sure-you-want-to-delete-this-address" />.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={handleClickClose} disabled={addressBookItemDeletionLoading}>
          <FormattedMessage id="cancel" />
        </Button>
        <Button
          onClick={handleConfirm}
          isProcessing={addressBookItemDeletionLoading}
          disabled={addressBookItemDeletionLoading}
        >
          <FormattedMessage id="delete" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { ConfirmDeleteAddressModal };
