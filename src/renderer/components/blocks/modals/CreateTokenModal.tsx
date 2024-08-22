import React from 'react';
import { Button, Modal } from '@/components';
import { FormattedMessage } from 'react-intl';

interface UpsertModalProps {
  urlFragmentDerivedData: string;
  onClose: () => void;
}

const CreateTokenModal: React.FC<UpsertModalProps> = ({ onClose, urlFragmentDerivedData }: UpsertModalProps) => {
  return (
    <Modal onClose={onClose} show={true} size={'8xl'} position="top-center">
      <Modal.Header>
        <FormattedMessage id="create-token" />
      </Modal.Header>
      <Modal.Body>
        <p>sample modal</p>
        <p>{urlFragmentDerivedData}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button>
          <p className="capitalize">
            <FormattedMessage id="create-token" />
          </p>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { CreateTokenModal };