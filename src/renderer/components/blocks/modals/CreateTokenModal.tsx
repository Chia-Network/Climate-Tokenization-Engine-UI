import React, { useMemo } from 'react';
import { Button, ComponentCenteredSpinner, Modal } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useGetProjectQuery, useGetUnitQuery } from '@/api';

interface UpsertModalProps {
  tokenizeUrlFragment: string;
  onClose: () => void;
}

const CreateTokenModal: React.FC<UpsertModalProps> = ({ onClose, tokenizeUrlFragment }: UpsertModalProps) => {
  const urlHashValues: string[] = tokenizeUrlFragment?.replace('tokenize-', '')?.split('^');
  const warehouseUnitId = urlHashValues?.length >= 1 ? urlHashValues[0] : '';
  const warehouseProjectId = urlHashValues?.length >= 2 ? urlHashValues[1] : '';
  console.log(warehouseProjectId, warehouseUnitId);
  const { data: unit, isFetching: unitLoading } = useGetUnitQuery({ warehouseUnitId });
  const { data: project, isFetching: projectLoading } = useGetProjectQuery({ warehouseProjectId });

  console.log('unit', unit);
  console.log('project', project);

  const modalBody = useMemo(() => {
    if (unitLoading || projectLoading) {
      return (
        <div className="h-20">
          <ComponentCenteredSpinner label={<FormattedMessage id="loading-unit-and-associated-project" />} />
        </div>
      );
    } else if (unit && project) {
      return (
        <div>
          {project.projectName}
          {unit.serialNumberBlock}
        </div>
      );
    } else {
      return (
        <p className="sentence-case">
          <FormattedMessage id="unable-to-load-tokenization-data" />
        </p>
      );
    }
  }, [project, projectLoading, unit, unitLoading]);

  return (
    <Modal onClose={onClose} show={true} size={'5xl'}>
      <Modal.Header>
        <p className="capitalize">
          <FormattedMessage id="create-token" />
        </p>
      </Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
      <Modal.Footer>
        <Button disabled={!project || !unit || projectLoading || unitLoading}>
          <p className="capitalize">
            <FormattedMessage id="create-token" />
          </p>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { CreateTokenModal };
