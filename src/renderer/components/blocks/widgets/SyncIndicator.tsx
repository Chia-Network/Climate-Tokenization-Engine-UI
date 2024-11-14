import React, { useEffect, useState } from 'react';
import { invalidateProjectApiTag, invalidateUnitsApiTag, useGetHomeOrgQuery } from '@/api';
import { BiRefresh } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { projectsByIdsTag, projectsTag, tokenizedUnitsTag, untokenizedUnitsTag } from '@/api/tokenization-engine';
import { reloadApplication } from '@/utils/unified-ui-utils';

interface SyncIndicatorProps {
  detailed: boolean;
}

/**
 * Displays synchronization indicator and allows a hard refresh when sync status changes.
 * @param detailed Indicates if detailed view is enabled.
 * @returns {JSX.Element} SyncIndicator component.
 */
const SyncIndicator: React.FC<SyncIndicatorProps> = ({ detailed }: SyncIndicatorProps) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data: homeOrg } = useGetHomeOrgQuery(null, {
    pollingInterval: 10000,
  });

  const [isSynced, setIsSynced] = useState(true);
  const [syncRemaining, setSyncRemaining] = useState(0);
  const [prevSyncRemaining, setPrevSyncRemaining] = useState(0);
  const [showRefreshBadge, setShowRefreshBadge] = useState(false);

  useEffect(() => {
    setIsSynced(Boolean(homeOrg?.synced));
    setSyncRemaining(homeOrg?.sync_remaining || 0);

    if (prevSyncRemaining !== syncRemaining && prevSyncRemaining !== 0) {
      setShowRefreshBadge(true);
      dispatch(invalidateProjectApiTag([projectsTag, projectsByIdsTag]));
      dispatch(invalidateUnitsApiTag([untokenizedUnitsTag, tokenizedUnitsTag]));
    }

    setPrevSyncRemaining(syncRemaining);
  }, [location.pathname, dispatch, prevSyncRemaining, homeOrg?.synced, homeOrg?.sync_remaining, syncRemaining]);

  const handleRefreshClick = () => {
    // Trigger hard refresh of the app here
    reloadApplication();
  };

  return (
    <>
      <div
        className={`grid grid-cols-[auto_1fr] items-center gap-x-2 ${detailed ? 'p-2 rounded-lg shadow bg-white dark:bg-gray-800' : ''}`}
      >
        <div className={`${isSynced ? 'bg-green-500' : 'animate-pulse bg-yellow-500'} h-4 w-4 rounded-full`}></div>
        {detailed && (
          <div className="flex flex-col text-left">
            <span className={`text-sm ${isSynced ? 'text-green-700' : 'text-yellow-600'}`}>
              {isSynced ? (
                <p className="capitalize">
                  <FormattedMessage id="synced" />
                </p>
              ) : (
                <p className="capitalize">
                  <FormattedMessage id="syncing" />
                  ...
                </p>
              )}
            </span>
            {!isSynced && (
              <span className="text-xs text-yellow-400">
                {syncRemaining + 1} <FormattedMessage id="remaining" />
              </span>
            )}
          </div>
        )}
      </div>
      {detailed && showRefreshBadge && (
        <button
          onClick={handleRefreshClick}
          className="ml-2 py-2 px-4 bg-orange-200 text-orange-600 border border-orange-400 rounded-lg hover:bg-orange-300 transition duration-150 ease-in-out flex items-center justify-center space-x-2 dark:bg-orange-600 dark:text-orange-200 dark:border-orange-700 dark:hover:bg-orange-700"
        >
          <BiRefresh className="text-orange-600 dark:text-orange-300" />
          <p className="capitalize">
            <FormattedMessage id="refresh" />
          </p>
        </button>
      )}
    </>
  );
};

export { SyncIndicator };
