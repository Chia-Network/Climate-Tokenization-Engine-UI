import React from 'react';
import {
  Body,
  BodyContainer,
  FormContainerStyle,
  InputContainer,
  InputSizeEnum,
  InputStateEnum,
  InputVariantEnum,
  LabelContainer,
  Modal,
  ModalFormContainerStyle,
  modalTypeEnum,
  SpanTwoColumnsContainer,
  StandardInput,
  StyledFieldContainer,
  StyledLabelContainer,
} from '..';
import { useIntl, FormattedMessage } from 'react-intl';
import { validateDetokenizeUnitSchema } from '../../store/validations';
import styled from 'styled-components';
import { useFormik } from 'formik';

const FileUploadContainer = styled('div')`
  display: flex;
  height: 100%;
  width: 100%;
`;

const FileSelectButton = styled('input')`
  border-radius: 5%;
  background: none;
  cursor: pointer;
`;

const DetokenizeModal = ({ onClose }) => {
  const intl = useIntl();
  const {
    values,
    handleBlur,
    setFieldValue,
    handleChange,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      password: '',
      fileUpload: '',
    },

    onSubmit: values => console.log(values),
    validationSchema: validateDetokenizeUnitSchema,
  });

  return (
    <Modal
      modalType={modalTypeEnum.basic}
      title={intl.formatMessage({
        id: 'detokenize',
      })}
      onClose={onClose}
      onOk={handleSubmit}
      body={
        <ModalFormContainerStyle>
          <FormContainerStyle>
            <BodyContainer>
              <SpanTwoColumnsContainer>
                <StyledFieldContainer>
                  <StyledLabelContainer>
                    <Body>
                      <LabelContainer>
                        <FormattedMessage id="file-upload" />
                      </LabelContainer>
                    </Body>
                  </StyledLabelContainer>

                  <FileUploadContainer>
                    <FileSelectButton
                      type="file"
                      placeholder={intl.formatMessage({ id: 'select' })}
                      onChange={handleChange}
                      value={values.fileUpload}
                      name="fileUpload"
                    />
                  </FileUploadContainer>
                  <Body color="red">{errors?.fileUpload}</Body>
                </StyledFieldContainer>
              </SpanTwoColumnsContainer>
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    <LabelContainer>
                      <FormattedMessage id="password" />
                    </LabelContainer>
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    variant={
                      errors.password && touched.password
                        ? InputVariantEnum.error
                        : undefined
                    }
                    type="password"
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'password',
                    })}
                    value={values?.password}
                    state={InputStateEnum.basic}
                    onChange={e => setFieldValue('password', e)}
                    onBlur={handleBlur}
                    name="password"
                  />
                </InputContainer>
                <Body color="red">{touched.password && errors.password}</Body>
              </StyledFieldContainer>
            </BodyContainer>
          </FormContainerStyle>
        </ModalFormContainerStyle>
      }
    />
  );
};

export { DetokenizeModal };
