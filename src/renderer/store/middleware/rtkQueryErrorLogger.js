import { isRejectedWithValue } from '@reduxjs/toolkit';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = () => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    const requestUrl = action.meta?.arg?.endpointName
      ? `${action.meta.arg.baseQueryMeta?.baseUrl || ''}${action.meta.arg.endpointName}`
      : 'Unknown URL';

    console.warn('We got a rejected action!');
    console.warn({
      title: 'Async error!',
      message: action?.error?.data?.message || JSON.stringify(action),
      endpointInfo: requestUrl,
    });
  }

  return next(action);
};
