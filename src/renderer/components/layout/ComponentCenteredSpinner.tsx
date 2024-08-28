import React, { ReactNode } from 'react';
import { Spinner } from '@/components';

interface ComponentCenteredSpinnerProps {
  label?: string | ReactNode;
}

const ComponentCenteredSpinner: React.FC<ComponentCenteredSpinnerProps> = ({ label }) => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Spinner />
      {label && (
        <div className="ml-4">
          <p className="sentence-case">{label}</p>
        </div>
      )}
    </div>
  );
};

export { ComponentCenteredSpinner };
