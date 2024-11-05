import ROUTES from '@/routes/route-constants';

/*
  this app can be run as a child application of the unified 'core-registry-ui' application
  these functions provide functionality for managing app behavior when run as a child app
  see https://github.com/Chia-Network/core-registry-ui
 */

export interface ParentSettings {
  colors?: any;
  selectedLanguageCode?: string;
  apiHost?: string;
  apiKey?: string;
}

export const isIframe = () => {
  return window.self !== window.top;
};

export const notifyParentOfAppLoad = () => {
  // this child app and the parent should have the same origin
  window.parent.postMessage('childAppLoaded', window.location.origin);
};

export const getParentSettings = (): ParentSettings => {
  // local storage keys set as constants in parent app
  const colorsFromStorage = localStorage.getItem('themeColors');
  const selectedLanguageCode = localStorage.getItem('selectedLanguageCode');
  const apiHost = localStorage.getItem('cadtApiHost');
  const apiKey = localStorage.getItem('cadtApiKey');

  try {
    return {
      colors: colorsFromStorage ? JSON.parse(colorsFromStorage) : undefined,
      selectedLanguageCode: selectedLanguageCode || undefined,
      apiHost: apiHost || undefined,
      apiKey: apiKey || undefined,
    };
  } catch {
    console.error('error retrieving settings from parent local storage');
    return {};
  }
};

/**
 * this should be called instead of window.location.reload() in all cases.
 * window.location.reload() when running as a child app will cause problems
 */
export const reloadApplication = () => {
  if (isIframe()) {
    window.parent.postMessage('reload', window.location.origin);
  } else {
    window.location.reload();
  }
};

/**
 * to be run prior to the react app routing context loading. if the url is populated with an app location,
 * query parameters, or a hash, then the user likely entered a deeplinked URL.
 *
 * this function determines if the location entered by the user was intentional or if this was a parent app refresh,
 * which tells the app whether the last saved location should be loaded or not.
 *
 * if the app is stand-alone application, there should not be a saved location. it will always be cleared.
 */
export const reconcileSavedUrl = () => {
  const lastSavedLocation = localStorage.getItem('tokenizationUiLocation');

  if (!isIframe()) {
    if (lastSavedLocation) {
      localStorage.removeItem('tokenizationUiLocation');
    }
    return;
  }

  const url = new URL(window.location.href);
  const possibleAppRoute = '/' + url.pathname.split('/').pop();
  const urlHasAppRoute = Object.keys(ROUTES)
    .map((routeKey) => ROUTES[routeKey])
    .includes(possibleAppRoute);

  const clearLastSavedLocation = urlHasAppRoute || url.hash || url.search;
  if (lastSavedLocation && clearLastSavedLocation) {
    localStorage.removeItem('tokenizationUiLocation');
  }
};
