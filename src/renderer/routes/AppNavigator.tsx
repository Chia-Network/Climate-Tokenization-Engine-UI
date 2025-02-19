import React from 'react';
import { BrowserRouter as Router, Navigate, redirect, Route, Routes } from 'react-router-dom';
import ROUTES from '@/routes/route-constants';
import * as Pages from '@/pages';
import { Template } from '@/components';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const AppNavigator: React.FC = () => {
  const coreRegistryMode: boolean = useSelector((state: RootState) => state.app.coreRegistryMode);
  return (
    <>
      <Router>
        <Routes>
          <Route // remove trailing slash
            path="*(/+)"
            loader={({ params }) => redirect(params['*'] || '/')}
          />
          <Route path="" element={<Template />}>
            <Route path="/" element={<Navigate to={ROUTES.CREATE_TOKENS} />} />
            <Route path={ROUTES.CREATE_TOKENS} element={<Pages.TokensPage />} />
            {!coreRegistryMode && <Route path={ROUTES.REVERT_TOKENS} element={<Pages.RevertTokensPage />} />}
            <Route path={ROUTES.ADDRESS_BOOK} element={<Pages.AddressBookPage />} />
            <Route path="*" element={<Navigate replace to={ROUTES.CREATE_TOKENS} />} />
          </Route>
        </Routes>
        {/* app-wide blocking modals go below this comment*/}
      </Router>
    </>
  );
};

export { AppNavigator };
