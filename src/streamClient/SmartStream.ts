import {Readable, ReadableOptions} from "stream";
import type {S3} from "aws-sdk";

export class SmartStream extends Readable {
	_currentCursorPosition = 0; // Holds the current starting position for our range queries
	_s3DataRange = 2048 * 1024; // Amount of bytes to grab (I have jacked this up HD video files)
	_maxContentLength: number; // Total number of bites in the file
	_s3: S3; // AWS.S3 instance
	_s3StreamParams: S3.GetObjectRequest; // Parameters passed into s3.getObject method

	constructor(
		parameters: S3.GetObjectRequest,
		s3: S3,
		maxLength: number,
		// You can pass any ReadableStream options to the NodeJS Readable super class here
		// For this example we wont use this, however I left it in to be more robust
		nodeReadableStreamOptions?: ReadableOptions
	) {
		super(nodeReadableStreamOptions);
		this._maxContentLength = maxLength;
		this._s3 = s3;
		this._s3StreamParams = parameters;
	}

	_read() {
		if (this._currentCursorPosition > this._maxContentLength) {
			// If the current position is greater than the amount of bytes in the file
			// We push null into the buffer, NodeJS ReadableStream will see this as the end of file (EOF) and emit the 'end' event
			this.push(null);
		} else {
			// Calculate the range of bytes we want to grab
			const range = this._currentCursorPosition + this._s3DataRange;
			// If the range is greater than the total number of bytes in the file
			// We adjust the range to grab the remaining bytes of data
			const adjustedRange =
				range < this._maxContentLength ? range : this._maxContentLength;
			// Set the Range property on our s3 stream parameters
			this._s3StreamParams.Range = `bytes=${this._currentCursorPosition}-${adjustedRange}`;
			// Update the current range beginning for the next go
			this._currentCursorPosition = adjustedRange + 1;
			// Grab the range of bytes from the file
			this._s3.getObject(this._s3StreamParams, (error, data) => {
				if (error) {
					// If we encounter an error grabbing the bytes
					// We destroy the stream, NodeJS ReadableStream will emit the 'error' event
					this.destroy(error);
				} else {
					// We push the data into the stream buffer
					this.push(data.Body);
				}
			});
		}
	}
}
