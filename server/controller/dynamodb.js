const baseController = require('./base.js');
const commons = require('../utils/commons');
const ddbClient = require("../ddb.js")
const DynamoDB = require("@aws-sdk/client-dynamodb");
const PutObjectCommand = require("@aws-sdk/client-s3");
const s3c = require("../s3.js");
const S3 = require("@aws-sdk/client-s3");
const CSVToJSON = require('csvtojson');
const s3 = require("../s3Client.js")
const docClient = require("../docClient.js")
const unmarshal = require("dynamodb-marshaler").unmarshal;
const Papa = require("papaparse");
const dynamoToS3 = require("../dynamoToS3.js")


const fs = require('fs');

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

    async pushData() {

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

                        "Deceptive": datas['Deceptive?'],

                        "Website_Page": datas['Website Page'],

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

    async dyanmoToS3(req, res) {
        let count = 0;
        let headers = [];
        let unMarshalledArray = [];
        const filename = req.body.filename;
        const tableName = "Dataset";
        // const test = true;
        const keyCon = "Pattern_String = :name"

        const query = {
            TableName: "Dataset",
            Select: "ALL_ATTRIBUTES",
            KeyConditionExpression: keyCon,
            ExpressionAttributeValues: { ":name": { S: "Your order is reserved for 19:57 minutes." } },
            // ProjectionExpression: "ALL_ATTRIBUTES",
            Limit: 10000
        };
        const keyCon1 = false

        const scanQuery = {
            TableName: "Dataset",
            Limit: 10000
        };

        if (filename) {
            var stream = fs.createWriteStream(filename, { flags: 'a' });
        }

        let rowCount = 0;
        let writeCount = 0;
        let writeChunk = 10000;

        // const describeTable = () => {
        //     console.log("describeTable")
        //     dynamoToS3.describeTable(
        //         {
        //             TableName: "Dataset"
        //         },
        //         function (err, data) {
        //             if (!err) {
        //                 console.dir(data.Table);
        //             } else console.dir(err);
        //         }
        //     );
        // };

        const scanDynamoDB = (query) => {
            console.log("scanDynamoDB")
            dynamoToS3.scan(query, function (err, data) {
                if (!err) {
                    unMarshalIntoArray(data.Items);
                    if (data.LastEvaluatedKey) {
                        query.ExclusiveStartKey = data.LastEvaluatedKey;
                        if (rowCount >= writeChunk) {
                            unparseData(data.LastEvaluatedKey);
                        }
                        scanDynamoDB(query);
                    } else {
                        unparseData("File Written");
                    }
                } else {
                    console.dir(err);
                }
            });
        };

        const appendStats = (params, items) => {
            console.log("appendStats")
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                let key = item["Pattern_String"].S;
                console.log(items)

                if (params.stats[key]) {
                    params.stats[key]++;

                } else {
                    params.stats[key] = 1;

                }

                rowCount++;
                console.log(rowCount)
            }
        }

        const printStats = (stats) => {
            console.log("printStats")
            if (stats) {
                console.log("\nSTATS\n----------");
                Object.keys(stats).forEach((key) => {
                    console.log(key + " = " + stats[key]);
                });
                writeCount += rowCount;
                rowCount = 0;
            }
        }

        const processStats = (params, data) => {
            console.log("processStats")
            let query = params.query;
            appendStats(params, data.Items);
            if (data.LastEvaluatedKey) {
                query.ExclusiveStartKey = data.LastEvaluatedKey;
                if (rowCount >= writeChunk) {
                    printStats(params.stats);
                }
                queryDynamoDB(params);
            }
        };

        const processRows = (params, data) => {
            console.log("processRows")
            let query = params.query;
            unMarshalIntoArray(data.Items);
            if (data.LastEvaluatedKey) {
                query.ExclusiveStartKey = data.LastEvaluatedKey;
                if (rowCount >= writeChunk) {
                    unparseData(data.LastEvaluatedKey);
                }
                queryDynamoDB(params);
            } else {
                unparseData("File Written");
            }
        };

        const queryDynamoDB = (params) => {
            console.log("query")
            let query = params.query;
            dynamoToS3.query(query, function (err, data) {
                if (!err) {
                    if ("Pattern_String") {
                        processStats(params, data);
                    } else {
                        processRows(params, data);
                    }
                } else {
                    console.dir(err);
                }
            });
        };

        const unparseData = (lastEvaluatedKey) => {
            var endData = Papa.unparse({
                fields: [...headers],
                data: unMarshalledArray
            });
            if (writeCount > 0) {
                endData = endData.replace(/(.*\r\n)/, "");;
            }
            if (filename) {
                writeData(endData);
            } else {
                console.log(endData);
            }
            console.log("last key:");
            console.log(lastEvaluatedKey);

            unMarshalledArray = [];
            writeCount += rowCount;
            rowCount = 0;
        }

        const writeData = (data) => {
            stream.write(data);

            const fileStream = fs.createReadStream(filename);
            let done = false;

            let uploadParams = {
                Bucket: "darkpatternsdatasets",
                Key: "darkpatterns.csv",
                Body: fileStream,
            };
            // let params = {
            //     Bucket: "darkpatternsdatasets",
            //     Key: "darkpatterns.csv",
            // }

            // let found = true;
            // uploadParams.Key = "V" + count.toString() + uploadParams.Key;
            // params.Key = "V" + count.toString() + params.Key;
            // console.log(uploadParams.Key);
            // const response = listObjectsS3(uploadParams)
            // let files;
            // console.log(response);
            // for(i in response.Contents){
            //     files.push(response.Contents[i])
            //     console.log(files);
            // }
            // while(found){
            //     if(files.includes(uploadParams.Key)){
            //         count++;
            //         uploadParams.Key = "V" + count.toString() + uploadParams.Key;
            //     }
            //     else{
            //         found = true;
            //     }

            // }
            const run = async () => {
                console.log("123")
                const data = await s3c.send(new S3.PutObjectCommand(uploadParams));
                console.log("Success", data);
                res.send(commons.resReturn(data));
                return data;
                
            
            };
            run();






            // console.log("File not Found ERROR : " + err.code)
            // const run = async () => {
            //     const data = await s3c.send(new S3.PutObjectCommand(uploadParams));
            //     console.log("Success", data);
            //     res.send(commons.resReturn(data));
            //     return data;
            // };
            // run();



            // s3c.send(new PutObjectCommand(uploadParams));
            // ('darkpatternsdatasets', "dark_patterns.csv",data)
            // object.put(data)
        };

        const unMarshalIntoArray = (items) => {
            if (items.length === 0) return;

            items.forEach(function (row) {
                let newRow = {};

                Object.keys(row).forEach(function (key) {
                    if (headers.indexOf(key.trim()) === -1) {
                        headers.push(key.trim());
                    }
                    let newValue = unmarshal(row[key]);

                    if (typeof newValue === "object") {
                        newRow[key] = JSON.stringify(newValue);
                    } else {
                        newRow[key] = newValue;
                    }
                });

                unMarshalledArray.push(newRow);
                rowCount++;
            });
        }
        // if (test) describeTable(scanQuery);
        if (keyCon1) queryDynamoDB(
            {
                "query": query, stats: {}
            }
        );
        else scanDynamoDB(scanQuery);
    }


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

    async listObjectsS3(req, res) {
        let params = {
            Bucket: req.body.bucket
        }

        console.log("Displaying all objects in the bucket")

        const run = async () => {
            const data = await s3c.send(new S3.ListObjectsV2Command(params));
            console.log("Success", data.Contents[1].Key);
            let files = new Array(data.Contents.length);
            for (const i in data.Contents)
            {
                files.push(data.Contents[i].Key)
            }
            // console.log(files);
            res.send(commons.resReturn(files+ " To get the data set you want enter the url - 'https://" + req.body.bucket + ".s3.amazonaws.com/Key'"));
            return data;
        };
        run();
    }

}

function addData(paramsDataset) {

    console.log("Adding a new item based on: ");
    docClient.put(paramsDataset, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(paramsDataset.Item, null, 2));
        }
    });
}



module.exports = dynamodbController;