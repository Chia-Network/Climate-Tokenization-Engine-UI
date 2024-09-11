import React, { useState } from 'react';
import { DetokenizeUnitForm, DetokFormValues, Modal } from '@/components';
import { FormattedMessage } from 'react-intl';
import { extractPasswordProtectedZip } from '@/utils/zip-utils';
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import { useDetokenizeUnitMutation } from '@/api';

interface UpsertModalProps {
  onDetokenizationSuccess: () => void;
  onClose: () => void;
}

const ZIP_BAD_PASSWORD_TOKEN = 'invalid-zip-file-password';
const ZIP_CANNOT_EXTRACT_TOKEN = 'cannot-extract-detokenization-data-from-zip-file';
const API_FAILURE_TOKEN = 'an-error-occured-while-processing-detokenization';

const DetokenizeUnitModal: React.FC<UpsertModalProps> = ({ onClose, onDetokenizationSuccess }: UpsertModalProps) => {
  const [triggerDetokenizeUnit, { error: detokenizationError }] = useDetokenizeUnitMutation();
  const [failureAlertMessageToken, setFailureAlertMessageToken] = useState<string>('');

  const handleSubmitDetokenization = async (values: DetokFormValues): Promise<void> => {
    if (!values.detokenizationFile) {
      setFailureAlertMessageToken(ZIP_CANNOT_EXTRACT_TOKEN);
      return;
    }

    const unzipResult = await extractPasswordProtectedZip(
      values.detokenizationFile,
      values.detokenizationFile.name.replace('.zip', '.detok'),
      values.password,
    );

    console.log(unzipResult);

    if (!unzipResult.success && unzipResult?.badPassword) {
      setFailureAlertMessageToken(ZIP_BAD_PASSWORD_TOKEN);
      return;
    } else if (!unzipResult.success) {
      setFailureAlertMessageToken(ZIP_CANNOT_EXTRACT_TOKEN);
      return;
    } else {
      setFailureAlertMessageToken('');
    }

    const detokenizeResult = await triggerDetokenizeUnit(unzipResult.fileContent);

    if (detokenizeResult?.error || detokenizationError) {
      setFailureAlertMessageToken(API_FAILURE_TOKEN);
      return;
    }

    onDetokenizationSuccess();
  };

  return (
    <Modal onClose={onClose} show={true} size={'2xl'}>
      <Modal.Header>
        <p className="capitalize">
          <FormattedMessage id="detokenize-unit" />
        </p>
      </Modal.Header>
      <Modal.Body>
        {failureAlertMessageToken && (
          <Alert color="failure" icon={HiInformationCircle} onDismiss={() => setFailureAlertMessageToken('')}>
            <div className="flex space-x-1">
              <p className="capitalize font-bold">
                <FormattedMessage id="failed-to-detokenize" />:
              </p>
              <p className="sentence-case">
                <FormattedMessage id={failureAlertMessageToken} />
              </p>
            </div>
          </Alert>
        )}
        <div className="flex w-full items-center justify-center pt-4">
          <DetokenizeUnitForm onSubmit={handleSubmitDetokenization} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { DetokenizeUnitModal };
