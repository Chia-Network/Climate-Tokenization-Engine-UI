import { configureStore } from '@reduxjs/toolkit'

import { reduxBatch } from '@manaflair/redux-batch'

import appReducer from '../features/application/appSlice';

const reducer = {
  application: appReducer,
}

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [reduxBatch],
});

export default store;

// The store has been created with these options:
// - The slice reducers were automatically passed to combineReducers()
// - The Redux DevTools Extension is disabled for production
// - The middleware, batch, and devtools enhancers were composed together