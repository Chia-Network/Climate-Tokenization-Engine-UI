import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { setLocale, setThemeFromLocalStorage, getAlbums } from './features/application/appSlice';
import { loadLocaleData } from './translations';

import theme from './theme';

import { IndeterminateProgressOverlay } from './components';

const App = () => {
  const dispatch = useDispatch();
  const appStore = useSelector(state => state.application);
  const [translationTokens, setTranslationTokens] = useState();

  useEffect(() => {
    dispatch(setThemeFromLocalStorage)
  }, [setThemeFromLocalStorage]
  );

  useEffect(
    () => {
      dispatch(getAlbums())
    },
    [getAlbums]
  );

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
    <ThemeProvider theme={theme}>
      <IntlProvider
        locale="en"
        defaultLocale="en"
        messages={translationTokens.default}>
        <>
          <h1>Albums</h1>
          {appStore.albums.map(({ id, title }) => <div key={id}>{`${id} ${title}`}</div>)}
        </>
      </IntlProvider>
    </ThemeProvider>
  );
};

export default App;
