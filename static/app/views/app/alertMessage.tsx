import * as React from 'react';
import styled from '@emotion/styled';

import AlertActions from 'app/actions/alertActions';
import Alert from 'app/components/alert';
import Button from 'app/components/button';
import ExternalLink from 'app/components/links/externalLink';
import {IconCheckmark, IconClose, IconWarning} from 'app/icons';
import {t} from 'app/locale';
import space from 'app/styles/space';

type AlertType = {
  /**
   * A lot of alerts coming from getsentry do not have an `id`
   */
  id?: string;
  message: React.ReactNode;
  type: 'success' | 'error' | 'warning' | 'info';
  url?: string;
  onClose?: () => void;
};

type Props = {
  alert: AlertType;
  system: boolean;
};

const AlertMessage = ({alert, system}: Props) => {
  const handleCloseAlert = () => {
    AlertActions.closeAlert(alert);
  };

  const {url, message, type} = alert;
  const icon =
    type === 'success' ? (
      <IconCheckmark size="md" isCircled />
    ) : (
      <IconWarning size="md" />
    );

  return (
    <StyledAlert type={type} icon={icon} system={system}>
      <StyledMessage>
        {url ? <ExternalLink href={url}>{message}</ExternalLink> : message}
      </StyledMessage>
      <StyledCloseButton
        icon={<IconClose size="md" isCircled />}
        aria-label={t('Close')}
        onClick={alert.onClose ?? handleCloseAlert}
        size="zero"
        borderless
      />
    </StyledAlert>
  );
};

export default AlertMessage;

const StyledAlert = styled(Alert)`
  padding: ${space(1)} ${space(2)};
  margin: 0;
`;

const StyledMessage = styled('span')`
  display: block;
  margin: auto ${space(4)} auto 0;
`;

const StyledCloseButton = styled(Button)`
  background-color: transparent;
  opacity: 0.4;
  transition: opacity 0.1s linear;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);

  &:hover,
  &:focus {
    background-color: transparent;
    opacity: 1;
  }
`;
