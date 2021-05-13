import { resolve } from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tempFolder = resolve(__dirname, '..', '..', 'temp');
export default {
  tempFolder,
  uploadsFolder: resolve(tempFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callback) {
      const now = new Date().getTime();
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${now}-${fileHash}_${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
