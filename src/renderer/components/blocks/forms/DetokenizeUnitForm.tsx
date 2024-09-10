import React, { useCallback, useState } from 'react';
import { noop } from 'lodash';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { TestFunction } from 'yup';
import { FloatingLabel, FormButton, Label } from '@/components';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { AiOutlineUpload } from 'react-icons/ai';
import { BsFileEarmarkZip } from 'react-icons/bs';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

interface FormProps {
  onSubmit: (values: DetokFormValues) => Promise<void>;
  onClearError?: () => void;
}

export interface DetokFormValues {
  detokenizationFile: File | undefined;
  password: string;
}

const FILE_INPUT_NORMAL_CLASS =
  'flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 ' +
  'bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600';
const FILE_INPUT_ERROR_CLASS =
  'flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-red-600 ' +
  'bg-red-200 hover:bg-red-100 dark:border-red-600 dark:border-red-950 dark:hover:bg-red-500';

const DetokenizeUnitForm: React.FC<FormProps> = ({ onSubmit, onClearError = noop }) => {
  const intl: IntlShape = useIntl();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const validateZipFile: TestFunction<File> = (file) => {
    if (!file || !(file instanceof File)) {
      return false;
    }
    const mimeType = file.type === 'application/zip';
    const extension = file.name.endsWith('.zip');
    return mimeType || extension;
  };

  const validationSchema = yup.object({
    detokenizationFile: yup
      .mixed<File>()
      .required(intl.formatMessage({ id: 'detokenization-file-is-required' }))
      .nonNullable()
      .test(
        'validate-detokenization-zip-file',
        intl.formatMessage({ id: 'detokenization-file-is-invalid' }),
        validateZipFile,
      ),
    password: yup
      .string()
      .required(intl.formatMessage({ id: 'detokenization-file-password-is-required' }))
      .nonNullable(),
  });

  const handleSubmit = useCallback(
    async (values: DetokFormValues, { setSubmitting }) => {
      await onSubmit(values);
      setSubmitting(false);
    },
    [onSubmit],
  );

  const handlePasswordChange = useCallback(
    (event: any, field: any) => {
      onClearError();
      field.onChange(event); // Call Formik's original onChange
    },
    [onClearError],
  );

  const handleFileChange = useCallback(
    ({
      event,
      setFieldValue,
      setFieldTouched,
    }: {
      event: React.ChangeEvent<HTMLInputElement>;
      setFieldValue: any;
      setFieldTouched: any;
    }) => {
      onClearError();
      setFieldTouched('detokenizationFile', true);
      setFieldValue('detokenizationFile', event?.currentTarget?.files?.[0] || undefined, true);
    },
    [onClearError],
  );

  const handleFileDrop = ({
    event,
    setFieldValue,
    setFieldTouched,
  }: {
    event: React.DragEvent<HTMLLabelElement>;
    setFieldValue: any;
    setFieldTouched: any;
  }) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setFieldTouched('detokenizationFile', true);
      setFieldValue('detokenizationFile', event.dataTransfer.files[0] || undefined, true);
      event.dataTransfer.clearData();
    }
  };

  return (
    <Formik
      initialValues={{
        detokenizationFile: undefined,
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, values, setFieldValue, setFieldTouched }) => (
        <Form className="w-full mb-4 space-y-2.5">
          <Field name="detokenizationFile">
            {() => (
              <>
                <Label
                  htmlFor="detokenizationFile"
                  className={errors.detokenizationFile ? FILE_INPUT_ERROR_CLASS : FILE_INPUT_NORMAL_CLASS}
                  onDragOver={(event) => event.preventDefault()}
                  onDragEnter={(event) => event.preventDefault()}
                  onDrop={(event) => handleFileDrop({ event, setFieldValue, setFieldTouched })}
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    {values.detokenizationFile && !errors.detokenizationFile ? (
                      <div className="space-y-0.5 w-full flex flex-col items-center">
                        <BsFileEarmarkZip size={40} color="rgb(107 114 128)" />
                        <p className="p-2 text-sm text-gray-500 dark:text-gray-400">
                          {
                            // @ts-ignore
                            values.detokenizationFile?.name || <FormattedMessage id="missing-file-name" />
                          }
                        </p>
                      </div>
                    ) : (
                      <>
                        {errors.detokenizationFile && values?.detokenizationFile && (
                          <p className="sentence-case text-red-700 pb-7">
                            <FormattedMessage id="please-upload-a-different-file" />
                          </p>
                        )}
                        <AiOutlineUpload size={30} className="fill-gray-500" />
                        <p className="p-2 text-sm text-gray-500 dark:text-gray-400 sentence-case">
                          <FormattedMessage id="click-to-upload-or-drag-and-drop-detokenization-file" />
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {'.ZIP '}
                          <FormattedMessage id="files-only" />
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    name="detokenizationFile"
                    className="sr-only"
                    type="file"
                    id="detokenizationFile"
                    disabled={isSubmitting}
                    required={
                      !values.detokenizationFile // allow form submission if file is selected via drag and drop
                    }
                    onChange={(event) => handleFileChange({ event, setFieldValue, setFieldTouched })}
                  />
                </Label>
              </>
            )}
          </Field>
          <ErrorMessage name="detokenizationFile" component="div" className="text-red-600" />
          <Field name="password">
            {({ field }) => (
              <div className="flex flex-grow space-x-2.5 w-full items-center justify-center">
                <div className="w-full">
                  <FloatingLabel
                    id="password"
                    disabled={isSubmitting}
                    label={intl.formatMessage({ id: 'detokenization-file-password' })}
                    color={errors.password && touched.password && 'error'}
                    variant="outlined"
                    required
                    type={passwordVisible ? 'text' : 'password'}
                    {...field}
                    onChange={(event) => handlePasswordChange(event, field)}
                  />
                </div>
                {passwordVisible ? (
                  <IoEyeOffOutline
                    size={35}
                    className="bg-gray-200 hover:bg-gray-300 rounded-lg p-2"
                    onClick={() => setPasswordVisible(false)}
                  />
                ) : (
                  <IoEyeOutline
                    size={35}
                    className="bg-gray-200 hover:bg-gray-300 rounded-lg p-2"
                    onClick={() => setPasswordVisible(true)}
                  />
                )}
              </div>
            )}
          </Field>
          {touched.password && <ErrorMessage name="password" component="div" className="text-red-600" />}
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

export { DetokenizeUnitForm };
