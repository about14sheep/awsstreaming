import {config} from "dotenv";
config();

export const s3Env = {
    accessKey: process.env.S3_ACCESS_KEY,
    secret: process.env.S3_SECRET_KEY,
    bucket: process.env.S3_BUCKET,
    key: process.env.S3_KEY
};
