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
    if (!value) {
      return (
        <p className="capitalize">
          <FormattedMessage id="not-specified" />
        </p>
      );
    }

    switch (type) {
      case 'link':
        return (
          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 break-words hover:underline overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400"
          >
            {value}
          </a>
        );
      case 'date':
        return `${dayjs(new Date(value)).format('MMMM D, YYYY')}`;
      case 'tag':
        return <TagInput defaultValue={value} onChange={() => {}} readonly={true} />;
      default:
        return <p className="dark:text-white overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400">{value}</p>;
    }
  };
  return (
    <div className="mb-4 max-w-full">
      <Label htmlFor={name} className="capitalize">
        {label}
      </Label>
      <div id={name} className="p-2 rounded-lg bg-gray-100 max-w-fit">
        {renderReadOnlyField()}
      </div>
    </div>
  );
};

export { InformationDisplayField };
