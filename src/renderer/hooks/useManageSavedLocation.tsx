import { useEffect, useState } from 'react';
import { isIframe } from '@/utils/unified-ui-utils';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * MUST be run in a react router context
 * hook to manage loading the last saved location when running as a child application.
 */
const useManageSavedLocation = () => {
  const isCoreRegistryUiChildApp = isIframe();
  const savedUrlString = localStorage.getItem('tokenizationUiLocation');
  const [savedUrlLoaded, setSavedUrlLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  //navigate to the last location saved to local storage
  useEffect(() => {
    if (isCoreRegistryUiChildApp && !savedUrlLoaded && savedUrlString) {
      navigate(savedUrlString, { replace: true });
    }
    setTimeout(() => setSavedUrlLoaded(true), 200);
  }, [isCoreRegistryUiChildApp, navigate, savedUrlLoaded, savedUrlString]);

  // save the current location to local storage for recall when the parent app refreshes
  useEffect(() => {
    if (isCoreRegistryUiChildApp && location && savedUrlLoaded) {
      const reactAppCurrentLocation: string = location.pathname + location.hash + location.search;

      if (reactAppCurrentLocation !== '/' && reactAppCurrentLocation !== savedUrlString) {
        localStorage.setItem('tokenizationUiLocation', reactAppCurrentLocation);
      }
    }
  }, [
    isCoreRegistryUiChildApp,
    location.pathname,
    location.search,
    location.hash,
    savedUrlString,
    location,
    savedUrlLoaded,
  ]);
};

export { useManageSavedLocation };
