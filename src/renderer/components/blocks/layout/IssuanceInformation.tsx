import { useIntl } from 'react-intl';
import React from 'react';
import { Issuance } from '@/schemas/Issuance.schema';
import { Card, InformationDisplayField } from '@/components';

const IssuanceInformation: React.FC<{ issuance: Issuance }> = ({ issuance }) => {
  const intl = useIntl();

  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <InformationDisplayField
          name="startDate"
          label={intl.formatMessage({ id: 'start-date' })}
          type="date"
          value={issuance.startDate}
        />
        <InformationDisplayField
          name="endDate"
          label={intl.formatMessage({ id: 'end-date' })}
          type="date"
          value={issuance.endDate}
        />
        <InformationDisplayField
          name="verificationApproach"
          label={intl.formatMessage({ id: 'verification-approach' })}
          type="text"
          value={issuance.verificationApproach}
        />
        <InformationDisplayField
          name="verificationBody"
          label={intl.formatMessage({ id: 'verification-body' })}
          type="text"
          value={issuance.verificationBody || ''}
        />
        <InformationDisplayField
          name="verificationReportDate"
          label={intl.formatMessage({ id: 'verification-report-date' })}
          type="date"
          value={issuance.verificationReportDate || null}
        />
      </div>
    </Card>
  );
};

export { IssuanceInformation };
