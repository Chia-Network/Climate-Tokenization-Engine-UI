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
import { importHomeOrg } from '../../store/actions/appActions';

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

const Connect = withTheme(() => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const { homeOrgUid } = useSelector(state => state);
  const [orgUid, setOrgUid] = useState(homeOrgUid || '');
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

  useEffect(() => {
    setOrgUid(homeOrgUid);
  }, [homeOrgUid]);

  return (
    <>
      <ConnectContainer onClick={() => setIsConnectModalOpen(true)}>
        {!homeOrgUid && <FormattedMessage id="connect-to-cw" />}
        {homeOrgUid && <FormattedMessage id="connected" />}
      </ConnectContainer>

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

export { Connect };
