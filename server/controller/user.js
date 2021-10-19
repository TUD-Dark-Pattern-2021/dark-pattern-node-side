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

  async reg(req, res) {
    let userInst = commons.getInst(userModel);
    let params = req.body;
    params = commons.handleParams(params, {
      password: 'string',
      email: 'string'
    });
    if (!params.email) {
      return (res.send(commons.resReturn(null, 400, 'email should not be empty')));
    }

    if (!params.password) {
      return (res.send(commons.resReturn(null, 400, 'password should not be empty')));
    }

    let checkRepeat = await userInst.findByEmail(params.email);
    if (checkRepeat.Count > 0) {
      return (res.send(commons.resReturn(null, 401, 'this email has been registered')));
    }

    let passsalt = commons.randStr()
    let id = shortid.generate()
    let data = marshall({
      Id: id,
      Password: commons.generatePassword(params.password, passsalt), //encrypt
      Email: params.email,
      Passsalt: passsalt,
      AddTime: commons.time(),
      UpTime: commons.time(),
      ResetPasswordToken: null,
      ResetPasswordExpires: null,
    });
    let user = await userInst.save(data);
    this.setLoginCookie(id, passsalt);
    res.send(commons.resReturn({
      uid: user.Id,
      email: user.Email,
      add_time: user.AddTime,
      up_time: user.UpTime,
      resetPasswordToken: user.ResetPasswordToken,
      resetPasswordExpires: user.ResetPasswordExpires
    }));
    // commons.sendMail({
    //   to: user.email,
    //   subject: 'notification from DP',
    //   contents: `<h3>Dear user：</h3><p>Hi，Thanks for your using DP,your account ${
    //     params.Email
    //   } has been registered successfully</p>`
    // });
  }

  /**
   * @interface /user/login
   * @method POST
   * @param {String} email
   * @param  {String} password
   * @returns {Object}
   */
  async login(req, res) {
    let userInst = commons.getInst(userModel);
    let account = req.body.email;
    let password = req.body.password;
    if (!account) {
      return (res.send(commons.resReturn(null, 400, 'Email/Username field should not be empty')));
    }
    if (!password) {
      return (res.send(commons.resReturn(null, 400, 'Password should not be empty')));
    }

    let result = await userInst.findByEmail(account);
    if (!result.Count) {
      return (res.send(commons.resReturn(null, 404, 'User does not exist')));
    } else if (commons.generatePassword(password, unmarshall(result.Items[0]).Passsalt) === unmarshall(result.Items[0]).Password) {
      let data = unmarshall(result.Items[0])
      this.setLoginCookie(data.Id, data.Passsalt);

      return (res.send(commons.resReturn(
        {
          uid: data.Id,
          email: data.Email,
          add_time: data.AddTime,
          up_time: data.UpTime,
          resetPasswordToken: data.ResetPasswordToken,
          resetPasswordExpires: data.ResetPasswordExpires
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
   * @interface /user/update
   * @method POST
   * @param uid
   * @param [username] String
   * @param [email] String
   * @returns {Object}
   */
  async update(req, res) {
    //更新用户信息
    try {
      let params = req.body;

      params = commons.handleParams(params, {
        username: 'string'
      });

      if (params.uid != this.getUid()) {
        return (res.send(commons.resReturn(null, 401, 'no permission')));
      }

      let userInst = commons.getInst(userModel);
      let id = params.uid;

      if (!id) {
        return (res.send(commons.resReturn(null, 400, 'uid should not be null')));
      }

      let userData = await userInst.findById(id);
      if (!userData) {
        return (res.send(commons.resReturn(null, 400, 'uid not exists')));
      }

      let checkRepeat = await userInst.checkUserRepeat(params.username);

      if (checkRepeat > 0) {
        return (res.send(commons.resReturn(null, 401, 'this username has been used')));
      }

      let data = {
        up_time: commons.time()
      };

      data.username = params.username;

      let result = await userInst.update(id, data);

      res.send(commons.resReturn(result));
    } catch (e) {
      res.send(commons.resReturn(null, 402, e.message));
    }
  }

  /**
   * @interface /user/change_password
   * @method POST
   * @param {string} uid
   * @param {string} old_password
   * @param {string} password
   * @return {Object}
   */
  async changePassword(req, res) {
    let params = req.body;
    let userInst = commons.getInst(userModel);

    if (!params.uid) {
      return (res.send(commons.resReturn(null, 400, 'uid can not be null')));
    }

    if (!params.password) {
      return (res.send(commons.resReturn(null, 400, 'password can not be null')));
    }

    if (!params.old_password) {
      return (res.send(commons.resReturn(null, 400, 'old pass word can not be null')));
    }

    let user = await userInst.findById(params.uid);

    if (commons.generatePassword(params.old_password, user.passsalt) !== user.password) {
      return (res.send(commons.resReturn(null, 402, 'old password error')));
    }

    let passsalt = commons.randStr();
    let data = {
      up_time: commons.time(),
      password: commons.generatePassword(params.password, passsalt),
      passsalt: passsalt
    };
    try {
      let result = await userInst.update(params.uid, data);
      res.send(commons.resReturn(result));
    } catch (e) {
      res.send(commons.resReturn(null, 401, e.message));
    }
  }

  /**
   * @interface /user/del
   * @method POST
   * @param id user uid
   * @returns {Object}
   */
  async deleteAccount(req, res) {
    try {
      let userInst = commons.getInst(userModel);
      let id = this.getUid()
      if (!id) {
        return (res.send(commons.resReturn(null, 400, 'uid can not be empty')));
      }

      let result = await userInst.del(id);

      res.send(commons.resReturn(result));
    } catch (e) {
      res.send(commons.resReturn(null, 402, e.message));
    }
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

  async forgotPassword(req, res) {
    const userInst = commons.getInst(userModel)

    let email = req.body.email
    if (email === '') {
      res.status(400).send('email required');
    }
    let user = await userInst.findByEmail(email)
    if (user === null) {
      res.send(commons.resReturn(null, 400, 'email not found'))
    } else {
      const token = crypto.randomBytes(20).toString('hex');
      let data = {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000
      };
      let result = await userInst.updateToken(email, data);
      res.send(commons.resReturn(result));

      commons.sendMail({
        to: user.email,
        subject: 'notification from dp - Password reset',
        contents: `<h3>Dear user：</h3><p>Hi，please click http://localhost:8080/resetPassword/${token} to reset your password.`
      });

      console.log('Sending mail');
    }
  };

  async resetPassword(req, res) {
    let token = req.params.token
    console.log("This is the token " + JSON.stringify(req.params))

    const userInst = commons.getInst(userModel)
    let user = await userInst.findByToken(token)
    let expiration = user ? user.resetPasswordExpires: 0
    if (!user) {
      res.send(commons.resReturn(null, 400, 'Incorrect token'))
    }
    if (expiration < Date.now()) {
      res.send(commons.resReturn(null, 400, 'Token has been expired'))
    } else {
      res.send(commons.resReturn({
        username: user.username
      }))
    }

  }


  async updatePassword(req, res) {
    const userInst = commons.getInst(userModel)
    let token = req.body.token
    console.log(token, "gdgdgd");
    let user = await userInst.findByToken(token)
    let passsalt = commons.randStr();
    let newPassword = commons.generatePassword(req.body.password, passsalt)
    console.log(user)
    if (user != null) {
      console.log("Present in DB");
      let data = {
        password: newPassword,
        passsalt: passsalt,
        resetPasswordToken: null,
        resetPasswordExpires: null
      };
      let result = await userInst.updatePassword(token, data);
      res.send(commons.resReturn(result));
    } else {
      res.send(commons.resReturn(null, 400, 'Token has expired, please resend recovery email'));
    }
  }

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
