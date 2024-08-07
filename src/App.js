import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import {
  setCustomTheme,
  setLocale,
  setThemeFromLocalStorage,
} from './store/actions/appActions';

import { loadLocaleData } from './translations';
import { AppNavigator } from './navigation';

import { IndeterminateProgressOverlay } from './components';
import { LocaleChangeListener } from './components/blocks/LocaleChangeListener';

const App = () => {
  const dispatch = useDispatch();
  const appStore = useSelector(state => state);
  const [translationTokens, setTranslationTokens] = useState();

  function notifyParentWhenAppLoaded() {
    window.parent.postMessage('appLoaded', window.location.origin);
  }

  useEffect(() => {
    const handleMessage = event => {
      if (event.data.customThemeColors) {
        dispatch(setCustomTheme(event.data.customThemeColors));
      }
    };

    notifyParentWhenAppLoaded();

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    dispatch(setThemeFromLocalStorage);
  }, [setThemeFromLocalStorage]);

  useEffect(() => {
    if (appStore.locale) {
      const processTranslationTokens = async () => {
        setTranslationTokens(await loadLocaleData(appStore.locale));
      };

      processTranslationTokens();
    } else {
      dispatch(setLocale(navigator.language));
    }
  }, [appStore.locale]);

  if (!translationTokens) {
    return <IndeterminateProgressOverlay />;
  }

  return (
    <ThemeProvider theme={appStore.customTheme}>
      <IntlProvider
        locale="en"
        defaultLocale="en"
        messages={translationTokens.default}
      >
        <LocaleChangeListener />
        <AppNavigator />
      </IntlProvider>
    </ThemeProvider>
  );
};

export default App;
