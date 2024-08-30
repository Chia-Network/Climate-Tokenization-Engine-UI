import React, { useState } from 'react';
import { ComponentCenteredSpinner, CreateTokenForm, Modal, Table } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useGetProjectQuery, useGetUnitQuery } from '@/api';
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import { useWildCardUrlHash } from '@/hooks';

interface UpsertModalProps {
  onClose: () => void;
}

const CreateTokenModal: React.FC<UpsertModalProps> = ({ onClose }: UpsertModalProps) => {
  const [tokenizeUrlFragment] = useWildCardUrlHash('tokenize');
  const urlHashValues: string[] = tokenizeUrlFragment?.replace('tokenize-', '')?.split('^');
  const warehouseUnitId = urlHashValues?.length >= 1 ? urlHashValues[0] : '';
  const warehouseProjectId = urlHashValues?.length >= 2 ? urlHashValues[1] : '';

  const [showTokenizationFailure, setShowTokenizationFailure] = useState<boolean>(false);
  const [showTokenizationSuccess, setShowTokenizationSuccess] = useState<boolean>(false);

  const skip = showTokenizationFailure || showTokenizationSuccess;
  const { data: unit, isLoading: unitLoading } = useGetUnitQuery({ warehouseUnitId }, { skip });
  const { data: project, isLoading: projectLoading } = useGetProjectQuery({ warehouseProjectId }, { skip });

  const requiredFieldsPresent =
    unit &&
    project &&
    (unit?.orgUid || project?.orgUid) &&
    warehouseProjectId &&
    warehouseUnitId &&
    unit?.vintageYear &&
    unit?.unitBlockStart &&
    unit?.unitBlockEnd &&
    unit?.unitCount;

  const modalBody = () => {
    if (unitLoading || projectLoading) {
      return (
        <div className="h-72">
          <ComponentCenteredSpinner label={<FormattedMessage id="loading-unit-and-associated-project" />} />
        </div>
      );
    } else if (showTokenizationSuccess) {
      return <div className="h-72">tokenization succeeded</div>;
    } else if (unit && project && requiredFieldsPresent) {
      const tokenData = {
        org_uid: unit.orgUid as string,
        warehouse_project_id: project.warehouseProjectId as string,
        vintage_year: unit.vintageYear as number,
        sequence_num: 0,
        warehouseUnitId: unit.warehouseUnitId as string,
        amount: unit.unitCount as number,
      };

      return (
        <div className="space-y-5">
          <div className="border-2 rounded-lg" id="tokenizeInfo">
            <Table striped hoverable>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <p className="capitalize">
                      <FormattedMessage id="project-name" />
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    {project.projectName ? (
                      <p>{project.projectName}</p>
                    ) : (
                      <p className="capitalize">
                        <FormattedMessage id="not-specified" />
                      </p>
                    )}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <p className="capitalize">
                      <FormattedMessage id="project-id" />
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    {project.projectId ? (
                      <p>{project.projectId}</p>
                    ) : (
                      <p className="capitalize">
                        <FormattedMessage id="not-specified" />
                      </p>
                    )}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <p className="capitalize">
                      <FormattedMessage id="unit-owner" />
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    {unit.unitOwner ? (
                      <p>{unit.unitOwner}</p>
                    ) : (
                      <p className="capitalize">
                        <FormattedMessage id="not-specified" />
                      </p>
                    )}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <p className="capitalize">
                      <FormattedMessage id="quantity-of-credits" />
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    <p>{unit.unitCount}</p>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <p className="capitalize">
                      <FormattedMessage id="unit-block-start" />
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    <p>{unit.unitBlockStart}</p>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <p className="capitalize">
                      <FormattedMessage id="unit-block-end" />
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    <p>{unit.unitBlockEnd}</p>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <p className="capitalize">
                      <FormattedMessage id="vintage-year" />
                    </p>
                  </Table.Cell>
                  <Table.Cell>
                    <p>{unit.vintageYear}</p>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
          <div>
            <CreateTokenForm
              tokenData={tokenData}
              setApiFailure={setShowTokenizationFailure}
              setApiSuccess={setShowTokenizationSuccess}
            />
          </div>
        </div>
      );
    } else {
      return (
        <p className="sentence-case">
          <FormattedMessage id="unable-to-load-tokenization-data" />
        </p>
      );
    }
  };

  return (
    <Modal onClose={onClose} show={true} size={'4xl'}>
      <Modal.Header>
        <p className="capitalize">
          <FormattedMessage id="create-token" />
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-5">
          {showTokenizationFailure && (
            <Alert color="failure" icon={HiInformationCircle} onDismiss={() => setShowTokenizationFailure(false)}>
              <p className="sentence-case">
                <FormattedMessage id="an-error-occurred-while-trying-to-tokenize" />
              </p>
            </Alert>
          )}
          {modalBody()}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { CreateTokenModal };
