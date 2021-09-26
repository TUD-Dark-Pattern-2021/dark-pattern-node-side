const commons = require('../utils/commons')
const DynamoDB = require("@aws-sdk/client-dynamodb");

class baseModel {
  constructor() {
    this.schema = new DynamoDB.Schema(this.getSchema());
    this.name = this.getName();
    this.model = DynamoDB.model(this.name, this.schema);
    
  }

  getSchema() {
    commons.log('Model Class need getSchema function', 'error');
  }

  getName() {
    commons.log('Model Class need name', 'error');
  }
}

module.exports = baseModel;
