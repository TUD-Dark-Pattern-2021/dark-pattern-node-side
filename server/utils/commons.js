const nodemailer = require('nodemailer');
const sha1 = require('sha1');

exports.randStr = () => {
  return Math.random()
    .toString(36)
    .substr(2);
};

exports.generatePassword = (password, passsalt) => {
  return sha1(password + sha1(passsalt));
};

exports.time = () => {
  return Date.parse(new Date()) / 1000;
};

exports.expireDate = day => {
  let date = new Date();
  date.setTime(date.getTime() + day * 86400000);
  return date;
};

exports.resReturn = (data, num, errmsg) => {
  num = num || 0;

  return {
    errcode: num,
    errmsg: errmsg || 'success！',
    data: data
  };
};

exports.fieldSelect = (data, field) => {
  if (!data || !field || !Array.isArray(field)) {
    return null;
  }

  var arr = {};

  field.forEach(f => {
    typeof data[f] !== 'undefined' && (arr[f] = data[f]);
  });

  return arr;
};

exports.log = (msg, type) => {
  if (!msg) {
    return;
  }

  type = type || 'log';

  let f;

  switch (type) {
    case 'log':
      f = console.log; // eslint-disable-line
      break;
    case 'warn':
      f = console.warn; // eslint-disable-line
      break;
    case 'error':
      f = console.error; // eslint-disable-line
      break;
    default:
      f = console.log; // eslint-disable-line
      break;
  }

  f(type + ':', msg);
};

exports.sendMail = (options, cb) => {
  let mail = nodemailer.createTransport({
    "host": "smtp.gmail.com",
    "port": 465,
    "from": "anime",
    "secure": true,
    "auth": {
      "user": "webpairassessment",
      "pass": "webpair1"
    }
  });
  try {
    mail.sendMail(
      {
        from: mail.from,
        to: options.to,
        subject: options.subject,
        html: options.contents
      },
      cb
    );
  } catch (e) {
    console.error(e.message); // eslint-disable-line
  }
}

function trim(str) {
  if (!str) {
    return str;
  }

  str = str + '';

  return str.replace(/(^\s*)|(\s*$)/g, '');
}

/**
 * @params Object {a: ' ab ', b: ' 123 '}
 * @keys Object {a: 'string', b: 'number'}
 * @return Object {a: 'ab', b: 123}
 */
exports.handleParams = (params, keys) => {
  console.log(!params || typeof params !== 'object' || !keys || typeof keys !== 'object')
  if (!params || typeof params !== 'object' || !keys || typeof keys !== 'object') {
    return false;
  }
  for (var key in keys) {
    var filter = keys[key];
    if (params[key]) {
      switch (filter) {
        case 'string':
          params[key] = trim(params[key] + '');
          break;
        case 'number':
          params[key] = !isNaN(params[key]) ? parseInt(params[key], 10) : 0;
          break;
        default:
          params[key] = trim(params + '');
      }
    }
  }

  return params;
};

let insts = new Map();
exports.getInst = (m, ...args) => {
  if (!insts.get(m)) {
    insts.set(m, new m(args));
  }
  return insts.get(m);
}

