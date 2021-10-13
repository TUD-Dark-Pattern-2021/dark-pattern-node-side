const jwt = require('jsonwebtoken');
const commons = require('../utils/commons')
class baseController {
  constructor(req, res) {
    this.req = req;
    this.res = res
  }

  async init(req, res) {
    let ignoreRouter = [
      // '/api/user/login',
      // '/api/user/reg',
      // '/api/user/status',
      // '/api/user/logout',
      // '/api/user/avatar',
      // '/api/user/forgotPassword',
      // '/api/user/resetPassword',
      '/api/dynamodb/addItem',
      '/api/dynamodb/getItem',
      '/api/dynamodb/deleteItem',
      '/api/dyanmodb/storeDataset',
      '/api/dyanmodb/s3Test',
      '/api/dyanmodb/pushData',
      // '/api/user/updatePassword',
      '/api/dp/detect',
      
    ];
    // if (ignoreRouter.indexOf(req.path) > -1 || req.path.indexOf('/api/user/resetPassword') > -1) {
      this.$auth = true;
    // } else {
    //   await this.checkLogin(req, res);
    // }
  }

  getUid() {
    return this.$uid;
  }

  // async checkLogin(req, res) {
  //   let token = req.cookies.anime_token;
  //   let uid = req.cookies.anime_uid;
  //   try {
  //     if (!token || !uid) {
  //       return false;
  //     }
  //     let userInst = commons.getInst(userModel);
  //     let result = await userInst.findById(uid);
  //     if (!result) {
  //       return false;
  //     }

  //     let decoded;
  //     try {
  //       decoded = jwt.verify(token, result.passsalt);
  //     } catch (err) {
  //       return false;
  //     }

  //     if (decoded.uid == uid) {
  //       this.$uid = uid;
  //       this.$auth = true;
  //       this.$user = result;
  //       return true;
  //     }

  //     return false;
  //   } catch (e) {
  //     commons.log(e, 'error');
  //     return false;
  //   }
  // }

  // async getLoginStatus(req, res) {
  //   let body;
  //   if ((await this.checkLogin(req, res)) === true) {
  //     let result = commons.fieldSelect(this.$user, [
  //       '_id',
  //       'username',
  //       'email',
  //       'up_time',
  //       'add_time',
  //       'favorites'
  //     ]);
  //     // result.favorites = result.favorites.map(item => {
  //     //   return {_id: item._id}
  //     // })
  //     body = commons.resReturn(result);
  //   } else {
  //     body = commons.resReturn(null, 40011, '请登录...');
  //   }
  //   res.send(body);
  // }
}

module.exports = baseController;
