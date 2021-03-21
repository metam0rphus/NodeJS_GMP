import { pipeline, Transform } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import csv from 'csvtojson';

const formatBook = (book) => Object.fromEntries(
    Object.entries(book)
        .map(([key, value]) => [key.toLowerCase(), value])
);

const formatter = () => new Transform({
    transform: (data, _, done) => Promise.resolve(data.toString())
        .then(JSON.parse)
        .then(formatBook)
        .then(JSON.stringify)
        .then(str => done(null, str + "\n"))
        .catch(err => {
            throw err
        })
});

pipeline(
    createReadStream('./csv/input.csv'),
    csv(),
    formatter(),
    createWriteStream('./output.txt'),
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('Pipeline succeeded.');
        }
    }
);