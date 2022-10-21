import { useFormik } from 'formik';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  Body,
  BodyContainer,
  FormContainerStyle,
  InputContainer,
  InputSizeEnum,
  InputStateEnum,
  InputVariantEnum,
  LabelContainer,
  ModalFormContainerStyle,
  StandardInput,
  StyledFieldContainer,
  StyledLabelContainer,
  modalTypeEnum,
  Modal,
} from '..';
import { tokenSchema } from '../../store/validations';

const CreateTokenModal = ({ data, onClose }) => {
  const { values, errors, touched, handleBlur, handleChange } = useFormik({
    initialValues: {
      quantityOfCredits: null,
      projectName: null,
      projectId: null,
      vintage: null,
      projectLink: null,
      unitOwner: null,
      accountHolderWalletAddress: null,
      existingMarketplaceIdentifiers: null,
      unitBlockStart: null,
      unitBlockEnd: null,
      quantity: null,
    },
    validationSchema: tokenSchema,
  });
  const intl = useIntl();
  console.log(data);
  return (
    <Modal
      modalType={modalTypeEnum.basic}
      title={intl.formatMessage({
        id: 'create-token',
      })}
      onClose={onClose}
      body={
        <ModalFormContainerStyle>
          <FormContainerStyle>
            <BodyContainer>
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    <LabelContainer>
                      *<FormattedMessage id="quantity-of-credits" />
                    </LabelContainer>
                    {/* <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'issuances-start-date-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer> */}
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    variant={
                      errors?.quantityOfCredits &&
                      touched?.quantityOfCredits &&
                      InputVariantEnum.error
                    }
                    type="number"
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'quantity-of-credits',
                    })}
                    state={InputStateEnum.default}
                    value={values.quantityOfCredits}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="quantityOfCredits"
                  />
                </InputContainer>
              </StyledFieldContainer>
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    <LabelContainer>
                      *<FormattedMessage id="project-name" />
                    </LabelContainer>
                    {/* <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'project-name',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer> */}
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    variant={
                      errors?.projectName &&
                      touched?.projectName &&
                      InputVariantEnum.error
                    }
                    type="text"
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'quantity-of-credits',
                    })}
                    state={InputStateEnum.default}
                    value={values.projectName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="projectName"
                  />
                </InputContainer>
              </StyledFieldContainer>
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    <LabelContainer>
                      *<FormattedMessage id="project-id" />
                    </LabelContainer>
                    {/* <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'issuances-verification-body-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer> */}
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    variant={
                      errors?.projectId &&
                      touched?.projectId &&
                      InputVariantEnum.error
                    }
                    type="text"
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'project-id',
                    })}
                    state={InputStateEnum.default}
                    value={values.projectId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="projectId"
                  />
                </InputContainer>
              </StyledFieldContainer>
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    <LabelContainer>
                      *<FormattedMessage id="vintage" />
                    </LabelContainer>
                    {/* <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'issuances-verification-report-date-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer> */}
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    variant={
                      errors?.vintage &&
                      touched?.vintage &&
                      InputVariantEnum.error
                    }
                    type="text"
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'vintage',
                    })}
                    state={InputStateEnum.default}
                    value={values.vintage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="vintage"
                  />
                </InputContainer>
              </StyledFieldContainer>
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    <LabelContainer>
                      *<FormattedMessage id="project-link" />
                    </LabelContainer>
                    {/* <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'id',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer> */}
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    variant={
                      errors?.projectLink &&
                      touched?.projectLink &&
                      InputVariantEnum.error
                    }
                    type="text"
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'projectLink',
                    })}
                    state={InputStateEnum.default}
                    value={values.projectLink}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="projectLink"
                  />
                </InputContainer>
              </StyledFieldContainer>
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    <LabelContainer>
                      *<FormattedMessage id="unit-owner" />
                    </LabelContainer>
                    {/* <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'issuances-verification-approach-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer> */}
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    variant={
                      errors?.unitOwner &&
                      touched?.unitOwner &&
                      InputVariantEnum.error
                    }
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'unit-owner',
                    })}
                    state={InputStateEnum.default}
                    value={values.unitOwner}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="unitOwner"
                  />
                </InputContainer>
              </StyledFieldContainer>
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    <LabelContainer>
                      *<FormattedMessage id="unit-block-start" />
                    </LabelContainer>
                    {/* <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'issuances-verification-approach-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer> */}
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    variant={
                      errors?.unitBlockStart &&
                      touched?.unitBlockStart &&
                      InputVariantEnum.error
                    }
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'unit-block-start',
                    })}
                    state={InputStateEnum.default}
                    value={values.unitBlockStart}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="unitBlockStart"
                  />
                </InputContainer>
              </StyledFieldContainer>
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    <LabelContainer>
                      *<FormattedMessage id="unit-block-end" />
                    </LabelContainer>
                    {/* <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'issuances-verification-approach-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer> */}
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    variant={
                      errors?.unitBlockEnd &&
                      touched?.unitBlockEnd &&
                      InputVariantEnum.error
                    }
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'unit-block-end',
                    })}
                    state={InputStateEnum.default}
                    value={values.unitBlockEnd}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="unitBlockEnd"
                  />
                </InputContainer>
              </StyledFieldContainer>
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    <LabelContainer>
                      *<FormattedMessage id="unit-block-start" />
                    </LabelContainer>
                    {/* <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'issuances-verification-approach-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer> */}
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    variant={
                      errors?.unitBlockStart &&
                      touched?.unitBlockStart &&
                      InputVariantEnum.error
                    }
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'unit-block-start',
                    })}
                    state={InputStateEnum.default}
                    value={values.unitBlockStart}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="unitBlockStart"
                  />
                </InputContainer>
              </StyledFieldContainer>
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    <LabelContainer>
                      *<FormattedMessage id="account-holder-wallet-address" />
                    </LabelContainer>
                    {/* <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'issuances-verification-approach-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer> */}
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    variant={
                      errors?.accountHolderWalletAddress &&
                      touched?.accountHolderWalletAddress &&
                      InputVariantEnum.error
                    }
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'account-holder-wallet-address',
                    })}
                    state={InputStateEnum.default}
                    value={values.accountHolderWalletAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="accountHolderWalletAddress"
                  />
                </InputContainer>
              </StyledFieldContainer>
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    <LabelContainer>
                      *<FormattedMessage id="existing-marketplace-identifier" />
                    </LabelContainer>
                    {/* <ToolTipContainer
                  tooltip={intl.formatMessage({
                    id: 'issuances-verification-approach-description',
                  })}>
                  <DescriptionIcon height="14" width="14" />
                </ToolTipContainer> */}
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    variant={
                      errors?.existingMarketplaceIdentifiers &&
                      touched?.existingMarketplaceIdentifiers &&
                      InputVariantEnum.error
                    }
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'existing-marketplace-identifier',
                    })}
                    state={InputStateEnum.default}
                    value={values.accountHolderWalletAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="existingMarketplaceIdentifier"
                  />
                </InputContainer>
              </StyledFieldContainer>
            </BodyContainer>
          </FormContainerStyle>
        </ModalFormContainerStyle>
      }
    />
  );
};

export default CreateTokenModal;
