const jwt = require('jsonwebtoken')
const commons = require('../utils/commons')
const userModel = require('../models/user.js')
const {unmarshall} = require("@aws-sdk/util-dynamodb");
class baseController {
  constructor(req, res) {
    this.req = req;
    this.res = res
  }

  async init(req, res) {
    let ignoreRouter = [
      '/api/dp',
    ];
    if (req.path.indexOf(ignoreRouter) > -1) {
      this.$auth = true;
    } else {
      await this.checkLogin(req, res);
    }
  }

  getUid() {
    return this.$uid;
  }

  async checkLogin(req, res) {
    let token = req.cookies.dp_token;
    let uid = req.cookies.dp_uid;
    try {
      console.log(token, uid)
      if (!token || !uid) {
        return false;
      }
      let userInst = commons.getInst(userModel);
      let result = await userInst.findById(uid);
      if (!result.Item) {
        return false;
      }

      let decoded;
      try {
        decoded = jwt.verify(token, unmarshall(result.Item).Passsalt);
      } catch (err) {
        return false;
      }
      console.log(decoded, uid)
      if (decoded.uid == uid) {
        this.$uid = uid;
        this.$auth = true;
        this.$user = unmarshall(result.Item);
        return true;
      }

      return false;
    } catch (e) {
      commons.log(e, 'error');
      return false;
    }
  }

  async getLoginStatus(req, res) {
    let body;
    if ((await this.checkLogin(req, res)) === true) {
      let result = commons.fieldSelect(this.$user, [
        'Id',
        'Username',
        'UpTime',
      ]);
      body = commons.resReturn(result);
    } else {
      body = commons.resReturn(null, 40011, '请登录...');
    }
    res.send(body);
  }
}

module.exports = baseController;
