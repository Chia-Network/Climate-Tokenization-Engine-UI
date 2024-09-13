import { Unit } from '@/schemas/Unit.schema';
import { Card, InformationDisplayField } from '@/components';
import { useIntl } from 'react-intl';
import React from 'react';

const UnitInformation: React.FC<{ unit: Unit }> = ({ unit }) => {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-4 pb-4">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <InformationDisplayField
            name="projectLocationId"
            label={intl.formatMessage({ id: 'project-location-id' })}
            type="text"
            value={unit.projectLocationId}
          />
          <InformationDisplayField
            name="unitOwner"
            label={intl.formatMessage({ id: 'unit-owner' })}
            type="text"
            value={unit?.unitOwner}
          />
          <InformationDisplayField
            name="unitBlockStart"
            label={intl.formatMessage({ id: 'unit-block-start' })}
            type="text"
            value={unit?.unitBlockStart}
          />
          <InformationDisplayField
            name="unitBlockEnd"
            label={intl.formatMessage({ id: 'unit-block-end' })}
            type="text"
            value={unit?.unitBlockEnd}
          />
          <InformationDisplayField
            name="unitCount"
            label={intl.formatMessage({ id: 'unit-count' })}
            type="number"
            value={unit?.unitCount}
          />
          <InformationDisplayField
            name="countryJurisdictionOfOwner"
            label={intl.formatMessage({ id: 'country-jurisdiction-of-owner' })}
            type="text"
            value={unit?.countryJurisdictionOfOwner}
          />
          <InformationDisplayField
            name="inCountryJurisdictionOfOwner"
            label={intl.formatMessage({ id: 'in-country-jurisdiction-of-owner' })}
            type="text"
            value={unit?.inCountryJurisdictionOfOwner}
          />
          <InformationDisplayField
            name="unitType"
            label={intl.formatMessage({ id: 'unit-type' })}
            type="text"
            value={unit?.unitType}
          />
          <InformationDisplayField
            name="unitStatus"
            label={intl.formatMessage({ id: 'unit-status' })}
            type="text" // Replaced unsupported type 'picklist' with 'text'
            value={unit?.unitStatus}
          />
          <InformationDisplayField
            name="unitStatusReason"
            label={intl.formatMessage({ id: 'unit-status-reason' })}
            type="text"
            value={unit?.unitStatusReason}
          />
          <InformationDisplayField
            name="vintageYear"
            label={intl.formatMessage({ id: 'vintage-year' })}
            type="number"
            value={unit?.vintageYear}
          />
        </div>
        <div>
          <InformationDisplayField
            name="unitRegistryLink"
            label={intl.formatMessage({ id: 'unit-registry-link' })}
            type="link"
            value={unit?.unitRegistryLink}
          />
        </div>
      </Card>
      <Card>
        <InformationDisplayField
          name="marketplaceIdentifier"
          label={intl.formatMessage({ id: 'marketplace-identifier' })}
          type="text"
          value={unit?.marketplaceIdentifier}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <InformationDisplayField
            name="marketplace"
            label={intl.formatMessage({ id: 'marketplace' })}
            type="text"
            value={unit?.marketplace}
          />
          <InformationDisplayField
            name="marketplaceLink"
            label={intl.formatMessage({ id: 'marketplace-link' })}
            type="text"
            value={unit?.marketplaceLink}
          />
          <InformationDisplayField
            name="correspondingAdjustmentStatus"
            label={intl.formatMessage({ id: 'corresponding-adjustment-status' })}
            type="text"
            value={unit?.correspondingAdjustmentStatus}
          />
          <InformationDisplayField
            name="correspondingAdjustmentDeclaration"
            label={intl.formatMessage({ id: 'corresponding-adjustment-declaration' })}
            type="text"
            value={unit?.correspondingAdjustmentDeclaration}
          />
        </div>
      </Card>
      <Card>
        <InformationDisplayField
          name="unitTags"
          label={intl.formatMessage({ id: 'unit-tags' })}
          type="tag"
          value={unit?.unitTags}
        />
      </Card>
    </div>
  );
};

export { UnitInformation };
