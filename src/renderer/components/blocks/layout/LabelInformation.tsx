import { useIntl } from 'react-intl';
import React from 'react';
import { Label } from '@/schemas/Label.schema';
import { InformationDisplayField, Repeater } from '@/components';

const LabelInformation: React.FC<{ labels: Label[] }> = ({ labels }) => {
  const intl = useIntl();

  return (
    <Repeater<Label>
      name="labels"
      maxNumber={100}
      minNumber={0}
      initialValue={labels}
      itemTemplate={{
        label: null,
        labelType: null,
        labelLink: null,
        validityPeriodStartDate: null,
        validityPeriodEndDate: null,
        creditingPeriodStartDate: null,
        creditingPeriodEndDate: null,
        unitQuantity: null,
      }}
    >
      {(label: Label, index: number, name: string) => (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <InformationDisplayField
              name={`${name}[${index}].label`}
              label={intl.formatMessage({ id: 'label' })}
              type="text"
              value={label.label}
            />
            <InformationDisplayField
              name={`${name}[${index}].labelType`}
              label={intl.formatMessage({ id: 'label-type' })}
              type="text" // Replaced unsupported type 'picklist' with 'text'
              value={label.labelType}
            />
            <InformationDisplayField
              name={`${name}[${index}].labelLink`}
              label={intl.formatMessage({ id: 'label-link' })}
              type="link"
              value={label.labelLink}
            />
            <InformationDisplayField
              name={`${name}[${index}].validityPeriodStartDate`}
              label={intl.formatMessage({ id: 'validity-period-start-date' })}
              type="date"
              value={label.validityPeriodStartDate}
            />
            <InformationDisplayField
              name={`${name}[${index}].validityPeriodEndDate`}
              label={intl.formatMessage({ id: 'validity-period-end-date' })}
              type="date"
              value={label.validityPeriodEndDate}
            />
            <InformationDisplayField
              name={`${name}[${index}].creditingPeriodStartDate`}
              label={intl.formatMessage({ id: 'crediting-period-start-date' })}
              type="date"
              value={label.creditingPeriodStartDate}
            />
            <InformationDisplayField
              name={`${name}[${index}].creditingPeriodEndDate`}
              label={intl.formatMessage({ id: 'crediting-period-end-date' })}
              type="date"
              value={label.creditingPeriodEndDate}
            />
            <InformationDisplayField
              name={`${name}[${index}].unitQuantity`}
              label={intl.formatMessage({ id: 'unit-quantity' })}
              type="number"
              value={label.unitQuantity}
            />
          </div>
        </>
      )}
    </Repeater>
  );
};

export { LabelInformation };
