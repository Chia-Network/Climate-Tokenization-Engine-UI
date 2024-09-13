import { Button, HelperText, IssuanceInformation, LabelInformation, Modal, Tabs, UnitInformation } from '@/components';
import { FormattedMessage } from 'react-intl';
import React, { useState } from 'react';
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import { DetokenizationData, useDetokenizeUnitMutation } from '@/api';

interface UpsertModalProps {
  detokenizationData: DetokenizationData;
  onDetokenizationSuccess: () => void;
  onClose: () => void;
}

const ConfirmUnitDetokenizationDataModal: React.FC<UpsertModalProps> = ({
  detokenizationData,
  onClose,
  onDetokenizationSuccess,
}) => {
  const [triggerDetokenizeUnit, { isLoading: detokenizationLoading, error: detokenizationError }] =
    useDetokenizeUnitMutation();
  const [showTokenizationFailure, setShowTokenizationFailure] = useState<boolean>(false);

  const handleClickConfirmDetokenization = async () => {
    const result = await triggerDetokenizeUnit(detokenizationData);
    if (result?.error || detokenizationError) {
      setShowTokenizationFailure(true);
      return;
    }

    onDetokenizationSuccess();
  };

  const { unit: unitToDetokenize } = detokenizationData;

  return (
    <Modal onClose={onClose} show={true} size={'6xl'}>
      <Modal.Header>
        <p className="capitalize">
          <FormattedMessage id="review-and-confirm-detokenization" />
        </p>
      </Modal.Header>
      {showTokenizationFailure && (
        <div className="w-full border-b p-4 dark:border-gray-600">
          <Alert color="failure" icon={HiInformationCircle} onDismiss={() => setShowTokenizationFailure(false)}>
            <div className="flex space-x-3 items-center">
              <p className="capitalize font-bold text-nowrap">
                <FormattedMessage id="failed-to-detokenize-unit" />:
              </p>
              <p className="sentence-case">
                <FormattedMessage id="an-error-occurred-while-processing-unit-detokenization-data" />
              </p>
            </div>
          </Alert>
        </div>
      )}
      <Modal.Body>
        <Tabs>
          <Tabs.Item
            title={
              <p className="capitalize">
                <FormattedMessage id="unit" />
              </p>
            }
          >
            <div style={{ height: '600px' }}>
              <UnitInformation unit={unitToDetokenize} />
            </div>
          </Tabs.Item>
          {unitToDetokenize?.issuance && (
            <Tabs.Item
              title={
                <p className="capitalize">
                  <FormattedMessage id="issuance" />
                </p>
              }
            >
              <div style={{ height: '600px' }}>
                <IssuanceInformation issuance={unitToDetokenize.issuance} />
              </div>
            </Tabs.Item>
          )}
          {unitToDetokenize?.labels?.length && (
            <Tabs.Item
              title={
                <p className="capitalize">
                  <FormattedMessage id="labels" />
                </p>
              }
            >
              <LabelInformation labels={unitToDetokenize?.labels} />
            </Tabs.Item>
          )}
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => handleClickConfirmDetokenization()}
          disabled={detokenizationLoading}
          isProcessing={detokenizationLoading}
        >
          <p className="capitalize">
            <FormattedMessage id="confirm-detokenization" />
          </p>
        </Button>
        <div className="ml-4 bg-amber-100 rounded-lg pb-1 pl-2 pr-2">
          <HelperText color="warning" className="sentence-case">
            <FormattedMessage id="this-action-cannot-be-undone" />!
          </HelperText>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export { ConfirmUnitDetokenizationDataModal };
