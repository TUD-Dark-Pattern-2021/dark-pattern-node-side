import crypto from 'crypto';
const userModel = require('../models/user.js');
const commons = require('../utils/commons')
const nodemailer = require('nodemailer');


class passwordController extends baseController {
  constructor(req, res) {
    super(req, res);
  }
  async forgotPassword (req, res) {
    const {query} = req
    const userInst = commons.getInst(userModel)

    let email = req.body.email
    if (email === '') {
      res.status(400).send('email required');
    }
    console.log(email ,"emial");
    userInst.findByEmail(email) ({
    }).then((user) => {
      if (user === null) {
        console.error('email not in database');
        res.status(403).send('email not in db');
      } else {
        const token = crypto.randomBytes(20).toString('hex');
        user.update({
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000,
        });

        commons.sendMail({
          to: user.email,
          subject: 'notification from anime - Password reset',
          contents: `<h3>Dear user：</h3><p>Hi，http://localhost:8080/reset/${token}`
        });

        console.log('sending mail');

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('there was an error: ', err);
          } else {
            console.log('here is the res: ', response);
            res.status(200).json('recovery email sent');
          }
        });
      }
    });
  };
}

module.exports = passwordController;
