import { Button, HelperText, IssuanceInformation, LabelInformation, Modal, Tabs, UnitInformation } from '@/components';
import { FormattedMessage } from 'react-intl';
import React, { useState } from 'react';
import { Unit } from '@/schemas/Unit.schema';
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

interface UpsertModalProps {
  unitToDetokenize: Unit;
  onDetokenizationSuccess: () => void;
  onClose: () => void;
}

const ConfirmUnitDetokenizationDataModal: React.FC<UpsertModalProps> = ({
  unitToDetokenize,
  onClose,
  onDetokenizationSuccess,
}) => {
  const [showTokenizationFailure, setShowTokenizationFailure] = useState<boolean>(false);
  return (
    <Modal onClose={onClose} show={true} size={'7xl'}>
      <Modal.Header>
        <p className="capitalize">
          <FormattedMessage id="review-and-confirm-detokenization" />
        </p>
      </Modal.Header>
      {showTokenizationFailure && (
        <div className="w-full p-4">
          <Alert color="failure" icon={HiInformationCircle} onDismiss={() => setShowTokenizationFailure(false)}>
            <p className="sentence-case">
              <FormattedMessage id="an-error-occured-while-processing-detokenization-data" />
            </p>
          </Alert>
        </div>
      )}
      <Modal.Body>
        <Tabs>
          <Tabs.Item title={<FormattedMessage id="unit" />}>
            <div style={{ height: '600px' }}>
              <UnitInformation unit={unitToDetokenize} />
            </div>
          </Tabs.Item>
          {unitToDetokenize?.issuance && (
            <Tabs.Item title={<FormattedMessage id="issuance" />}>
              <div style={{ height: '600px' }}>
                <IssuanceInformation issuance={unitToDetokenize.issuance} />
              </div>
            </Tabs.Item>
          )}
          {unitToDetokenize?.labels?.length && (
            <Tabs.Item title={<FormattedMessage id="labels" />}>
              <LabelInformation labels={unitToDetokenize?.labels} />
            </Tabs.Item>
          )}
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onDetokenizationSuccess()}>
          <p className="capitalize">
            <FormattedMessage id="confirm-detokenization" />
          </p>
        </Button>
        <div className="ml-4 bg-amber-100 rounded-lg pb-1 pl-2 pr-2">
          <HelperText color="warning">
            <p className="sentence-case">
              <FormattedMessage id="this-action-cannot-be-undone" />!
            </p>
          </HelperText>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export { ConfirmUnitDetokenizationDataModal };
