import { pipeline, Transform } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import csv from 'csvtojson';

const fieldsToOmit = ['Amount'];
const integerFields = ['Price'];

const formatBook = (book) => Object.fromEntries(
    Object.entries(book)
        .filter(([key]) => !fieldsToOmit.includes(key))
        .map(([key, value]) => [key, integerFields.includes(key) ? +value : value])
        .map(([key, value]) => [key.toLowerCase(), value])
);

const formatter = () => new Transform({
    transform: (data, _, done) => Promise.resolve(data.toString())
        .then(JSON.parse)
        .then(formatBook)
        .then(JSON.stringify)
        .then(str => done(null, str + '\n'))
        .catch(err => done(err))
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