// https://keystonejs.com/docs/apis/config#storage-images-and-files
import { StorageConfig } from '@keystone-6/core/types';

const storage: Record<string, StorageConfig> = {};

const {
  S3_BUCKET_NAME: bucketName,
  S3_REGION: region,
  S3_ACCESS_KEY_ID: accessKeyId,
  S3_SECRET_ACCESS_KEY: secretAccessKey,
} = process.env;

if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'The S3_BUCKET_NAME, S3_REGION, S3_ACCESS_KEY_ID and S3_SECRET_ACCESS_KEY environment variables must be set in production'
    );
  } else {
    storage.images = {
      kind: 'local',
      type: 'image',
      generateUrl: path => `http://localhost:3000/static${path}`,
      serverRoute: {
        path: '/static',
      },
      storagePath: 'public/static',
    };
    storage.files = {
      kind: 'local',
      type: 'file',
      generateUrl: path => `http://localhost:3000/static${path}`,
      serverRoute: {
        path: '/static',
      },
      storagePath: 'public/static',
    };
  }
} else {
  storage.images = {
    kind: 's3',
    type: 'image',
    bucketName,
    region,
    accessKeyId,
    secretAccessKey,
    signed: { expiry: 5000 },
    endpoint: 'http://127.0.0.1:9000/',
    forcePathStyle: true,
  };
  storage.files = {
    kind: 's3',
    type: 'file',
    bucketName,
    region,
    accessKeyId,
    secretAccessKey,
    signed: { expiry: 5000 },
    endpoint: 'http://127.0.0.1:9000/',
    forcePathStyle: true,
  };
}

export { storage };
