const baseModel = require('./base.js');
const ddbClient = require("../ddb");
const { GetItemCommand, PutItemCommand, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

class userModel extends baseModel {

  getName() {
    return 'User';
  }
  getIndex () {
    return {
      KeySchema: [
        {
          AttributeName: "Id",
          KeyType: "HASH", //Partition key
        },
      ],
    }
  }
  getSchema() {
    return {
      AttributeDefinitions: [
        {
          AttributeName: "Id",
          AttributeType: "S"
        },
        {
          AttributeName: "Email",
          AttributeType: "S"
        },
        {
          AttributeName: "Password",
          AttributeType: "S"
        },
        {
          AttributeName: "ResetPasswordToken",
          AttributeType: "S"
        },
        {
          AttributeName: "ResetPasswordExpires",
          AttributeType: "N"
        },
        {
          AttributeName: "Passsalt",
          AttributeType: "S"
        },
        {
          AttributeName: "AddTime",
          AttributeType: "N"
        },
        {
          AttributeName: "UpTime",
          AttributeType: "N"
        },
      ]
    }
  }

  save(data) {
    const params = {
      TableName: 'User',
      Item: data,
      ConditionExpression: "attribute_not_exists(Email)",
    }
    return ddbClient.send(new PutItemCommand(params))
  }
  async findByEmail(email){
    var params = {
      TableName: 'User',
      FilterExpression: 'Email = :email',
      ExpressionAttributeValues: {
        ":email": { S: email }
      }
    };
    // const params = new GetItemCommand({
    //   TableName: 'User',
    //   Key: {
    //     Email: {S: email}
    //   },
    //   ProjectionExpression: '#e',
    //   ExpressionAttributeNames: {
    //     '#e': 'Email'
    //   }
    // });
    // let result =ddbClient.send(params)
    let result = await ddbClient.send( new ScanCommand(params))
    return result
  }
  async findById (id) {
    const params = {
      TableName: "User",
      Key: marshall({
        Id: id ,
      }),
    };
    const data = await ddbClient.send(new GetItemCommand(params));
    return data;
  }
  findByToken(ResetPasswordToken){
    const params = new GetItemCommand(marshall({
      TableName: 'User',
      Key: {
        ResetPasswordToken
      }
    }));
    return ddbClient.send(params)
  }

  update(id, data) {
    return this.model.update(
      {
        _id: id
      },
      data
    );
  }
  updatePassword(token, data){
    return this.model.update(
      {
        resetPasswordToken: token
      },
      data
    );
  }
  updateToken(email,data){
    return this.model.update(
      {
        email: email
      },
      data
    );
  }
  del (_id) {
    return this.model.deleteOne({
      _id
    })
  }
}

module.exports = userModel;
