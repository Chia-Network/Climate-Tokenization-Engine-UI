import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import constants from '../../constants';

// TODO: This is an example on how to use thunk. Remove once is understood
export const getAlbums = createAsyncThunk(
  'application/getAlbums',
  // eslint-disable-next-line no-unused-vars
  async (obj, { dispatch, getState }) => {
    return fetch('https://jsonplaceholder.typicode.com/albums').then((res) => {
      return res.json()
    });
  }
);

const initialState = {
  placeholderValue: 'THIS STRING WAS LOADED FROM THE STORE!',
  showProgressOverlay: false,
  theme: constants.THEME.DARK,
  errorMessage: null,
  locale: null,
  albums: [],
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    activateProgressIndication: (state) => {
      state.showProgressOverlay = true;
    },
    deactivateProgressIndication: (state) => {
      state.showProgressOverlay = false;
    },
    setGlobalErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    clearGlobalErrorMessage: (state) => {
      state.errorMessage = null;
    },
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
    setTheme: (state, action) => {
      if (
        action.payload === constants.THEME.LIGHT ||
        action.payload === constants.THEME.DARK
      ) {
        state.theme = action.payload;
      }
    },
    setThemeFromLocalStorage: (state) => {
      state.theme = localStorage.getItem('theme');
    },
    toggleTheme: (state) => {
      // eslint-disable-next-line
      const theme =
        state.theme === constants.THEME.DARK
          ? constants.THEME.LIGHT
          : constants.THEME.DARK;
      localStorage.setItem('theme', theme);
      state.theme = theme;
    }
  }, extraReducers: {
    [getAlbums.pending]: (state) => {
      state.status = 'loading';
    },
    [getAlbums.fulfilled]: (state, { payload }) => {
      state.albums = payload;
      state.status = 'loading';
    },
    [getAlbums.rejected]: (state) => {
      state.status = 'loading';
    },
  }
});

// Action creators are generated for each case reducer function
export const {
  activateProgressIndication,
  clearGlobalErrorMessage,
  deactivateProgressIndication,
  setGlobalErrorMessage,
  setLocale,
  setTheme,
  setThemeFromLocalStorage,
  toggleTheme,
} = applicationSlice.actions;

export default applicationSlice.reducer;