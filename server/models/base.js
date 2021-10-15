const commons = require('../utils/commons')

class baseModel {
  constructor() {
    this.schema = this.getSchema();
    this.name = this.getName();
  }

  getSchema() {
    commons.log('Model Class need getSchema function', 'error');
  }

  getName() {
    commons.log('Model Class need name', 'error');
  }
}

module.exports = baseModel;
