import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Define a TypeScript interface for the function's return type
interface QueryParamState<T> {
  (name: string, defaultValue?: T): [T, (value: T) => void];
}

// Convert the JavaScript function to TypeScript, specifying types for parameters and return values
const useQueryParamState: QueryParamState<string> = (name, defaultValue = '') => {
  const [param, setParam] = useState<string>();
  const location = useLocation();

  const setQueryStringParameter = useCallback(
    (value?: string) => {
      const params = new URLSearchParams(window.location.search || window.location.hash.replace(/#.*\?/, ''));

      if (_.isNil(value) || value === '') {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      const newPath = params.toString() ? `${window.location.pathname}?${params}` : window.location.pathname;

      window.history.pushState({}, '', decodeURIComponent(`${newPath}${window.location.hash}`));
      setParam(value);

      // Trigger a popstate event so React Router updates the location
      window.dispatchEvent(new PopStateEvent('popstate'));
    },
    [name, location],
  );

  const value = useMemo(() => {
    const params = new URLSearchParams(window.location.search || window.location.hash.replace(/#.*\?/, ''));
    return params.get(name) || defaultValue;
  }, [name, location, param, defaultValue]);

  // Ensure default value is set in URL on initial mount if it's missing
  useEffect(() => {
    setTimeout(() => {
      // delay setting the default value to give the last saved location time to load if needed
      const params = new URLSearchParams(window.location.search || window.location.hash.replace(/#.*\?/, ''));
      if (!params.has(name) && defaultValue) {
        setQueryStringParameter(defaultValue);
      }
    }, 300);
  }, [name, defaultValue, setQueryStringParameter]);

  return [value, setQueryStringParameter];
};

export { useQueryParamState };
