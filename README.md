# awsstreaming
The easiest HD video AWS S3 streaming app

This is a project I made to substitute a blog I wrote on Dev Community. Be sure to read the blog and let me know how you like it!

[Streaming file from AWS S3 using NodeJS Stream API with Typescript](https://dev.to/about14sheep/streaming-data-from-aws-s3-using-nodejs-stream-api-and-typescript-3dj0)

## Prerequisite

In order to run this app you will need to have an AWS S3 account and bucket to obtain your access key and secret.
You can follow [this guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/setting-up-s3.html) to set it up.

You will also need to download a HD .mp4 video file. I used [this awesome coffee one](https://www.videezy.com/food-and-drink/80-coffee-cup-stock-video-in-high-definition)

## A quick note

This is an extremely simple streaming solution to show the power of the NodeJS Readable class in the standard Stream module. 
Although the `SmartStream` class is extremely solid, the express server and streaming implementation is not.

After the reception I have recieved from the blog, I decided I would make this test project to help people understand how to use this streaming solution for video.
For a second I thought I would do an entire blog, and implement the `SmartStream` proper, alas I am lazy. If I am going to do another blog it won't be about writing a frontend, it's just not my cup of tea.

You can browse through the files and see that we are making a HD video streaming app with only a few simple lines of code.
We are literally piping the `SmartStream` directly into the http response, no headers or anything.
Although this is very cool, and shows the power of the `SmartStream` class, more work should go into implementing a legit streaming solution.

## Getting started

Clone or fork this repo to get it on your machine.

## Adding your environment variables

You need to add a `.env` file

From the root of the project run:
```
touch .env
```

Then copy this into the .env file and replace the values with your variables.

```
S3_ACCESS_KEY=<Your S3 access key>
S3_SECRET_KEY=<Your S3 secret key>
S3_BUCKET=<Your S3 bucket>
S3_KEY=<Your video file name (leave off the .mp4 extension)>
```

## Download the packages

We are only using the `aws-sdk`, `express`, and `dotenv` packages to keep it incredibly simple

Run the install command:
```
npm install
```

## Running the program

I have added simple build, clean, and copy-file commands into the package.json scripts so all you need to do is run:
```
npm start
```

After this you can visit `http://localhost:8080/` and you should see your HD video start playing!
