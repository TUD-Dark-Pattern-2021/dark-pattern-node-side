const jwt = require('jsonwebtoken');
const fs = require("fs");
const path = require('path');
const baseController = require('./base.js');
const userModel = require('../models/user.js');
const commons = require('../utils/commons');
const crypto = require('crypto');
const shortid = require('shortid');
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

class userController extends baseController {
  constructor(req, res) {
    super(req, res);
  }

  /**
   * @interface /user/reg
   * @method POST
   * @param {String} username
   * @param  {String} password
   * @returns {Object}
   */

  async reg(req, res) {
    let userInst = commons.getInst(userModel);
    let params = req.body;
    params = commons.handleParams(params, {
      password: 'string',
      username: 'string'
    });
    if (!params.username) {
      return (res.send(commons.resReturn(null, 400, 'username should not be empty')));
    }

    if (!params.password) {
      return (res.send(commons.resReturn(null, 400, 'password should not be empty')));
    }

    let checkRepeat = await userInst.findByUsername(params.username);
    if (checkRepeat.Count > 0) {
      return (res.send(commons.resReturn(null, 401, 'this email has been registered')));
    }

    let passsalt = commons.randStr()
    let id = shortid.generate()
    let data = marshall({
      Id: id,
      Password: commons.generatePassword(params.password, passsalt), //encrypt
      Username: params.username,
      Passsalt: passsalt,
      AddTime: commons.time(),
    });
    let user = await userInst.save(data);
    this.setLoginCookie(id, passsalt);
    res.send(commons.resReturn({
      uid: user.Id,
      username: user.Username,
      add_time: user.AddTime,
    }));
  }

  /**
   * @interface /user/login
   * @method POST
   * @param {String} username
   * @param  {String} password
   * @returns {Object}
   */
  async login(req, res) {
    let userInst = commons.getInst(userModel);
    let username = req.body.username;
    let password = req.body.password;
    if (!username) {
      return (res.send(commons.resReturn(null, 400, 'Username field should not be empty')));
    }
    if (!password) {
      return (res.send(commons.resReturn(null, 400, 'Password should not be empty')));
    }

    let result = await userInst.findByUsername(username);
    if (!result.Count) {
      return (res.send(commons.resReturn(null, 404, 'User does not exist')));
    } else if (commons.generatePassword(password, unmarshall(result.Items[0]).Passsalt) === unmarshall(result.Items[0]).Password) {
      let data = unmarshall(result.Items[0])
      this.setLoginCookie(data.Id, data.Passsalt);

      return (res.send(commons.resReturn(
        {
          uid: data.Id,
          username: data.Username,
          add_time: data.AddTime,
        },
        0,
        'login success...'
      )));
    } else {
      return (res.send(commons.resReturn(null, 405, 'password error')));
    }
  }

  /**
   * @interface /user/logout
   * @method POST
   * @returns {Object}
   */
  async logout(req, res) {
    res.cookie('dp_token', null);
    res.cookie('dp_uid', null);
    res.send(commons.resReturn('ok'));
  }



  /**
   * @interface /user/avatar
   * @method GET
   * @param {*} uid
   * @returns {Object}
   */
  // async avatar(req, res) {
  //   let uid = req.params.uid ? req.params.uid : this.getUid();
  //   let avatarInst = commons.getInst(avatarModel);
  //   let data = await avatarInst.get(uid);
  //   let dataBuffer, type;
  //   if (!data || !data.basecode) {
  //     dataBuffer = fs.readFileSync(path.resolve(__dirname, '../../client/public/assets/img/avatar.png'));
  //     type = 'image/png';
  //   } else {
  //     type = data.type;
  //     dataBuffer = new Buffer(data.basecode, 'base64');
  //   }
  //
  //   res.set('Content-type', type);
  //   res.send(dataBuffer);
  // }

  // async uploadAvatar(req, res) {
  //   try {
  //     let basecode = req.body.basecode;
  //     if (!basecode) {
  //       return (res.send(commons.resReturn(null, 400, 'basecode should not be empty')));
  //     }
  //     let pngPrefix = 'data:image/png;base64,';
  //     let jpegPrefix = 'data:image/jpeg;base64,';
  //     let type;
  //     if (basecode.substr(0, pngPrefix.length) === pngPrefix) {
  //       basecode = basecode.substr(pngPrefix.length);
  //       type = 'image/png';
  //     } else if (basecode.substr(0, jpegPrefix.length) === jpegPrefix) {
  //       basecode = basecode.substr(jpegPrefix.length);
  //       type = 'image/jpeg';
  //     } else {
  //       return (res.send(commons.resReturn(null, 400, 'only support jpg and png')));
  //     }
  //     let strLength = basecode.length;
  //     if (parseInt(strLength - (strLength / 8) * 2) > 200000) {
  //       return (res.send(commons.resReturn(null, 400, 'avatar size should not over 200kb')));
  //     }
  //
  //     let avatarInst = commons.getInst(avatarModel);
  //     let result = await avatarInst.up(this.getUid(), basecode, type);
  //     res.send(commons.resReturn(result));
  //   } catch (e) {
  //     res.send(commons.resReturn(null, 401, e.message));
  //   }
  // }

  setLoginCookie(uid, passsalt) {
    let token = jwt.sign({uid: uid}, passsalt, {expiresIn: '7 days'});

    this.res.cookie('dp_token', token, {
      expires: commons.expireDate(7),
      httpOnly: true
    });
    this.res.cookie('dp_uid', uid, {
      expires: commons.expireDate(7),
      httpOnly: true
    });
  }
}

module.exports = userController;
