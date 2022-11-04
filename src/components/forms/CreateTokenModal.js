import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

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
import { tokenizeUnit } from '../../store/actions/appActions';

const CreateTokenModal = ({ data, onClose }) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [formValues, setFormValues] = useState({
    quantityOfCredits: data?.unitCount ?? 0,
    projectName: data?.projectName ?? '',
    projectId: data?.issuance?.warehouseProjectId ?? '',
    vintage: data?.vintageYear,
    projectLink: data?.projectLink ?? '',
    unitOwner: data?.unitOwner ?? '',
    accountHolderWalletAddress: '',
    existingMarketplaceIdentifiers: data?.marketplaceIdentifier ?? '',
    unitBlockStart: data?.unitBlockStart ?? '',
    unitBlockEnd: data?.unitBlockEnd ?? '',
  });
  const [isValidationOn, setIsValidationOn] = useState(false);

  const isWalletAddressValid =
    formValues?.accountHolderWalletAddress?.length > 0;

  const onSubmitForm = () => {
    setIsValidationOn(true);

    if (isWalletAddressValid) {
      const submitData = {
        org_uid: data?.orgUid,
        warehouse_project_id: data?.issuance?.warehouseProjectId,
        vintage_year: data?.vintageYear,
        sequence_num: 0,
        warehouseUnitId: data?.warehouseUnitId,
        to_address: formValues?.accountHolderWalletAddress,
        amount: data?.unitCount,
      };
      dispatch(tokenizeUnit(submitData));
      onClose();
    }
  };

  const updateWalletAddress = newAddress =>
    setFormValues(prevValues => ({
      ...prevValues,
      accountHolderWalletAddress: newAddress,
    }));

  return (
    <Modal
      modalType={modalTypeEnum.basic}
      title={intl.formatMessage({
        id: 'create-token',
      })}
      onOk={onSubmitForm}
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
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    type="number"
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'quantity-of-credits',
                    })}
                    state={InputStateEnum.disabled}
                    value={formValues.quantityOfCredits}
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
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    state={InputStateEnum.disabled}
                    type="text"
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'project-name',
                    })}
                    value={formValues.projectName}
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
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    type="text"
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'project-id',
                    })}
                    state={InputStateEnum.disabled}
                    value={formValues.projectId}
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
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    type="text"
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'vintage',
                    })}
                    state={InputStateEnum.disabled}
                    value={formValues.vintage}
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
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    type="text"
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'projectLink',
                    })}
                    state={InputStateEnum.disabled}
                    value={formValues.projectLink}
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
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'unit-owner',
                    })}
                    state={InputStateEnum.disabled}
                    value={formValues.unitOwner}
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
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'unit-block-start',
                    })}
                    state={InputStateEnum.disabled}
                    value={formValues.unitBlockStart}
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
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'unit-block-end',
                    })}
                    state={InputStateEnum.disabled}
                    value={formValues.unitBlockEnd}
                    name="unitBlockEnd"
                  />
                </InputContainer>
              </StyledFieldContainer>
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    <LabelContainer>
                      *<FormattedMessage id="account-holder-wallet-address" />
                    </LabelContainer>
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    size={InputSizeEnum.large}
                    variant={
                      isValidationOn &&
                      !isWalletAddressValid &&
                      InputVariantEnum.error
                    }
                    placeholderText={intl.formatMessage({
                      id: 'account-holder-wallet-address',
                    })}
                    state={InputStateEnum.default}
                    value={formValues.accountHolderWalletAddress}
                    name="accountHolderWalletAddress"
                    onChange={updateWalletAddress}
                  />
                </InputContainer>
                {isValidationOn && !isWalletAddressValid && (
                  <Body size="Small" color="red">
                    Add valid wallet address
                  </Body>
                )}
              </StyledFieldContainer>
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    <LabelContainer>
                      *<FormattedMessage id="existing-marketplace-identifier" />
                    </LabelContainer>
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'existing-marketplace-identifier',
                    })}
                    state={InputStateEnum.disabled}
                    value={formValues.existingMarketplaceIdentifiers}
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

export { CreateTokenModal };
