import React, { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';

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
  UploadFileInput,
} from '..';
import { detokenizeUnit } from '../../store/actions/appActions';
import { decrypt } from '../../utils/zip';

const DetokenizeModal = ({ onClose }) => {
  const { notification } = useSelector(app => app);
  const dispatch = useDispatch();
  const intl = useIntl();
  const [isValidationOn, setIsValidationOn] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    file: '',
  });
  const [decryptedFile, setDecryptedFile] = useState(null);

  const onSubmit = () => {
    setIsValidationOn(true);
    if (isPasswordValid && isFileValid && isDecryptionSuccessful)
      dispatch(detokenizeUnit(decryptedFile));
  };

  const isPasswordValid = useMemo(
    () => formData.password !== '' && formData.password.indexOf(' ') === -1,
    [formData],
  );

  const isFileValid = useMemo(
    () =>
      formData.file !== '' &&
      formData.file.size > 0 &&
      formData.file.name.endsWith('.zip'),
    [formData],
  );

  const isDecryptionSuccessful = useMemo(
    () => Boolean(decryptedFile),
    [decryptedFile],
  );

  const wasDetokFileParsedSuccessfully =
    notification && notification.id === 'detok-file-parsed';
  useEffect(() => {
    if (wasDetokFileParsedSuccessfully) {
      onClose();
    }
  }, [notification]);

  useEffect(() => {
    if (isFileValid && isPasswordValid) {
      decrypt(formData.file, formData.password, file => setDecryptedFile(file));
    }
  }, [formData]);

  return (
    <Modal
      modalType={modalTypeEnum.basic}
      title={intl.formatMessage({
        id: 'detokenize',
      })}
      onClose={onClose}
      onOk={onSubmit}
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

                  <UploadFileInput
                    file={formData.file}
                    onChange={file =>
                      setFormData(prevData => ({ ...prevData, file }))
                    }
                  />
                  {isValidationOn && !isFileValid && (
                    <Body color="red">
                      {intl.formatMessage({ id: 'add-valid-detok-file' })}
                    </Body>
                  )}
                  {isValidationOn &&
                    isFileValid &&
                    isPasswordValid &&
                    !isDecryptionSuccessful && (
                      <Body color="red">
                        {intl.formatMessage({ id: 'file-cannot-be-decrypted' })}
                      </Body>
                    )}
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
                      isValidationOn &&
                      !isPasswordValid &&
                      InputVariantEnum.error
                    }
                    type="password"
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'password',
                    })}
                    value={formData.password}
                    state={InputStateEnum.basic}
                    onChange={password =>
                      setFormData(prevData => ({ ...prevData, password }))
                    }
                  />
                </InputContainer>
                {isValidationOn && !isPasswordValid && (
                  <Body color="red">
                    {intl.formatMessage({ id: 'add-valid-detok-password' })}
                  </Body>
                )}
              </StyledFieldContainer>
            </BodyContainer>
          </FormContainerStyle>
        </ModalFormContainerStyle>
      }
    />
  );
};

export { DetokenizeModal };
