import { createSlice } from '@reduxjs/toolkit';
import initialState from './app.initialstate';

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLocale: (state, { payload }) => {
      state.locale = payload;
    },
    setHost: (state, { payload }) => {
      state.apiHost = payload.apiHost;

      if (payload.apiKey) {
        state.apiKey = payload.apiKey;
      }
    },
    setConfigFileLoaded: (state, { payload }: { payload: { configFileLoaded: boolean } }) => {
      state.configFileLoaded = payload.configFileLoaded;
    },
    resetApiHost: (state) => {
      state.apiHost = initialState.apiHost;
      state.apiKey = initialState.apiKey;
    },
    toggleThemeMode: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
    setCoreRegistryMode: (state, { payload }: { payload: boolean }) => {
      state.coreRegistryMode = payload;
    },
  },
});

export const { setLocale, setHost, resetApiHost, setConfigFileLoaded, toggleThemeMode, setCoreRegistryMode } =
  appSlice.actions;

export const selectCurrentHost = (state) => state.app.host;

export default appSlice.reducer;
