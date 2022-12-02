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
import { getContentFromEncryptedZip } from '../../utils/zip';

const DetokenizeModal = ({ onClose }) => {
  const { notification } = useSelector(app => app);
  const dispatch = useDispatch();
  const intl = useIntl();
  const [isValidationOn, setIsValidationOn] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    file: '',
  });
  const [detokString, setDetokString] = useState(null);

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

  const isDetokStringValid = useMemo(
    () => typeof detokString === 'string' && detokString.startsWith('detok'),
    [detokString],
  );

  const onSubmit = () => {
    setIsValidationOn(true);
    if (isPasswordValid && isFileValid && isDetokStringValid)
      dispatch(detokenizeUnit(detokString));
  };

  const wasDetokFileParsedSuccessfully =
    notification && notification.id === 'detok-file-parsed';
  useEffect(() => {
    if (wasDetokFileParsedSuccessfully) {
      onClose();
    }
  }, [notification]);

  useEffect(() => {
    if (isFileValid && isPasswordValid) {
      getContentFromEncryptedZip(formData.file, formData.password, file =>
        setDetokString(file),
      );
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
                    <Body size="Small" color="red">
                      {intl.formatMessage({ id: 'add-valid-detok-file' })}
                    </Body>
                  )}
                  {isValidationOn &&
                    isFileValid &&
                    isPasswordValid &&
                    !isDetokStringValid && (
                      <Body size="Small" color="red">
                        {intl.formatMessage({
                          id: 'detok-file-archive-not-valid',
                        })}
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
                  <Body size="Small" color="red">
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
