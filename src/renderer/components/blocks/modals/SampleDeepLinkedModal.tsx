import React from 'react';
import { Modal } from '@/components';

interface UpsertModalProps {
  urlFragmentDerivedData: string;
  onClose: () => void;
}

const SampleDeepLinkedModal: React.FC<UpsertModalProps> = ({ onClose, urlFragmentDerivedData }: UpsertModalProps) => {
  return (
    <Modal onClose={onClose} show={true} size={'8xl'} position="top-center">
      <Modal.Header>sample modal</Modal.Header>
      <Modal.Body>
        <p>sample modal</p>
        <p>{urlFragmentDerivedData}</p>
      </Modal.Body>
    </Modal>
  );
};

export { SampleDeepLinkedModal };
