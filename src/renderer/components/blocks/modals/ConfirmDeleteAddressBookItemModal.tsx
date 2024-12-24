import React from 'react';
import { Button, Modal } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useDeleteAddressBookItemMutation } from '@/api';

interface ConfirmDeleteModalProps {
  uuid: string;
  onClose: () => void;
}

const ConfirmDeleteAddressBookItemModal: React.FC<ConfirmDeleteModalProps> = ({
  uuid,
  onClose,
}: ConfirmDeleteModalProps) => {
  const [triggerDeleteAddressBookItem, { isLoading: addressBookItemDeletionLoading }] =
    useDeleteAddressBookItemMutation();

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

export { ConfirmDeleteAddressBookItemModal };
