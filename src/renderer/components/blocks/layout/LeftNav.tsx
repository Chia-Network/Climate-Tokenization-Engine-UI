import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Card, Sidebar, WarehouseIcon } from '@/components';
import ROUTES from '@/routes/route-constants';

const LeftNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = useCallback((path: string) => location.pathname === path, [location]);

  return (
    <div className="h-full relative bg-white dark:bg-gray-800">
      {/* Original Desktop LeftNav Layout */}
      <div className="h-full hidden md:block">
        <Sidebar aria-label="App Navigation">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Card className="max-w-sm mb-6 shadow-none">
                <div className={'flex space-x-3 justify-center'}>
                  <WarehouseIcon height={24} width={24} />
                  <div>
                    <FormattedMessage id={'warehouse'} />
                  </div>
                </div>
              </Card>
              <Sidebar.Item
                style={{ cursor: 'pointer' }}
                active={isActive(ROUTES.PROJECTS_LIST)}
                onClick={() => navigate(ROUTES.PROJECTS_LIST)}
              >
                <FormattedMessage id="projects-list" />
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </div>
  );
};

export { LeftNav };
