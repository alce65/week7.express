import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

export const DATA_FILE = process.env.DATA_FILE;
export const USER = process.env.USER;
export const PASSWD = process.env.PASSWD;
export const CLUSTER = process.env.CLUSTER;
