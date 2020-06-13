import * as dotenv from 'dotenv';
dotenv.config();

// node_env
const NODE_ENV: string = process.env.NODE_ENV || 'development';

// server
const PORT: number = +process.env.PORT || 3003;

// typeorm/postgres
const TYPEORM_TYPE: string = process.env.TYPEORM_TYPE;
const TYPEORM_HOST: string = process.env.TYPEORM_HOST;
const TYPEORM_PORT: number = +process.env.TYPEORM_PORT;
const TYPEORM_USERNAME: string = process.env.TYPEORM_USERNAME;
const TYPEORM_PASSWORD: string = process.env.TYPEORM_PASSWORD;
const TYPEORM_DATABASE: string = process.env.TYPEORM_DATABASE;
const TYPEORM_SYNCHRONIZE = process.env.TYPEORM_SYNCHRONIZE;

// jwt
const JWT_SECRET: string = process.env.JWT_SECRET;
const JWT_EXPIRESIN: number = +process.env.JWT_EXPIRESIN;
const JWT_REFRESH: string = process.env.JWT_REFRESH;
const JWT_REFRESH_EXPIRESIN: number = +process.env.JWT_REFRESH_EXPIRESIN;

// bcryptjs
const SALT = +process.env.SALT;

export {
  NODE_ENV,
  PORT,
  JWT_SECRET,
  JWT_REFRESH,
  JWT_EXPIRESIN,
  JWT_REFRESH_EXPIRESIN,
  SALT,
  TYPEORM_TYPE,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_SYNCHRONIZE,
};
