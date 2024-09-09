import { FormattedMessage } from 'react-intl';
import { Button, DetokenizeUnitModal } from '@/components';
import React from 'react';
import { useUrlHash } from '@/hooks';

const DetokenizeUnitButton: React.FC = () => {
  const [showDetokenizationModal, setShowDetokenizationModal] = useUrlHash('detokenize');

  const onDetokenizationSuccess = () => {};

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
    </>
  );
};

export { DetokenizeUnitButton };
