import { Modal } from '@/components';
import { FormattedMessage } from 'react-intl';
import React from 'react';

const DetokenizationSuccessModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <Modal show={true} onClose={onClose}>
      <Modal.Header>
        <p className="capitalize">
          <FormattedMessage id="unit-detokenization-success" />
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-2.5">
          <p className="sentence-case">
            <FormattedMessage id="the-unit-has-been-successfully-submitted-for-detokenization" />.
          </p>
          <p className="sentence-case">
            <FormattedMessage id="this-process-will-take-a-few-minutes" />.
          </p>
          <p className="sentence-case">
            <FormattedMessage id="please-check-your-wallet-for-transactions-and-refresh-this-page-when-a-new-transaction-is-confirmed" />
            .
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { DetokenizationSuccessModal };
