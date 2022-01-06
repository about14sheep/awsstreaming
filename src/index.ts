import createAWSStream from './streamClient';
import express from 'express';

const app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/video', async function (req, res) {
    // Create the smart stream
    const stream = await createAWSStream();
    // Pipe it into the response
    stream.pipe(res);
});

app.listen(8080, function () {
    console.log('Server started on http://localhost:8080/');
});
