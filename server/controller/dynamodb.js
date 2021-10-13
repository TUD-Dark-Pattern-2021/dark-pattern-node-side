const baseController = require('./base.js');
const commons = require('../utils/commons');
const ddbClient = require("../ddb.js")
const DynamoDB = require("@aws-sdk/client-dynamodb");
const GetObjectCommand = require("@aws-sdk/client-s3");
const s3c = require("../s3.js");
const S3 = require("@aws-sdk/client-s3");
const CSVToJSON = require('csvtojson');
const s3 = require("../s3Client.js")
const docClient = require("../docClient.js")

// const fs = require('fs');

class dynamodbController extends baseController {
    constructor(req, res) {
        super(req, res);

    }

    async addItem(req, res) {

        var table = "DarkPatterns";

        let params = {
            TableName: table,
            Item: {
                url: {
                    S: req.body.url
                },
                category: {
                    S: req.body.category
                },
                country_rank: {
                    N: req.body.country_rank
                },
                deceptive: {
                    BOOL: req.body.deceptive
                },
                dp: {
                    BOOL: req.body.dp
                },
                global_rank: {
                    N: req.body.global_rank
                },
                page_views_per_million: {
                    N: req.body.page_views_per_million
                },
                page_views_per_user: {
                    N: req.body.page_views_per_user
                },
                reach_per_million: {
                    N: req.body.reach_per_million
                },

            }
        };
        console.log(params, 'params')

        console.log("Adding a new item...");

        const run = async () => {
            try {
                const data = await ddbClient.send(new DynamoDB.PutItemCommand(params));
                console.log(data);
                res.send(commons.resReturn(params.Item.url));
                return data;
            } catch (err) {
                console.error(err);
            }
        };
        run();
    }
    async getItem(req, res) {
        var table = "DarkPatterns";
        let params = {
            TableName: table,
            Key: {
                url: { S: req.body.url },
            },
            ProjectionExpression: "#u",
            ExpressionAttributeNames: {
                "#u": "url"
            }
        };

        const run = async () => {
            const data = await ddbClient.send(new DynamoDB.GetItemCommand(params));
            console.log("Success", data.Item);
            res.send(commons.resReturn(data.Item));
            return data;
        };
        run();
    }

    async deleteItem(req, res) {
        var table = "DarkPatterns";
        let params = {
            TableName: table,
            Key: {
                url: { S: req.body.url },
            },
        };

        const run = async () => {
            try {
                const data = await ddbClient.send(new DynamoDB.DeleteItemCommand(params));
                console.log("Success, item deleted", data);
                res.send(commons.resReturn(data));
                return data;
            } catch (err) {
                if (err && err.code === "ResourceNotFoundException") {
                    console.log("Error: Table not found");
                } else if (err && err.code === "ResourceInUseException") {
                    console.log("Error: Table in use");
                }
            }
        };
        run();
    }

    async s3Test() {
        const bucketParams = {
            Bucket: "darkpatternsdatasets",
            Key: "dark_patterns.csv",
        };

        const run = async () => {
            try {
                const streamToString = (stream) =>
                    new Promise((resolve, reject) => {
                        const chunks = [];
                        stream.on("data", (chunk) => chunks.push(chunk));
                        stream.on("error", reject);
                        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
                    });
                    
                const data = await s3c.send(new S3.GetObjectCommand(bucketParams));
                // console.log(data)
                const bodyContents = await streamToString(data.Body);
                console.log(bodyContents);
                return bodyContents;
            } catch (err) {
                console.log("Error", err);
            }
        };
        run();
    }

    async storeDataset(res) {
        const bucketParams = {
            Bucket: "darkpatternsdatasets",
            Key: "dark_patterns.csv",
        };

            console.log("Importing dataset into DynamoDB. Please wait.");

            const streamToString = (stream) =>
                    new Promise((resolve, reject) => {
                        const chunks = [];
                        stream.on("data", (chunk) => chunks.push(chunk));
                        stream.on("error", reject);
                        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
                    });

                const data = await s3c.send(new S3.GetObjectCommand(bucketParams));
                // console.log(data)
                const bodyContents = await streamToString(data.Body);
                // console.log(bodyContents);

        // CSVToJSON().fromFile("https://darkpatternsdatasets.s3.eu-west-1.amazonaws.com/dark_patterns.csv")
        
                const dataset = JSON.parse(bodyContents)
                console.log(dataset)
                dataset.forEach(function (datas) {
                    let params = {
                        TableName: "Dataset",
                        Item: {
                            Pattern_String: {
                                S: datas['Pattern String']
                            },
                            Comment: {
                                S: datas.comment
                            },
                            Pattern_Category: {
                                S: datas['Pattern Category']
                            },
                            Pattern_Type: {
                                S: datas['Pattern Type']
                            },
                            Where_in_website: {
                                S: datas['Where in website?']
                            },
                            Deceptive: {
                                BOOL: datas['Deceptive?']
                            },
                            Website_Page: {
                                S: datas['Website Page']
                            }
                        }
                    };

                    const run = async () => {
                        try {
                            const data = await ddbClient.send(new DynamoDB.BatchWriteItemCommand(params));
                            console.log("Success, items added", data);
                            res.send(commons.resReturn(data));
                            return data;
                        } catch (err) {
                            if (err && err.code === "ResourceNotFoundException") {
                                console.log("Error: Table not found");
                            } else if (err && err.code === "ResourceInUseException") {
                                console.log("Error: Table in use");
                            }
                        }
                    };
                    run();
                });
                console.log(dataset);
           

        // var dataset = JSON.parse(fs.readFileSync("https://darkpatternsdatasets.s3.eu-west-1.amazonaws.com/" + req.body.url+".csv", 'utf8'));

    }

    async pushData(){

        const bucketName = "darkpatternsdatasets";
        const keyName = "dark_patterns.csv";
        const params = { 
            Bucket: bucketName,
            Key: keyName 
        };

        const s3Stream = s3.getObject(params).createReadStream()

    CSVToJSON().fromStream(s3Stream)
         .on('data', (row) => {
            let datas = JSON.parse(row);
            // console.log(datas.comment);
            
            // console.log(JSON.stringify(datas));

            let paramsDataset = {
                TableName: "Dataset",
                Item: {
                    "Pattern_String": datas['Pattern String'],
                    
                    "Comment": datas.comment,
                 
                    "Pattern_Category:": datas['Pattern Category'],
                   
                    "Pattern_Type:": datas['Pattern Type'],
                   
                   " Where_in_website:": datas['Where in website?'],
                   
                    "Deceptive":  datas['Deceptive?'],
                    
                    "Website_Page":  datas['Website Page'],
                   
                }
            };
            console.log(paramsDataset)
            addData(paramsDataset);
        });
        // const run = async () => {
        //     try {
        //         const data = await ddbClient.send(new DynamoDB.PutItemCommand(paramsDataset));
        //         console.log("Success, items added", data);
        //         // res.send(commons.resReturn(data));
        //         return data;
        //     } catch (err) {
        //         if (err && err.code === "ResourceNotFoundException") {
        //             console.log("Error: Table not found");
        //         } else if (err && err.code === "ResourceInUseException") {
        //             console.log("Error: Table in use");
        //         }
        //     }
        // };
        //     console.log(paramsDataset.Item.Pattern_String)
        //     // console.log("adad")
            
        // });
         
    };

     

    // async getReq(req, res) {
    //     var table = "DarkPatternsReqRes";
    //     console.log("Getting Request")
    //     let params = {

    //         TableName: table,
    //         Key: {
    //             request: { S: req.body.request },
    //         },
    //         ProjectionExpression: "#r",
    //         ExpressionAttributeNames: {
    //             "#r": "request"
    //         }

    //     };
    //     console.log(params)
    //     console.log("Getting Response")

    //     const run = async () => {
    //         const data = await ddbClient.send(new DynamoDB.GetItemCommand(params));
    //         console.log("Success", data.Item);
    //         res.send(commons.resReturn(data.Item));
    //         return data;
    //     };
    //     run();
    // }


}

function addData(paramsDataset) {

    console.log("Adding a new item based on: ");
            docClient.put(paramsDataset, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Added item:", JSON.stringify(paramsDataset.Item, null, 2));
                }
            });
        }
  


module.exports = dynamodbController;