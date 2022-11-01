import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';

const StyledPageContainer = styled('div')`
  padding: 40px;
`;

import {
  Body,
  DetokenizeModal,
  PrimaryButton,
  StyledFieldContainer,
  StyledLabelContainer,
} from '../components';

const RevertTokens = () => {
  const [isDetokenizeModalOpen, setIsDetokenizeModalOpen] = useState(false);
  const intl = useIntl();

  const { notification } = useSelector(store => store);

  const isDetokenizationProcessSuccessful =
    notification && notification.id === 'unit-was-detokenized';
  useEffect(() => {
    if (isDetokenizationProcessSuccessful) {
      setIsDetokenizeModalOpen(false);
    }
  }, [notification]);

  return (
    <StyledPageContainer>
      <StyledFieldContainer>
        <StyledLabelContainer>
          <Body size="Bold">
            <FormattedMessage id="revert-tokens" />
          </Body>
        </StyledLabelContainer>

        <PrimaryButton
          label={intl.formatMessage({
            id: 'detokenize',
          })}
          onClick={() => setIsDetokenizeModalOpen(true)}
        />
        {isDetokenizeModalOpen && (
          <DetokenizeModal onClose={() => setIsDetokenizeModalOpen(false)} />
        )}
      </StyledFieldContainer>
    </StyledPageContainer>
  );
};

export { RevertTokens };
