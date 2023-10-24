import multer from '@koa/multer';
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';

const { DO_ACCESS_KEY, DO_ACCESS_SECRET_KEY, DO_BUCKET } = process.env;

const s3 = new S3Client({
  forcePathStyle: false,
  endpoint: 'https://nyc3.digitaloceanspaces.com/store',
  region: 'us-east-1',
  credentials: { accessKeyId: DO_ACCESS_KEY, secretAccessKey: DO_ACCESS_SECRET_KEY },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: DO_BUCKET,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {
        'Content-Disposition': `inline; filename="${file.originalname}"`,
      });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '_' + file.originalname);
    },
  }),
});

export { upload };
