import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import { appReducer } from './reducers';

export default createStore(appReducer, applyMiddleware(ReduxThunk));

export * from './store-functions';
