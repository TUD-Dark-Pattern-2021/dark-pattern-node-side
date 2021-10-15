const AWS = require('aws-sdk');
const jsonfile = require('jsonfile');

let credentials = jsonfile.readFileSync('./aws-credentials.json')

const s3Client = new AWS.S3({
    region: "eu-west-1",
    credentials: credentials
})

module.exports = s3Client