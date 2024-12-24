import React from 'react';
import { Button, Modal } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useDeleteAddressMutation } from '@/api';

interface ConfirmDeleteModalProps {
  addressId: string;
  onClose: () => void;
}

const ConfirmDeleteAddressModal: React.FC<ConfirmDeleteModalProps> = ({
  addressId,
  onClose,
}: ConfirmDeleteModalProps) => {
  const [triggerDeleteAddress, { isLoading: deleteAddressLoading }] = useDeleteAddressMutation();

  const handleConfirm = async () => {
    await triggerDeleteAddress({ uuid: addressId });
    onClose();
  };

  const handleClickClose = async () => {
    onClose();
  };

  return (
    <Modal show={true} onClose={onClose}>
      <Modal.Header>
        <p className="capitalize">
          <FormattedMessage id="confirm-delete" />
        </p>
      </Modal.Header>
      <Modal.Body>
        <p className="sentence-case">
          <FormattedMessage id="are-you-sure-you-want-to-delete-this-address" />
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={handleClickClose} disabled={deleteAddressLoading}>
          <p className="sentence-case">
            <FormattedMessage id="cancel" />
          </p>
        </Button>
        <Button onClick={handleConfirm} isProcessing={deleteAddressLoading} disabled={deleteAddressLoading}>
          <p className="sentence-case">
            <FormattedMessage id="delete" />
          </p>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { ConfirmDeleteAddressModal };
