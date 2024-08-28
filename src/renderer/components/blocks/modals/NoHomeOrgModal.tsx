import { Modal, Spinner } from '@/components';
import { FormattedMessage } from 'react-intl';
import React, { useEffect, useMemo, useState } from 'react';
import { useGetHealthQuery, useGetHomeOrgQuery } from '@/api';
import { useUrlHash } from '@/hooks';

const NoHomeOrgModal: React.FC = () => {
  const { data: serverHealth, isLoading: healthLoading, refetch: refetchHealth } = useGetHealthQuery({});
  const { data: homeOrg, isFetching: homeOrgLoading, refetch: refetchHomeOrg } = useGetHomeOrgQuery();
  const [connectModalActive] = useUrlHash('connect');
  const [closeClicked, setCloseClicked] = useState(false);

  const handleClose = () => {
    setCloseClicked(true);
    refetchHealth();
    refetchHomeOrg();
  };

  useEffect(() => {
    if (closeClicked && !healthLoading && !homeOrgLoading) {
      setCloseClicked(false);
    }
  }, [closeClicked, healthLoading, homeOrgLoading]);

  const showModal = useMemo<boolean>(
    () =>
      Boolean(((serverHealth && !healthLoading && !homeOrg && !homeOrgLoading) || closeClicked) && !connectModalActive),
    [closeClicked, connectModalActive, healthLoading, homeOrg, homeOrgLoading, serverHealth],
  );

  return (
    <Modal show={showModal} onClose={handleClose}>
      <Modal.Header>
        <p className="capitalize">
          <FormattedMessage id="no-owned-organization-found" />
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className="flex space-x-2.5">
          <p className="sentence-case">
            <FormattedMessage id="please-create-an-organization-to-use-this-application" />.
          </p>
          {closeClicked && <Spinner />}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { NoHomeOrgModal };
