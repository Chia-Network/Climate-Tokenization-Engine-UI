import React, { Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { setNotificationMessage } from '../store/actions/appActions';
import * as Pages from '../pages';
import {
  createNotification,
  NotificationContainer,
} from '../utils/notificationUtils';
import {
  AppContainer,
  IndeterminateProgressOverlay,
  Dashboard,
  Connect,
} from '../components';
import constants from '../constants';

const AppNavigator = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const { showProgressOverlay, connectionCheck, notification } = useSelector(
    store => store,
  );

  useEffect(() => {
    if (notification) {
      createNotification(
        notification.type,
        intl.formatMessage({ id: notification.id }),
      );
      dispatch(setNotificationMessage(null));
    }
  }, [notification]);

  return (
    <AppContainer>
      {showProgressOverlay && <IndeterminateProgressOverlay />}
      {!connectionCheck && <Connect openModal={true} isHeader={false} />}
      <NotificationContainer />
      <Router>
        <Dashboard>
          <Suspense fallback={<IndeterminateProgressOverlay />}>
            <Routes>
              <Route
                exact
                path="/"
                element={<Navigate to={constants.ROUTES.createTokens} />}
              />
              <Route
                exact
                path=""
                element={<Navigate to={constants.ROUTES.createTokens} />}
              />
              <Route
                path={constants.ROUTES.createTokens}
                element={<Pages.CreateTokens />}
              />
              <Route
                path={constants.ROUTES.revertTokens}
                element={<Pages.RevertTokens />}
              />
              <Route
                path={constants.ROUTES.storybook}
                element={<Pages.StoryBook />}
              />
              <Route
                path="*"
                element={<Navigate to={constants.ROUTES.createTokens} />}
              />
            </Routes>
          </Suspense>
        </Dashboard>
      </Router>
    </AppContainer>
  );
};

export { AppNavigator };
