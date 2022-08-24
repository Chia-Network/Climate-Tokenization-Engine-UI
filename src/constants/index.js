import _ from 'lodash';

const hostName = String(_.get(window, 'location.hostname', ''));

export default {
  // if running locally use localhost api, otherwise use observer node api
  API_HOST:
    _.isEmpty(hostName) || hostName.includes('localhost')
      ? 'http://localhost:31310/v1'
      : 'https://api.climatewarehouse.chia.net/v1',
  HEADER_HEIGHT: 64, // Needed to be used to calculate max height for body components
  THEME: {
    DEFAULT: 'default',
  },
  ROUTES: {
    createTokens: '/create-tokens',
    revertTokens: '/revert-tokens',
    retirements: '/retirements',
    storybook: '/storybook',
  },
};
