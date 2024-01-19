import * as Joi from 'joi';

/**
 * @fileoverview Joi validation schema for the env vars
 * @description Define validation for the env vars, throw an error if validation fails
 * @author Ugram Team
 * @version 1.0.0
 */

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production').default('development'),
  HOST: Joi.string().required().default('localhost'),
  PORT: Joi.number().required().default(3000),
  CLIENT_ORIGIN: Joi.string().required().default('http://localhost:5173'),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required().default('1d'),
  JWT_IGNORE_EXPIRATION: Joi.boolean().required().default(true),
  MONGODB_URI: Joi.string().required().default('mongodb://root:example@localhost:27017/'),
  AWS_S3_BUCKET: Joi.string().required(),
  AWS_REGION: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CALLBACK_URL: Joi.string().required(),
  GOOGLE_ANALYTICS_TRACKING_ID: Joi.string().required(),
});
