const  S3 = require ("@aws-sdk/client-s3");
const jsonfile = require('jsonfile');


let credentials = jsonfile.readFileSync('./aws-credentials.json')
const s3c = new S3.S3Client({ 
    region: "eu-west-1",
    credentials: credentials
    });

module.exports = s3c