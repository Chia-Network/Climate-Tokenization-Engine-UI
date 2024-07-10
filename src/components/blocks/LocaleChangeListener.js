import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLocale } from '../../store/actions/appActions';

const LocaleChangeListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Function to handle the message event
    const handleMessage = event => {
      if (event?.data?.changeLocale) {
        dispatch(setLocale(event?.data?.changeLocale));
      }
    };

    // Add the event listener
    window.addEventListener('message', handleMessage, false);

    // Return a function that will be called when the component unmounts
    return () => {
      // Remove the event listener
      window.removeEventListener('message', handleMessage, false);
    };
  }, []);

  return <></>;
};

export { LocaleChangeListener };
