import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Card, NoHomeOrgModal, Sidebar } from '@/components';
import ROUTES from '@/routes/route-constants';
import { RiTokenSwapLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const LeftNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = useCallback((path: string) => location.pathname === path, [location]);
  const coreRegistryMode: boolean = useSelector((state: RootState) => state.app.coreRegistryMode);
  return (
    <div className="relative h-full bg-white dark:bg-gray-800">
      <div className="hidden h-full md:block">
        <Sidebar aria-label="App Navigation">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Card className="max-w-sm mb-6 shadow-none">
                <div className={'flex space-x-3 justify-center'}>
                  <RiTokenSwapLine size={24} />
                  <p className="capitalize">
                    <FormattedMessage id={'tokenization'} />
                  </p>
                </div>
              </Card>
              <Sidebar.Item
                style={{ cursor: 'pointer' }}
                active={isActive(ROUTES.CREATE_TOKENS)}
                onClick={() => !isActive(ROUTES.CREATE_TOKENS) && navigate(ROUTES.CREATE_TOKENS)}
              >
                <p className="capitalize">
                  <FormattedMessage id="create-tokens" />
                </p>
              </Sidebar.Item>
              {!coreRegistryMode && (
                <Sidebar.Item
                  style={{ cursor: 'pointer' }}
                  active={isActive(ROUTES.REVERT_TOKENS)}
                  onClick={() => !isActive(ROUTES.REVERT_TOKENS) && navigate(ROUTES.REVERT_TOKENS)}
                >
                  <p className="capitalize">
                    <FormattedMessage id="revert-tokens" />
                  </p>
                </Sidebar.Item>
              )}
              <Sidebar.Item
                style={{ cursor: 'pointer' }}
                active={isActive(ROUTES.ADDRESS_BOOK)}
                onClick={() => !isActive(ROUTES.ADDRESS_BOOK) && navigate(ROUTES.ADDRESS_BOOK)}
              >
                <p className="capitalize">
                  <FormattedMessage id="address-book" />
                </p>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
      {/* app-wide modals */}
      <NoHomeOrgModal />
    </div>
  );
};

export { LeftNav };
