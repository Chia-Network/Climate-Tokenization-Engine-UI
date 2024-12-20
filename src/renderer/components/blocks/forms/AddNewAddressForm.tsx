import React, { useCallback } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Button, FloatingLabel, FormButton } from '@/components';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import * as yup from 'yup';
import { TestContext, ValidationError } from 'yup';
import { noop } from 'lodash';

interface FormProps {
  onSubmit: (values: AddNewAddressFormValues) => Promise<void>;
  onClearError?: () => void;
}

export interface AddNewAddressFormValues {
  name: string;
  walletAddress: string;
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

const AddNewAddressForm: React.FC<FormProps> = ({ onSubmit, onClearError = noop }) => {
  const intl = useIntl();

  const validationSchema = yup.object({
    walletAddress: yup
      .string()
      .required(intl.formatMessage({ id: 'wallet-address-is-required' }))
      .test('validate-wallet-address', function (value) {
        return validateWalletAddress(value, this, intl);
      }),
  });

  const handleSubmit = useCallback(
    async (values: AddNewAddressFormValues, { setSubmitting }: FormikHelpers<AddNewAddressFormValues>) => {
      try {
        console.log('values');
        await onSubmit(values);
      } finally {
        setSubmitting(false);
      }
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
    <Formik<AddNewAddressFormValues>
      initialValues={{
        name: '',
        walletAddress: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="w-full">
          <div className="mb-4">
            <Field name="name">
              {({ field }) => (
                <FloatingLabel
                  id="name"
                  label={intl.formatMessage({ id: 'name' })}
                  color={errors.name && touched.name ? 'error' : undefined}
                  variant="outlined"
                  required
                  type="text"
                  {...field}
                  className="capitalize"
                />
              )}
            </Field>
            {touched.name && <ErrorMessage name="name" component="div" className="text-red-600" />}
          </div>
          <div className="mb-4">
            <Field name="walletAddress">
              {({ field }) => (
                <FloatingLabel
                  id="walletAddress"
                  disabled={isSubmitting}
                  label={intl.formatMessage({ id: 'wallet-address' })}
                  color={errors.walletAddress && touched.walletAddress ? 'error' : undefined}
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
                <FormattedMessage id="add-address" />
              </p>
            </FormButton>
            <Button color="light" type="button">
              <p className="capitalize">
                <FormattedMessage id="cancel" />
              </p>
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { AddNewAddressForm };
