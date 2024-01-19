/**
 * @fileoverview Configuration file
 * @description This file contains the configuration of the application
 * @author Ugram Team
 * @version 1.0.0
 */

export default () => ({
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    ignoreExpiration: process.env.JWT_IGNORE_EXPIRATION || true,
  },
  client: {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  },
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://root:example@mongo:27017/',
  },
  swagger: {
    title: process.env.SWAGGER_TITLE || 'Ugram API',
    description: process.env.SWAGGER_DESCRIPTION || 'Official Documentation',
    version: process.env.API_VERSION || '1.0',
  },
  bodyParser: {
    limit: process.env.BODY_PARSER_LIMIT || '50mb',
  },
  logger: {
    level: process.env.LOGGER_LEVEL || 'debug',
    prettyPrint: process.env.LOGGER_PRETTY_PRINT || true,
  },
  s3: {
    bucket: {
      region: process.env.AWS_REGION || 'us-east-1',
      name: process.env.AWS_S3_BUCKET || 'ugram-pictures',
    },
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:
      process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback',
    analytics: {
      trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
    },
  },
});
