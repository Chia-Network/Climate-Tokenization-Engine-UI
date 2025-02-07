import React, { useCallback } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Button, FloatingLabel, FormButton, validateWalletAddress } from '@/components';
import { FormattedMessage, useIntl } from 'react-intl';
import * as yup from 'yup';
import { noop } from 'lodash';
import { Address } from '@/schemas/Address.schema';

interface FormProps {
  onSubmit: (values: Address) => Promise<void>;
  onClearError?: () => void;
  data?: Address;
  onClose: any;
}

const UpsertWalletAddressForm: React.FC<FormProps> = ({ onSubmit, onClearError = noop, data: address, onClose }) => {
  const intl = useIntl();

  const validationSchema = yup.object({
    name: yup.string().required('The name must be at least 3 characters').min(3),
    walletAddress: yup
      .string()
      .required(intl.formatMessage({ id: 'wallet-address-is-required' }))
      .test('validate-wallet-address', function (value) {
        return validateWalletAddress(value, this, intl);
      }),
  });

  const handleSubmit = useCallback(
    async (values: Address, { setSubmitting }: FormikHelpers<Address>) => {
      try {
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
    <Formik<Address>
      initialValues={
        address
          ? address
          : {
              id: undefined,
              name: '',
              walletAddress: '',
            }
      }
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
                  label={intl.formatMessage({ id: 'project-developer' })}
                  color={errors.name && touched.name ? 'error' : undefined}
                  variant="outlined"
                  required
                  type="text"
                  {...field}
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
                <FormattedMessage id={address ? 'edit-address' : 'add-address'} />
              </p>
            </FormButton>
            <Button color="light" type="button" onClick={onClose}>
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

export { UpsertWalletAddressForm };
