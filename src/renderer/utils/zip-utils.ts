import { BlobReader, TextWriter, ZipReader } from '@zip.js/zip.js';

/**
 * extracts a zip file and tries to retrieve the contents of a file in the top directory as a string
 * @param zipFile to unzip
 * @param fileNameToRetrieve file in root of the archive to get contents as string
 * @param password if the archive it password protected
 */
export const extractPasswordProtectedZip = async (
  zipFile: File,
  fileNameToRetrieve: string,
  password: string = '',
): Promise<{ success: boolean; fileContent: string; badPassword?: boolean }> => {
  try {
    const reader = new ZipReader(new BlobReader(zipFile), password ? { password } : {});
    const entries = await reader.getEntries();

    for (const entry of entries) {
      if (!entry.directory && entry.filename === fileNameToRetrieve) {
        if (!entry?.getData) {
          throw new Error('cannot get data for specified file');
        }
        return {
          success: true,
          fileContent: await entry.getData(new TextWriter('utf8')),
        };
      }
    }

    return { success: false, fileContent: '' };
  } catch (error: any) {
    console.error('Error extracting from ZIP archive:', error);

    const errorMessage: string = (() => {
      if (error instanceof Error) {
        return error.message;
      } else if (typeof error === 'string') {
        return error;
      } else {
        return '';
      }
    })();

    if (errorMessage?.includes('password')) {
      return { success: false, fileContent: '', badPassword: true };
    }
    return { success: false, fileContent: '' };
  }
};
