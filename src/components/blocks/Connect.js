import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';
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
import { validateUrl } from '../../utils/urlUtils';

const ConnectContainer = styled('button')`
  width: 18.75rem;
  height: 3.125rem;
  align-self: center;
  background: none;
  color: black;
  border: 0.0625rem solid black;
  border-radius: 0.625rem;
`;

const StyledContainer = styled('div')`
  height: 12.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Connect = () => {
  const intl = useIntl();
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState(null);
  const [orgUid, setOrgUid] = useState('');
  const [serverAddress, setServerAddress] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = useCallback(
    (event, newValue) => {
      setTabValue(newValue);
    },
    [setTabValue],
  );

  return (
    <>
      <ConnectContainer onClick={() => setIsConnectModalOpen(true)}>
        <FormattedMessage id="connect-to-cw" />
      </ConnectContainer>
      {isConnectModalOpen && (
        <Modal
          modalType="basic"
          title={
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label={intl.formatMessage({ id: 'connect' })} />
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
                        *<FormattedMessage id="server-address" />
                      </Body>
                    </StyledLabelContainer>
                    <InputContainer>
                      <StandardInput
                        size={InputVariantEnum.large}
                        variant={InputVariantEnum.default}
                        value={serverAddress}
                        onChange={value => setServerAddress(value)}
                        placeholderText="http://0.0.0.0:31310"
                      />
                    </InputContainer>
                    {(serverAddress === null ||
                      validateUrl(serverAddress) === false) && (
                      <Body size="Small" color="red">
                        {intl.formatMessage({
                          id: 'add-valid-server-address',
                        })}
                      </Body>
                    )}
                  </StyledFieldContainer>
                  <StyledFieldContainer>
                    <StyledLabelContainer>
                      <Body>
                        *<FormattedMessage id="api-key" />
                      </Body>
                    </StyledLabelContainer>
                    <InputContainer>
                      <StandardInput
                        size={InputSizeEnum.large}
                        variant={InputVariantEnum.default}
                        value={apiKey}
                        onChange={value => setApiKey(value)}
                        placeholderText="xxxxxxx-xxxxxx-xxxxxx"
                      />
                    </InputContainer>
                    {apiKey === null && (
                      <Body size="Small" color="red">
                        {intl.formatMessage({
                          id: 'add-valid-api-key',
                        })}
                      </Body>
                    )}
                  </StyledFieldContainer>
                </StyledContainer>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
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
};

export default Connect;
