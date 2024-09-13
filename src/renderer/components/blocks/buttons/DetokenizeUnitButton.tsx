import { FormattedMessage } from 'react-intl';
import {
  Button,
  ConfirmUnitDetokenizationDataModal,
  DetokenizationSuccessModal,
  SubmitDetokenizationFileModal,
} from '@/components';
import React, { useState } from 'react';
import { useUrlHash } from '@/hooks';
import { DetokenizationData } from '@/api';

/*
const testData = {
  warehouseUnitId: '1368448a-d42d-4ee8-88d0-cebdfeb8691b',
  projectLocationId: null,
  orgUid: 'd0d44320ef2ffb86b06429cb290251936607c5b89fd608328806e67c4e2b21fd',
  unitOwner: null,
  countryJurisdictionOfOwner: 'Hungary',
  inCountryJurisdictionOfOwner: null,
  serialNumberBlock: 'abc-10347040-10347143',
  unitBlockStart: '10347040',
  unitBlockEnd: '10347143',
  unitCount: 104000,
  vintageYear: 2070,
  unitType: 'Removal - nature',
  marketplace: 'Tokenized on Chia',
  marketplaceLink: null,
  marketplaceIdentifier: '0x5bab39a780930096ce4ae3c529fbfe395b9b40790825fa069dee6a8e07f70fa1',
  unitTags: null,
  unitStatus: 'Buffer',
  unitStatusReason: null,
  unitRegistryLink: 'http://daflghasdhgasdvnc4234.org',
  correspondingAdjustmentDeclaration: 'Not Required',
  correspondingAdjustmentStatus: 'Not Started',
  labels: [],
  issuance: {
    id: '25a29d72-365d-4335-ab81-71fbeda8c89d',
    orgUid: 'd0d44320ef2ffb86b06429cb290251936607c5b89fd608328806e67c4e2b21fd',
    warehouseProjectId: '3895b9d6-0240-437b-b7eb-1cc3a04c6763',
    startDate: new Date('2024-08-13T00:00:00.000Z'),
    endDate: new Date('2024-08-20T00:00:00.000Z'),
    verificationApproach: 'fasgasgd',
    verificationReportDate: new Date('2024-08-21T00:00:00.000Z'),
    verificationBody: 'Asociación de Normalización y Certificación, A.C.',
    timeStaged: null,
    createdAt: new Date('2024-08-26T20:06:35.672Z'),
    updatedAt: new Date('2024-08-26T20:06:35.672Z'),
  },
};
*/

const DetokenizeUnitButton: React.FC = () => {
  const [showSubmitDetokenizationFileModal, setShowSubmitDetokenizationFileModal] = useUrlHash('detokenize');
  const [unitToDetokenizeData, setUnitToDetokenizeData] = useState<DetokenizationData | undefined>(undefined);
  const [showDetokenizationSuccessModal, setShowDetokenizationSuccessModal] = useState<boolean>(false);

  const handleDetokenizationFileParseSuccess = (detokenizationData: DetokenizationData) => {
    setShowSubmitDetokenizationFileModal(false);
    setUnitToDetokenizeData(detokenizationData);
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
          detokenizationData={unitToDetokenizeData}
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
