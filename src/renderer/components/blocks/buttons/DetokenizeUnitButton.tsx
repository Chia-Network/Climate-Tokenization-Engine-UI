import { FormattedMessage } from 'react-intl';
import { Button, DetokenizationSuccessModal, DetokenizeUnitModal } from '@/components';
import React, { useState } from 'react';
import { useUrlHash } from '@/hooks';

const DetokenizeUnitButton: React.FC = () => {
  const [showDetokenizationModal, setShowDetokenizationModal] = useUrlHash('detokenize');
  const [showDetokenizationSuccessModal, setShowDetokenizationSuccessModal] = useState<boolean>(true);

  const onDetokenizationSuccess = () => {
    setShowDetokenizationModal(false);
    setShowDetokenizationSuccessModal(true);
  };

  return (
    <>
      <Button onClick={() => setShowDetokenizationModal(true)}>
        <p className="capitalize">
          <FormattedMessage id="detokenize-unit" />
        </p>
      </Button>
      {showDetokenizationModal && (
        <DetokenizeUnitModal
          onClose={() => setShowDetokenizationModal(false)}
          onDetokenizationSuccess={onDetokenizationSuccess}
        />
      )}
      {showDetokenizationSuccessModal && (
        <DetokenizationSuccessModal onClose={() => setShowDetokenizationSuccessModal(false)} />
      )}
    </>
  );
};

export { DetokenizeUnitButton };
