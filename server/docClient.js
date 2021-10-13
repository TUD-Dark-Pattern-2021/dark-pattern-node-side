const AWS = require('aws-sdk');
const jsonfile = require('jsonfile');

let credentials = jsonfile.readFileSync('./aws-credentials.json')
const docClient = new AWS.DynamoDB.DocumentClient({
    region: "eu-west-1",
    credentials: credentials});

module.exports = docClient