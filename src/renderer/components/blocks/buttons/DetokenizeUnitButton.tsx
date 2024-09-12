import { FormattedMessage } from 'react-intl';
import {
  Button,
  ConfirmUnitDetokenizationDataModal,
  DetokenizationSuccessModal,
  SubmitDetokenizationFileModal,
} from '@/components';
import React, { useState } from 'react';
import { useUrlHash } from '@/hooks';
import { Unit } from '@/schemas/Unit.schema';

const DetokenizeUnitButton: React.FC = () => {
  const [showSubmitDetokenizationFileModal, setShowSubmitDetokenizationFileModal] = useUrlHash('detokenize');
  const [unitToDetokenizeData, setUnitToDetokenizeData] = useState<Unit | undefined>(undefined);
  const [showDetokenizationSuccessModal, setShowDetokenizationSuccessModal] = useState<boolean>(false);

  const handleDetokenizationFileParseSuccess = (unit: Unit) => {
    setShowSubmitDetokenizationFileModal(false);
    setUnitToDetokenizeData(unit);
  };

  const handleDetokenizationSuccess = () => {
    setUnitToDetokenizeData(undefined);
    setShowDetokenizationSuccessModal(true);
  };

  return (
    <>
      <Button onClick={() => setShowSubmitDetokenizationFileModal(true)}>
        <p className="capitalize">
          <FormattedMessage id="detokenize-unit" />
        </p>
      </Button>
      {showSubmitDetokenizationFileModal && (
        <SubmitDetokenizationFileModal
          onClose={() => setShowSubmitDetokenizationFileModal(false)}
          onDetokenizationParseSuccess={handleDetokenizationFileParseSuccess}
        />
      )}
      {unitToDetokenizeData && (
        <ConfirmUnitDetokenizationDataModal
          onClose={() => setUnitToDetokenizeData(undefined)}
          unitToDetokenize={unitToDetokenizeData}
          onDetokenizationSuccess={handleDetokenizationSuccess}
        />
      )}
      {showDetokenizationSuccessModal && (
        <DetokenizationSuccessModal onClose={() => setShowDetokenizationSuccessModal(false)} />
      )}
    </>
  );
};

export { DetokenizeUnitButton };
