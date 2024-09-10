import React, { useCallback } from 'react';
import { noop } from 'lodash';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { TestContext, ValidationError } from 'yup';
import { FloatingLabel, FormButton, HelperText, Spacer } from '@/components';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

interface FormProps {
  onSubmit: (walletAddress: string) => Promise<void>;
  onClearError?: () => void;
}

const validateWalletAddress = (value: string, context: TestContext, intl: IntlShape): ValidationError | true => {
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
    if (/^txch[a-zA-Z0-9]{60}$/.test(value)) {
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

const CreateTokenForm: React.FC<FormProps> = ({ onSubmit, onClearError = noop }) => {
  const intl: IntlShape = useIntl();

  const validationSchema = yup.object({
    walletAddress: yup
      .string()
      .required(intl.formatMessage({ id: 'wallet-address-is-required' }))
      .test('validate-wallet-address', function (value) {
        return validateWalletAddress(value, this, intl);
      }),
  });

  const handleSubmit = useCallback(
    async (values: { walletAddress: string }, { setSubmitting }) => {
      await onSubmit(values.walletAddress);
      setSubmitting(false);
    },
    [onSubmit],
  );

  const handleChange = useCallback(
    (event, field) => {
      onClearError();
      field.onChange(event); // Call Formik's original onChange
    },
    [onClearError],
  );

  return (
    <Formik initialValues={{ walletAddress: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <div className="mb-4">
            <HelperText className="text-gray-400 sentence-case">
              <FormattedMessage id="carbon-token-recipient" />
            </HelperText>
            <Spacer size={5} />
            <Field name="walletAddress">
              {({ field }) => (
                <FloatingLabel
                  id="walletAddress"
                  disabled={isSubmitting}
                  label={intl.formatMessage({ id: 'wallet-address' })}
                  color={errors.walletAddress && touched.walletAddress && 'error'}
                  variant="outlined"
                  required
                  type="text"
                  {...field}
                  onChange={(event) => handleChange(event, field)}
                />
              )}
            </Field>
            {touched.walletAddress && <ErrorMessage name="walletAddress" component="div" className="text-red-600" />}
          </div>
          <div className="flex gap-4">
            <FormButton isSubmitting={isSubmitting} formikErrors={errors}>
              <p className="capitalize">
                <FormattedMessage id="create-token" />
              </p>
            </FormButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { CreateTokenForm };
