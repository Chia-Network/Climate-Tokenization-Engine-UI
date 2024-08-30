import React, { useCallback } from 'react';
import { noop } from 'lodash';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { FloatingLabel, FormButton, HelperText, Spacer } from '@/components';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { useTokenizeUnitMutation } from '@/api';

export interface TokenData {
  org_uid: string;
  warehouse_project_id: string;
  vintage_year: number;
  sequence_num: number;
  warehouseUnitId: string;
  amount: number;
}

interface FormProps {
  tokenData: TokenData;
  setApiFailure: (failure: boolean) => void;
  setApiSuccess: (failure: boolean) => void;
  onClearError?: () => void;
}

const CreateTokenForm: React.FC<FormProps> = ({ tokenData, setApiFailure, setApiSuccess, onClearError = noop }) => {
  const intl: IntlShape = useIntl();
  const [triggerTokenizeUnit, { error: tokenizationError }] = useTokenizeUnitMutation();

  const validationSchema = yup.object({
    walletAddress: yup
      .string()
      .required(intl.formatMessage({ id: 'wallet-address-is-required' }))
      .matches(
        /^xch[a-zA-Z0-9]{59}$/,
        intl.formatMessage({ id: 'wallet-addresses-start-with-xch-and-are-62-characters-long' }),
      ),
  });

  const handleSubmit = useCallback(
    async (values: { walletAddress: string }, { setSubmitting }) => {
      const result = await triggerTokenizeUnit({ ...tokenData, to_address: values.walletAddress });
      if (result?.error || tokenizationError) {
        setApiFailure(true);
      } else {
        setApiSuccess(true);
      }
      setSubmitting(false);
    },
    [setApiFailure, setApiSuccess, tokenData, tokenizationError, triggerTokenizeUnit],
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
