import { configDotenv } from 'dotenv';
import * as joi from 'joi';
import { join } from 'path';

configDotenv(
    { path: join(__dirname, '../../../.env') }
)

interface EnvVars {
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    PORT: string;
}

const envsSchema = joi.object({
    DB_HOST: joi.string().required(),
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),
    PORT: joi.string().required()
}).unknown(true);

const {error, value} = envsSchema.validate(process.env);
if (error) throw new Error(`Config validation error: ${error.message}`)

const envVars: EnvVars = value

export const envs = {
    db_host: envVars.DB_HOST,
    db_user: envVars.DB_USER,
    db_password: envVars.DB_PASSWORD,
    db_name: envVars.DB_NAME,
    port: envVars.PORT
}