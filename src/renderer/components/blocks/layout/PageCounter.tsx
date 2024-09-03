import React from 'react';
import { RECORDS_PER_PAGE } from '@/api/tokenization-engine';

// Define an interface for the component's props
interface PageCounterProps {
  currentPage: number;
  totalCount: number;
}

/** can be removed if project has no tables */

const PageCounter: React.FC<PageCounterProps> = ({ currentPage, totalCount }) => {
  return (
    <div className="text-sm text-gray-600 dark:text-gray-400">
      Show{' '}
      <span className="font-semibold">
        {(currentPage - 1) * RECORDS_PER_PAGE + 1} -{' '}
        {Math.min((currentPage - 1) * RECORDS_PER_PAGE + RECORDS_PER_PAGE, totalCount)}
      </span>{' '}
      of <span className="font-semibold">{totalCount}</span>
    </div>
  );
};

export { PageCounter };
