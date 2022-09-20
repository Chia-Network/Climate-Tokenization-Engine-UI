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
  width: 300px;
  height: 50px;
  align-self: center;
  background: none;
  color: black;
  border: 1px solid black;
  border-radius: 10px;
`;

const Connect = () => {
  const intl = useIntl();
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
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
              </TabPanel>
            </ModalFormContainerStyle>
          }
        />
      )}
    </>
  );
};

export default Connect;
