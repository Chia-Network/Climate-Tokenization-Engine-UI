import React, { useCallback, useState } from 'react';
import { useQueryParamState } from '@/hooks';
import { debounce } from 'lodash';
import { SearchBox, SyncIndicator, Tabs, UntokenizedUnitsTab } from '@/components';
import { FormattedMessage } from 'react-intl';

enum TabTypes {
  UNTOKENIZED,
  TOKENIZED,
}

const TokensPage: React.FC = () => {
  const [search, setSearch] = useQueryParamState('search', undefined);
  const [order, setOrder] = useQueryParamState('order', undefined);
  const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.UNTOKENIZED);

  const handleSearchChange = useCallback(
    debounce((event: any) => {
      setSearch(event.target.value);
    }, 800),
    [setSearch, debounce],
  );

  return (
    <>
      <div className="pt-2 pl-2 pr-2 h-full">
        <div className="flex flex-col md:flex-row gap-6 my-2.5 relative z-30 items-center h-auto">
          <SearchBox defaultValue={search} onChange={handleSearchChange} />
          <SyncIndicator detailed={true} />
        </div>
        <div className="h-13">
          <Tabs onActiveTabChange={(tab: TabTypes) => setActiveTab(tab)}>
            <Tabs.Item
              title={
                <p className="capitalize">
                  <FormattedMessage id="untokenized-units" />
                </p>
              }
            />
            <Tabs.Item
              title={
                <p className="capitalize">
                  <FormattedMessage id="tokenized-units" />
                </p>
              }
            />
          </Tabs>
        </div>
        <div id="tabs content">
          {activeTab === TabTypes.UNTOKENIZED && (
            <UntokenizedUnitsTab search={search} order={order} setOrder={setOrder} />
          )}
          {activeTab === TabTypes.TOKENIZED && <p>tokenized units</p>}
        </div>
      </div>
    </>
  );
};

export { TokensPage };
