import { ErrorBoundary } from '@/pages';
import { LeftNav } from './LeftNav';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components';
import { useManageSavedLocation } from '@/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Template = () => {
  const isCoreRegistryUiApp = useSelector((state: RootState) => state.app.isCoreRegistryUiApp);
  useManageSavedLocation();

  return (
    <ErrorBoundary>
      <div id="app" className="dark:bg-gray-800 w-full h-dvh">
        <Header />
        <div id="body" className="w-full h-full flex md:flex-row">
          <LeftNav />
          <div id="content" className="w-full relative dark:text-white">
            <ErrorBoundary>
              <div style={{ height: isCoreRegistryUiApp ? '100vh' : 'calc(100vh - 64px)' }}>
                <Outlet />
              </div>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export { Template };
