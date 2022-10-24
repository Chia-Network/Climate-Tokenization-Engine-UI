import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import styled, { withTheme } from 'styled-components';
import { Modal } from '.';
import {
  Body,
  InputContainer,
  InputSizeEnum,
  InputVariantEnum,
  ModalFormContainerStyle,
  StandardInput,
  StyledFieldContainer,
  StyledLabelContainer,
  Tab,
  TabPanel,
  Tabs,
} from '..';
import { importHomeOrg } from '../../store/actions/appActions';

const ConnectContainer = styled('button')`
  align-self: center;
  background: none;
  color: ${props => props.theme.colors.default.onSurface};
  border: none;
  cursor: pointer;
`;

const StyledContainer = styled('div')`
  height: 12.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Connect = withTheme(() => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [orgUid, setOrgUid] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = useCallback(
    (event, newValue) => {
      setTabValue(newValue);
    },
    [setTabValue],
  );

  const connectToHomeOrg = () => {
    dispatch(importHomeOrg(orgUid));
    setIsConnectModalOpen(false);
  };

  return (
    <>
      <ConnectContainer onClick={() => setIsConnectModalOpen(true)}>
        <FormattedMessage id="connect-to-cw" />
      </ConnectContainer>

      {isConnectModalOpen && (
        <Modal
          modalType="basic"
          onOk={connectToHomeOrg}
          title={
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label={intl.formatMessage({ id: 'import' })} />
            </Tabs>
          }
          onClose={() => setIsConnectModalOpen(false)}
          body={
            <ModalFormContainerStyle>
              <TabPanel value={tabValue} index={0}>
                <StyledContainer>
                  <StyledFieldContainer>
                    <StyledLabelContainer>
                      <Body>
                        *<FormattedMessage id="org-uid" />
                      </Body>
                    </StyledLabelContainer>
                    <InputContainer>
                      <StandardInput
                        size={InputSizeEnum.large}
                        variant={InputVariantEnum.default}
                        value={orgUid}
                        onChange={value => setOrgUid(value)}
                        placeholderText="Org Uid"
                      />
                    </InputContainer>
                  </StyledFieldContainer>
                </StyledContainer>
              </TabPanel>
            </ModalFormContainerStyle>
          }
        />
      )}
    </>
  );
});

export default Connect;
