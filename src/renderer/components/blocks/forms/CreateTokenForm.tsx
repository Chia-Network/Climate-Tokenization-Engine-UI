import React, { forwardRef, useImperativeHandle } from 'react';
import { Field, HelperText, Spacer } from '@/components';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Form, Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import { Address } from '@/schemas/Address.schema';

interface FormProps extends React.RefAttributes<CreateTokenFormRef> {
  data?: Address[];
}

export interface CreateTokenFormRef {
  submitForm: () => Promise<string | undefined>;
}

const CreateTokenForm: React.FC<FormProps> = forwardRef<CreateTokenFormRef, FormProps>(({ data }, ref) => {
  const intl: IntlShape = useIntl();
  const formikRef = React.useRef<FormikProps<any>>(null);

  const validationSchema = yup.object({
    walletAddress: yup.string().required(intl.formatMessage({ id: 'wallet-address-is-required' })),
  });

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      if (formikRef.current) {
        const formik = formikRef.current;
        if (formik) {
          const errors = await formik.validateForm(formik.values);
          formik.setTouched(Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
          if (formik.values?.walletAddress) {
            return formik.values.walletAddress;
          }
        }
      }
    },
  }));

  return (
    <Formik innerRef={formikRef} initialValues={data} validationSchema={validationSchema} onSubmit={() => {}}>
      {() => (
        <Form>
          <div className="mb-4">
            <HelperText className="text-gray-400 sentence-case">
              <FormattedMessage id="carbon-token-recipient" />
            </HelperText>
            <Spacer size={5} />
            <Field
              name="walletAddress"
              type="picklist"
              options={
                data?.map((addressData) => ({
                  label: addressData.name || '',
                  value: addressData.walletAddress || '',
                })) || []
              }
              freeform={true}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
});

export { CreateTokenForm };
