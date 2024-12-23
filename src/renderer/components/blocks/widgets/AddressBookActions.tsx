import { noop } from 'lodash';
import React, { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { Button, ConfirmDeleteAddressBookItemModal, Tooltip } from '@/components';
import { FormattedMessage } from 'react-intl';

interface AddressBookActionProps {
  uuid: string;
  openEditModal: (warehouseId: string) => void;
  openSplitModal?: (warehouseId: string) => void;
}

const AddressBookActions: React.FC<AddressBookActionProps> = ({
  uuid,
  openEditModal = noop,
}: AddressBookActionProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleClickDelete = () => {
    setShowDeleteModal(true);
  };

  const handleClickEdit = () => {
    openEditModal(uuid);
  };

  return (
    <>
      <Tooltip
        style="light"
        trigger="click"
        placement="right"
        content={
          <Button.Group>
            <Button onClick={handleClickEdit} outline>
              <FormattedMessage id="edit" />
            </Button>
            <Button onClick={handleClickDelete} outline>
              <FormattedMessage id="delete" />
            </Button>
          </Button.Group>
        }
      >
        <HiDotsVertical size="25" />
      </Tooltip>
      {showDeleteModal && <ConfirmDeleteAddressBookItemModal uuid={uuid} onClose={() => setShowDeleteModal(false)} />}
    </>
  );
};

export { AddressBookActions };
