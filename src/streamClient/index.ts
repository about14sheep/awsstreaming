import * as AWS from "aws-sdk";
import {s3Env} from "../config";
import {SmartStream} from "./SmartStream";

export default async function createAWSStream(): Promise<SmartStream> {
    return new Promise((resolve, reject) => {
        const bucketParams = {
            Bucket: s3Env.bucket,
            Key: s3Env.key + '.mp4'
        };

        try {
            const s3 = new AWS.S3({
                accessKeyId: s3Env.accessKey,
                secretAccessKey: s3Env.secret
            });

            s3.headObject(bucketParams, (error, data) => {
                if (error) {
                    throw error
                };

                const stream = new SmartStream(bucketParams, s3, data.ContentLength);

                resolve(stream);
            })
        } catch (error) {
            reject(error);
        }
    })
}
