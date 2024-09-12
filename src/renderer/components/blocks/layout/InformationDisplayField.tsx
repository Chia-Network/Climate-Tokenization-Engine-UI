import dayjs from 'dayjs';
import { TagInput } from '@/components';
import { Label } from 'flowbite-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';

interface FieldProps {
  name: string;
  label: string;
  type: 'text' | 'tag' | 'date' | 'link' | 'number';
  value: any;
}

const InformationDisplayField: React.FC<FieldProps> = ({ name, label, type, value }) => {
  const renderReadOnlyField = () => {
    if (value === undefined || value === null) {
      return <FormattedMessage id="not-specified" />;
    }

    switch (type) {
      case 'link':
        return (
          <a href={value} target="_blank" rel="noreferrer" className="text-blue-500 break-words">
            {value}
          </a>
        );
      case 'date':
        return `${dayjs(new Date(value)).format('MMMM D, YYYY')}`;
      case 'tag':
        return <TagInput defaultValue={value} onChange={() => {}} readonly={true} />;
      default:
        return <p className="dark:text-white">{value}</p>;
    }
  };
  return (
    <div className="mb-4">
      <Label htmlFor={name}>{label}</Label>
      <div id={name} className="py-2 rounded">
        {renderReadOnlyField()}
      </div>
    </div>
  );
};

export { InformationDisplayField };
