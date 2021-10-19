const AWS = require('aws-sdk');
const jsonfile = require('jsonfile');

let credentials = jsonfile.readFileSync('./aws-credentials.json')
const dyanmoToS3 = new AWS.DynamoDB({
    region: "eu-west-1",
    credentials: credentials});

module.exports = dyanmoToS3