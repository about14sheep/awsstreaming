import * as AWS from "aws-sdk";
import {s3Env} from "../config";
import {S3ReadStream} from 's3-readstream';

export default async function createAWSStream(): Promise<S3ReadStream> {
    return new Promise((resolve, reject) => {
        const bucketParams = {
            Bucket: s3Env.bucket,
            Key: s3Env.key + '.mp4'
        }

        try {
            const s3 = new AWS.S3({
                accessKeyId: s3Env.accessKey,
                secretAccessKey: s3Env.secret
            });

            s3.headObject(bucketParams, (error, data) => {
                if (error) {
                    throw error
                };
                
                const options = {
                  parameters: bucketParams,
                  s3,
                  maxLength: data.ContentLength,
                  byteRange: 1024 * 1024 * 5
                };

                const stream = new S3ReadStream(options);

                resolve(stream);
            })
        } catch (error) {
            reject(error);
        }
    })
}
