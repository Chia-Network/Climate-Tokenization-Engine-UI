import _ from 'lodash';

import React, {useEffect, useState, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MiniSearch from 'minisearch';
import {useIntl} from 'react-intl';

import constants from '../../constants';
import {Card, DataTable, SearchInputField} from '../../components';
import {getRetiredTokens} from '../../store/actions/tokens';

const miniSearch = new MiniSearch({
  fields: [
    'id',
    'name',
    'asset_name',
    'public_key',
    'value',
    'block_height',
    'created_at',
    'notified_at',
  ],
  extractField: (document, fieldName) => {
    if (fieldName === 'id') {
      return document['block_height'];
    }
    return document[fieldName];
  },
  searchOptions: {
    processTerm: term => term.toLowerCase(),
    boost: {name: 2},
    fuzzy: 0,
  },
});

const Home = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const tokenStore = useSelector(state => state.tokens);
  const [search, setSearch] = useState();

  useEffect(
    () => dispatch(getRetiredTokens({useMockedResponse: false})),
    [dispatch],
  );

  useEffect(() => {
    if (tokenStore.retiredTokens) {
      miniSearch.addAll(tokenStore.retiredTokens);
    }
  }, [tokenStore.retiredTokens]);

  const tokenResultsPages = useMemo(() => {
    if (!tokenStore.retiredTokens) {
      return undefined;
    }

    if (!search || search.length === 0) {
      // Chunk the tokenResults into pages for pagination
      return _.chunk(tokenStore.retiredTokens, constants.MAX_TABLE_SIZE);
    }

    // Chunk the tokenResults into pages for pagination
    return _.chunk(
      // sort by search score if search term is used
      _.sortBy(
        tokenStore.retiredTokens.filter(token =>
          search.includes(token.coin_id),
        ),
        item => search.indexOf(item.coin_id),
      ),
      constants.MAX_TABLE_SIZE,
    );
  }, [tokenStore.retiredTokens, search]);

  const handleSearchInputChange = event => {
    const search = miniSearch.search(event.target.value, {prefix: true});
    setSearch(search.sort(result => result.score).map(result => result.id));
  };

  if (!tokenResultsPages) {
    return null;
  }

  return (
    <>
      <Card>
        <SearchInputField onChange={handleSearchInputChange} />
      </Card>
      <Card
        maxHeight={
          /* window - header - search container */
          `calc(100% - ${constants.HEADER_HEIGHT}px - 135px)`
        }>
        <DataTable
          headings={[
            intl.formatMessage({id: 'block-height'}),
            intl.formatMessage({id: 'value'}),
            intl.formatMessage({id: 'asset-name'}),
            intl.formatMessage({id: 'name'}),
            intl.formatMessage({id: 'public-key'}),
            intl.formatMessage({id: 'created-at'}),
            intl.formatMessage({id: 'notified-at'}),
          ]}
          data={tokenResultsPages}
        />
      </Card>
    </>
  );
};

export {Home};
