import path from 'path';
import { constants, promises as fs } from 'fs';

/**
 * @param fileName {string}
 * @return Promise<boolean>
 */
export const checkAvailableFile = (fileName: string): Promise<boolean | string> => {
  return new Promise(resolve => {
    const jsonDirectory = path.join(process.cwd(), 'json');

    fs.access(`${jsonDirectory}/${fileName}`, constants.R_OK || constants.W_OK)
      .then(() => resolve('can access'))
      .catch(() => resolve('cannot access'));
  });
};


