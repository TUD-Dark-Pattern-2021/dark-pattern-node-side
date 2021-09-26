const DynamoDB = require("@aws-sdk/client-dynamodb");
const jsonfile = require('jsonfile');

let credentials = jsonfile.readFileSync('./aws-credentials.json')
const ddbClient = new DynamoDB.DynamoDBClient({
    region: "eu-west-1",
    credentials: credentials
  });

module.exports = ddbClient