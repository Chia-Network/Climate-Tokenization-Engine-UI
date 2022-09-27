import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { validateUrl } from '../../utils/urlUtils';
import {
  importHomeOrg,
  refreshApp,
  signIn,
  signOut,
} from '../../store/actions/appActions';

const ConnectContainer = styled('button')`
  align-self: center;
  background: none;
  color: ${props => props.theme.colors.default.onSurface};
  border: none;
  cursor: pointer;
`;

const ConnectedStyle = styled('button')`
  width: 21rem;
  height: 3.125rem;
  display: flex;
  align-items: center;
  align-self: center;
  border: none;
  background: none;
`;

const DisonnectButton = styled('button')`
  width: 21rem;
  height: 3.125rem;
  display: flex;
  align-items: center;
  align-self: center;
  cursor: pointer;
  border: none;
  background: none;
`;

const StyledContainer = styled('div')`
  height: 12.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Connect = withTheme(({ theme }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { serverAddress } = useSelector(store => store);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [insertedApiKey, setInsertedApiKey] = useState(null);
  const [orgUid, setOrgUid] = useState('');
  const [insertedServerAddress, setInsertedServerAddress] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const signUserIn = () => {
    if (
      insertedServerAddress &&
      insertedApiKey &&
      validateUrl(insertedServerAddress)
    ) {
      dispatch(signIn({ insertedApiKey, insertedServerAddress }));
      setInsertedServerAddress(null);
      setInsertedApiKey(null);
      setIsConnectModalOpen(false);
    }

    if (orgUid) {
      dispatch(importHomeOrg(orgUid));
    }
  };

  const handleTabChange = useCallback(
    (event, newValue) => {
      setTabValue(newValue);
    },
    [setTabValue],
  );

  return (
    <>
      {serverAddress ? (
        <ConnectedStyle>
          <Body>
            <FormattedMessage id="connected" />:
          </Body>
          <Body color={theme.colors.default.status.ok.primary}>
            {serverAddress}
          </Body>
          <DisonnectButton
            onClick={() => {
              dispatch(signOut());
              dispatch(refreshApp(true));
            }}
          >
            <Body>
              <FormattedMessage id="disconnect" />
            </Body>
          </DisonnectButton>
        </ConnectedStyle>
      ) : (
        <ConnectContainer onClick={() => setIsConnectModalOpen(true)}>
          <FormattedMessage id="connect-to-cw" />
        </ConnectContainer>
      )}
      {isConnectModalOpen && (
        <Modal
          modalType="basic"
          onOk={signUserIn}
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
                        value={insertedServerAddress}
                        onChange={value => setInsertedServerAddress(value)}
                        placeholderText="http://0.0.0.0:31310"
                      />
                    </InputContainer>
                    {(insertedServerAddress === null ||
                      validateUrl(insertedServerAddress) === false) && (
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
                        value={insertedApiKey}
                        onChange={value => setInsertedApiKey(value)}
                        placeholderText="xxxxxxx-xxxxxx-xxxxxx"
                      />
                    </InputContainer>
                    {insertedApiKey === null && (
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
});

export default Connect;
