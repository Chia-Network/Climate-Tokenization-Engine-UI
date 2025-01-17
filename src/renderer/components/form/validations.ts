import { TestContext, ValidationError } from 'yup';
import { IntlShape } from 'react-intl';

export const validateWalletAddress = (value: string, context: TestContext, intl: IntlShape): ValidationError | true => {
  console.log('!!!!!!!!', value);

  if (!value) return true; // If empty, required will handle it

  if (value.startsWith('xch')) {
    if (/^xch[a-zA-Z0-9]{59}$/.test(value)) {
      return true;
    } else {
      return context.createError({
        message: intl.formatMessage({
          id: 'wallet-addresses-start-with-xch-and-are-62-characters-long',
        }),
      });
    }
  } else if (value.startsWith('txch')) {
    if (/^txch[a-zA-Z0-9]{59}$/.test(value)) {
      return true;
    } else {
      return context.createError({
        message: intl.formatMessage({
          id: 'testnet-wallet-addresses-start-with-txch-and-are-63-characters-long',
        }),
      });
    }
  } else {
    return context.createError({
      message: intl.formatMessage({
        id: 'wallet-address-must-start-with-xch-or-txch',
      }),
    });
  }
};
