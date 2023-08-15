import React, { useEffect } from 'react';
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
import { importHomeOrg, signIn } from '../../store/actions/appActions';
import { validateUrl } from '../../utils/urlUtils';

const ConnectContainer = styled('div')`
  background: none;
  cursor: pointer;
  align-items: center;

  color: ${props => props.theme.colors.default.primaryDark};

  :hover {
    color: ${props => props.theme.colors.default.primary};
  }

  text-transform: uppercase;
  font-family: ${props => props.theme.typography.primary.semiBold};
`;

const StyledContainer = styled('div')`
  height: 12.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Connect = withTheme(({ openModal = false, onClose, isHeader = true }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(openModal);
  const { homeOrgUid } = useSelector(state => state);
  const [orgUid, setOrgUid] = useState(homeOrgUid || '');
  const [tabValue, setTabValue] = useState(0);
  const [apiKey, setApiKey] = useState(null);
  const [serverAddress, setServerAddress] = useState(null);

  const handleTabChange = useCallback(
    (event, newValue) => {
      setTabValue(newValue);
    },
    [setTabValue],
  );

  const connectToHomeOrg = () => {
    if (apiKey && serverAddress && validateUrl(serverAddress)) {
      dispatch(
        signIn({
          insertedApiKey: apiKey,
          insertedServerAddress: serverAddress,
        }),
      );
      setServerAddress(null);
      setApiKey(null);
    }
    dispatch(importHomeOrg(orgUid));
    setIsConnectModalOpen(false);
  };

  useEffect(() => {
    setOrgUid(homeOrgUid);
  }, [homeOrgUid]);

    useEffect(() => {
    // Function to handle the message event
    const handleMessage = event => {
      if (event.origin !== window.location.origin) {
        return;
      }
      console.log('Received message:', event.data);
      if (
        event?.data?.serverAddress &&
        validateUrl(event?.data?.serverAddress)
      ) {
        dispatch(
          signIn({
            apiKey: event?.data?.apiKey,
            serverAddress: event?.data?.serverAddress,
          }),
        );
        setServerAddress(null);
        setApiKey(null);
        setIsConnectModalOpen(false);
        dispatch(importHomeOrg(orgUid));
      }
    };

    // Add the event listener
    window.addEventListener('message', handleMessage, false);

    // Return a function that will be called when the component unmounts
    return () => {
      // Remove the event listener
      window.removeEventListener('message', handleMessage, false);
    };
  }, []);

  return (
    <>
      {isHeader && (
        <ConnectContainer onClick={() => setIsConnectModalOpen(true)}>
          {!homeOrgUid && <FormattedMessage id="connect-to-cw" />}
          {homeOrgUid && <FormattedMessage id="connected" />}
        </ConnectContainer>
      )}

      {isConnectModalOpen && (
        <Modal
          modalType="basic"
          label={
            homeOrgUid
              ? intl.formatMessage({ id: 'update' })
              : intl.formatMessage({ id: 'import' })
          }
          onOk={connectToHomeOrg}
          title={
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab
                label={intl.formatMessage({
                  id: homeOrgUid ? 'update-home-org' : 'import-home-org',
                })}
              />
              <Tab
                label={intl.formatMessage({
                  id: 'connect-to-remote',
                })}
              />
            </Tabs>
          }
          onClose={() => (onClose ? onClose() : setIsConnectModalOpen(false))}
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
              <TabPanel value={tabValue} index={1}>
                <StyledContainer style={{ height: 300 }}>
                  <StyledFieldContainer>
                    <StyledLabelContainer>
                      <Body>
                        *<FormattedMessage id="server-address" />{' '}
                      </Body>
                    </StyledLabelContainer>
                    <InputContainer>
                      <StandardInput
                        size={InputSizeEnum.large}
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

export { Connect };
