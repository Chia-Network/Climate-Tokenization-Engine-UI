import { useFormik } from 'formik';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import {
  Body,
  BodyContainer,
  FormContainerStyle,
  InputContainer,
  InputSizeEnum,
  InputStateEnum,
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

  const { values } = useFormik({
    initialValues: {
      quantityOfCredits: data?.unitCount ?? 0,
      projectName: data?.projectName ?? '',
      projectId: data?.issuance?.warehouseProjectId ?? '',
      vintage: data?.vintageYear,
      projectLink: data?.projectLink ?? '',
      unitOwner: data?.unitOwner ?? '',
      accountHolderWalletAddress: data?.accountHolderWalletAddress ?? '',
      existingMarketplaceIdentifiers: data?.marketplaceIdentifier ?? '',
      unitBlockStart: data?.unitBlockStart ?? '',
      unitBlockEnd: data?.unitBlockEnd ?? '',
    },
  });

  const onSubmitForm = () => {
    const submitData = {
      org_uid: data?.orgUid,
      warehouse_project_id: data?.issuance?.warehouseProjectId,
      vintage_year: data?.vintageYear,
      sequence_num: 0,
      warehouseUnitId: data?.warehouseUnitId,
    };

    dispatch(tokenizeUnit(submitData));
    onClose();
  };

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
                    value={values.quantityOfCredits}
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
                    value={values.projectName}
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
                    value={values.projectId}
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
                    value={values.vintage}
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
                    value={values.projectLink}
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
                    value={values.unitOwner}
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
                    value={values.unitBlockStart}
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
                    value={values.unitBlockEnd}
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
                    placeholderText={intl.formatMessage({
                      id: 'account-holder-wallet-address',
                    })}
                    state={InputStateEnum.disabled}
                    value={values.accountHolderWalletAddress}
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
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'existing-marketplace-identifier',
                    })}
                    state={InputStateEnum.disabled}
                    value={values.accountHolderWalletAddress}
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
