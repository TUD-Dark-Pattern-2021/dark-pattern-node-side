const baseModel = require('./base.js');

class userModel extends baseModel {
  getName() {
    return 'user';
  }
  getSchema() {
    return {
      username: {
        type: String,
        required: true
      }
    }
  }
}
