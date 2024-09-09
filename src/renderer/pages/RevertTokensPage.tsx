import React from 'react';
import { Card, DetokenizeUnitButton } from '@/components';
import { FormattedMessage } from 'react-intl';

const RevertTokensPage: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-t from-emerald-300 from-10% via-emerald-100 via-40%">
        <Card>
          <h5 className=" capitalize text-xl font-bold tracking-tight text-gray-900 dark:text-white pb-10">
            <FormattedMessage id="revert-unit-tokenization-by-detokenizing-carbon-tokens" />
          </h5>
          <DetokenizeUnitButton />
        </Card>
      </div>
    </>
  );
};

export { RevertTokensPage };
