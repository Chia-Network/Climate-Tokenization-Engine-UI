import _ from 'lodash';

const hostName = String(_.get(window, 'location.hostname', ''));

export default {
  API_HOST: 'http://localhost:31311',
  HEADER_HEIGHT: 64, // Needed to be used to calculate max height for body components,
  TABLE_ROWS: 7,
  THEME: {
    DEFAULT: 'default',
  },
  ROUTES: {
    createTokens: '/create-tokens',
    revertTokens: '/revert-tokens',
    storybook: '/storybook',
  },
};
