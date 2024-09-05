import React from 'react';
import { FileInput, Label, Modal } from '@/components';
import { FormattedMessage } from 'react-intl';
import { AiOutlineUpload } from 'react-icons/ai';

interface UpsertModalProps {
  onDetokenizationSuccess: () => void;
  onClose: () => void;
}

const DetokenizeUnitModal: React.FC<UpsertModalProps> = ({ onClose, onDetokenizationSuccess }: UpsertModalProps) => {
  onDetokenizationSuccess();
  return (
    <Modal onClose={onClose} show={true} size={'4xl'}>
      <Modal.Header>
        <p className="capitalize">
          <FormattedMessage id="detokenize-unit" />
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className="flex w-full items-center justify-center">
          <Label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <AiOutlineUpload size={30} />
              <p className="p-2 text-sm text-gray-500 dark:text-gray-400 sentence-case">
                <FormattedMessage id="click-to-upload-or-drag-and-drop-detokenization-file" />
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {'.ZIP '}
                <FormattedMessage id="files-only" />
              </p>
            </div>
            <FileInput id="dropzone-file" className="hidden" />
          </Label>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { DetokenizeUnitModal };
