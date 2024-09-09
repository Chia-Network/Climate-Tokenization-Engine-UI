import React from 'react';
import { DetokenizeUnitForm, DetokFormValues, Modal } from '@/components';
import { FormattedMessage } from 'react-intl';

interface UpsertModalProps {
  onDetokenizationSuccess: () => void;
  onClose: () => void;
}

const DetokenizeUnitModal: React.FC<UpsertModalProps> = ({ onClose, onDetokenizationSuccess }: UpsertModalProps) => {
  onDetokenizationSuccess();

  const handleSubmitDetokenization = async (values: DetokFormValues): Promise<string> => {
    console.log(values.password);
    console.log(values.detokenizationFile?.name);
    return '';
  };

  return (
    <Modal onClose={onClose} show={true} size={'4xl'}>
      <Modal.Header>
        <p className="capitalize">
          <FormattedMessage id="detokenize-unit" />
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className="flex w-full items-center justify-center">
          <DetokenizeUnitForm onSubmit={handleSubmitDetokenization} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { DetokenizeUnitModal };
