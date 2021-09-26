const baseController = require('./base.js');
const userModel = require('../models/user.js');
const commons = require('../utils/commons');
const ddbClient = require("../ddb.js")
const DynamoDB = require("@aws-sdk/client-dynamodb");

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
}
module.exports = dynamodbController;