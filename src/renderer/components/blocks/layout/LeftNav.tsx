import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Card, Sidebar } from '@/components';
import ROUTES from '@/routes/route-constants';
import { RiTokenSwapLine } from 'react-icons/ri';
import { NoHomeOrgModal } from '@/components/blocks/modals/NoHomeOrgModal';

const LeftNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = useCallback((path: string) => location.pathname === path, [location]);

  return (
    <div className="h-full relative bg-white dark:bg-gray-800">
      <div className="h-full hidden md:block">
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
                onClick={() => navigate(ROUTES.CREATE_TOKENS)}
              >
                <p className="capitalize">
                  <FormattedMessage id="create-tokens" />
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
