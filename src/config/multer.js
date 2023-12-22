import multer from 'multer'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);




const storageTypes = {
  local: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      let data = new Date();
      const fileName = `${data.getDate()}${data.getMonth()}${data.getFullYear()}-${data.getHours()}${data.getMinutes()}${data.getSeconds()}${data.getMilliseconds()}-${
        file.originalname
      }`;
      cb(null, fileName);
    },
  }),
//   s3: multerS3({
//     s3: new aws.S3(),
//     bucket: process.env.AWS_BUCKET,
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     acl: 'private',
//     key: (req, file, cb) => {
//       let data = new Date();
//       const fileName = `${data.getDate()}${data.getMonth()}${data.getFullYear()}-${data.getHours()}${data.getMinutes()}${data.getSeconds()}${data.getMilliseconds()}-${
//         file.originalname
//       }`;
//       cb(null, fileName);
//     },
//   }),
};

const multerConfig = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes[`${process.env.STORAGE_TYPE}`],
  limits: {
    filesize: 20 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {

    const filetypes = /text|csv|txt/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (extname) {
      return cb(null, true);
    } else {
      cb('Error: Invalid file type!');
    }
  },
};

export default multerConfig
