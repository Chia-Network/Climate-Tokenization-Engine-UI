import React, { useEffect, useState, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

const StyledPageContainer = styled('div')`
  padding-left: 40px;
  padding-right: 40px;
  height: 100%;
`;

import {
  Body,
  ConfirmDetokanizationModal,
  DetokenizeModal,
  PrimaryButton,
  StyledFieldContainer,
  StyledLabelContainer,
} from '../components';
import { useWindowSize } from '../hooks/useWindowSize';
import { setUnitToBeDetokenized } from '../store/actions/appActions';

const RevertTokens = () => {
  const [isDetokenizeModalOpen, setIsDetokenizeModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const { unitToBeDetokenized } = useSelector(app => app);
  const intl = useIntl();
  const unitsContainerRef = useRef(null);
  const [modalSizeAndPosition, setModalSizeAndPosition] = useState(null);
  const windowSize = useWindowSize();
  const dispatch = useDispatch();

  useEffect(() => {
    if (unitToBeDetokenized) {
      setIsConfirmationModalOpen(true);
    }
  }, [unitToBeDetokenized]);

  useEffect(() => {
    if (unitsContainerRef && unitsContainerRef.current) {
      setModalSizeAndPosition({
        left: unitsContainerRef.current.getBoundingClientRect().x,
        top: unitsContainerRef.current.getBoundingClientRect().y,
        width: unitsContainerRef.current.getBoundingClientRect().width,
        height: unitsContainerRef.current.getBoundingClientRect().height,
      });
    }
  }, [
    unitsContainerRef,
    unitsContainerRef.current,
    windowSize.height,
    windowSize.width,
  ]);

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    dispatch(setUnitToBeDetokenized(null));
  };

  return (
    <StyledPageContainer ref={unitsContainerRef}>
      <StyledFieldContainer></StyledFieldContainer>
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
        {isConfirmationModalOpen && (
          <ConfirmDetokanizationModal
            onClose={closeConfirmationModal}
            data={unitToBeDetokenized}
            modalSizeAndPosition={modalSizeAndPosition}
          />
        )}
      </StyledFieldContainer>
    </StyledPageContainer>
  );
};

export { RevertTokens };
