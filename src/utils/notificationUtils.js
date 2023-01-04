import React from 'react';
import { NotificationManager } from 'react-notifications';
import { NotificationContainer as ReactNotificationContainer } from 'react-notifications';
import styled from 'styled-components';

const StyledNotificationContainer = styled('div')`
  .notification-parent,
  .notification-title,
  .notification-message,
  .notification-item {
    font-family: ${props => props.theme.typography.primary.regular};
    font-size: 14px;
    font-weight: 400;
  }
`;

export const createNotification = (type, message) => {
  switch (type) {
    case 'info':
      NotificationManager.info(message, 'Information', 5000);
      break;
    case 'ok':
    case 'success':
      NotificationManager.success(message, 'Success', 500);
      break;
    case 'warning':
      NotificationManager.warning(message, 'Warning', 5000);
      break;
    case 'error':
      NotificationManager.error(message, 'Error', 5000);
      break;
  }
};

export const NotificationContainer = () => {
  return (
    <StyledNotificationContainer>
      <ReactNotificationContainer />
    </StyledNotificationContainer>
  );
};
