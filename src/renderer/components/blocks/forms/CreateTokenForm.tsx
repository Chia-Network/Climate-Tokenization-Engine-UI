import React, { forwardRef, useImperativeHandle } from 'react';
import { Field, HelperText, Spacer, validateWalletAddress } from '@/components';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Form, Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import { Address } from '@/schemas/Address.schema';

interface FormProps extends React.RefAttributes<CreateTokenFormRef> {
  addressBookRecords: Address[];
  onValidityChange: (isValid: boolean) => void;
}

export interface CreateTokenFormRef {
  submitForm: () => Promise<any>;
}

const CreateTokenForm: React.FC<FormProps> = forwardRef<CreateTokenFormRef, FormProps>(
  ({ addressBookRecords, onValidityChange }, ref) => {
    const intl: IntlShape = useIntl();
    const formikRef = React.useRef<FormikProps<Address>>(null);

    const validationSchema = yup.object({
      walletAddress: yup
        .string()
        .required(intl.formatMessage({ id: 'wallet-address-is-required' }))
        .test('validate-wallet-address', function (walletAddress) {
          return validateWalletAddress(walletAddress, this, intl);
        }),
      name: yup.string().optional(),
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
      <Formik<Address>
        innerRef={formikRef}
        initialValues={{ walletAddress: '', name: '' }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ isValid }) => {
          onValidityChange(isValid);

          return (
            <Form>
              <div className="mb-4">
                <HelperText className="text-gray-400 sentence-case">
                  <FormattedMessage id="carbon-token-recipient" />
                </HelperText>
                <Spacer size={5} />
                <Field
                  required
                  name="walletAddress"
                  type="picklist"
                  initialValue={''}
                  options={addressBookRecords.map((addressRecord) => ({
                    label: addressRecord.name || '',
                    value: addressRecord.walletAddress || '',
                  }))}
                  freeform={true}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  },
);

export { CreateTokenForm };
