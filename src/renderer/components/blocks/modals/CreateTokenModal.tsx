import React, { useRef, useState } from 'react';
import { Button, ComponentCenteredSpinner, CreateTokenForm, CreateTokenFormRef, Modal, Table } from '@/components';
import { FormattedMessage } from 'react-intl';
import { useGetAddressBookQuery, useGetProjectQuery, useGetUnitQuery, useTokenizeUnitMutation } from '@/api';
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import { useWildCardUrlHash } from '@/hooks';

interface UpsertModalProps {
  onTokenizationSuccess: () => void;
  onClose: () => void;
}

const CreateTokenModal: React.FC<UpsertModalProps> = ({ onClose, onTokenizationSuccess }: UpsertModalProps) => {
  const [tokenizeUrlFragment] = useWildCardUrlHash('tokenize');
  const urlHashValues: string[] = tokenizeUrlFragment?.replace('tokenize-', '')?.split('^');
  const warehouseUnitId = urlHashValues?.length >= 1 ? urlHashValues[0] : '';
  const warehouseProjectId = urlHashValues?.length >= 2 ? urlHashValues[1] : '';
  const [tokenizationProcessing, setTokenizationProcessing] = useState<boolean>(false);

  const [showTokenizationFailure, setShowTokenizationFailure] = useState<boolean>(false);
  const { data: unit, isLoading: unitLoading } = useGetUnitQuery(
    { warehouseUnitId },
    { skip: showTokenizationFailure },
  );
  const { data: project, isLoading: projectLoading } = useGetProjectQuery(
    { warehouseProjectId },
    { skip: showTokenizationFailure },
  );
  const [triggerTokenizeUnit, { error: tokenizationError }] = useTokenizeUnitMutation();
  const createTokenFormRef = useRef<CreateTokenFormRef>(null);
  const { data: addressBookData } = useGetAddressBookQuery({ page: 1, limit: 1000 });

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

  const onSubmitTokenization = async () => {
    setShowTokenizationFailure(false);
    setTokenizationProcessing(true);

    const walletAddress = await createTokenFormRef.current?.submitForm();
    if (!walletAddress) {
      setTokenizationProcessing(false);
      return;
    }

    if (unit && project && requiredFieldsPresent) {
      const submitData = {
        org_uid: (unit?.orgUid ? unit.orgUid : project.orgUid) as string,
        warehouse_project_id: warehouseProjectId as string,
        vintage_year: unit.vintageYear as number,
        sequence_num: 0,
        warehouseUnitId: warehouseUnitId as string,
        to_address: walletAddress as string,
        amount: unit.unitCount as number,
      };

      const result = await triggerTokenizeUnit(submitData);
      if (result?.error || tokenizationError) {
        setShowTokenizationFailure(true);
      } else {
        onClose();
        onTokenizationSuccess();
      }
    } else {
      setShowTokenizationFailure(true);
    }

    setTokenizationProcessing(false);
  };

  const modalBody = () => {
    if (unitLoading || projectLoading) {
      return (
        <div className="h-72">
          <ComponentCenteredSpinner label={<FormattedMessage id="loading-unit-and-associated-project" />} />
        </div>
      );
    } else if (unit && project && requiredFieldsPresent) {
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
            <CreateTokenForm ref={createTokenFormRef} data={addressBookData?.data} />
          </div>
          <div className="flex">
            <Button onClick={onSubmitTokenization} isProcessing={tokenizationProcessing}>
              <p className="capitalize">
                <FormattedMessage id="create-token" />
              </p>
            </Button>
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
