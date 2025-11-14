import dotenv from 'dotenv';

dotenv.config();

const required = (value: string | undefined, key: string, fallback?: string) => {
  if (!value) {
    if (process.env.NODE_ENV !== 'production' && fallback !== undefined) {
      console.warn(`Using fallback value for ${key}`);
      return fallback;
    }
    throw new Error(`Missing required env var ${key}`);
  }
  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  mongoUri: required(process.env.MONGO_URI, 'MONGO_URI'),
  firebaseServiceAccount: required(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
    'FIREBASE_SERVICE_ACCOUNT_KEY',
    '{}'
  ),
  stripeSecretKey: required(process.env.STRIPE_SECRET_KEY, 'STRIPE_SECRET_KEY', 'sk_test'),
  awsRegion: process.env.AWS_REGION ?? 'us-east-1',
  awsAccessKeyId: required(process.env.AWS_ACCESS_KEY_ID, 'AWS_ACCESS_KEY_ID', 'local'),
  awsSecretAccessKey: required(process.env.AWS_SECRET_ACCESS_KEY, 'AWS_SECRET_ACCESS_KEY', 'local'),
  s3BucketName: required(process.env.S3_BUCKET_NAME, 'S3_BUCKET_NAME', 'local-bucket'),
  adminEmails: (process.env.ADMIN_EMAILS ?? '').split(',').map((email) => email.trim()).filter(Boolean)
};
