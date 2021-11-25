const express = require('express')
const commons = require('./utils/commons')
const userController = require('./controller/user')
const dynamodbController = require('./controller/dynamodb')
const dpController = require('./controller/dp')
const router = express.Router();

const createAction = (router, baseurl, routerController, action, path, method) => {
  router[method](baseurl + path, async (req, res) => {
    let inst = new routerController(req, res);
    // try {
      await inst.init(req, res);
      if (inst.$auth === true) {
        await inst[action].call(inst, req, res);
      } else {
        res.send(commons.resReturn(null, 40011, 'please login...'));
      }
    // } catch (err) {
    //   res.send(commons.resReturn(null, 40011, 'server error...'));
    // }
  });
};

let INTERFACE_CONFIG = {
  user: {
    prefix: '/user/',
    controller: userController
  },
  dynamodb: {
    prefix: '/dynamodb/',
    controller: dynamodbController
  },
  dp: {
    prefix: '/dp/',
    controller: dpController
  }
};

let routerConfig = {
  dp: [
    {
      action: 'detect',
      path: 'detect',
      method: 'post'
    },
    {
      action: 'newReport',
      path: 'newReport',
      method: 'post'
    },
    {
      action: 'getList',
      path: 'getList',
      method: 'get'
    },
    {
      action: 'updateReport',
      path: 'updateReport',
      method: 'post'
    },
    {
      action: 'checkDP',
      path: 'checkDP',
      method: 'post'
    },
    {
      action: 'checkOCR',
      path: 'checkOCR',
      method: 'post'
    },
  ],
  dynamodb:[
    {
      action: 'addItem',
      path: 'addItem',
      method: 'post'
    },
    {
      action: 'getItem',
      path: 'getItem',
      method: 'get'
    },
    {
      action: 'deleteItem',
      path: 'deleteItem',
      method: 'delete'
    },
    {
      action: 'getReq',
      path: 'getReq',
      method: 'get'
    },
    {
      action: 'pushData',
      path: 'pushData',
      method: 'put'
    },
    {
      action: 'dyanmoToS3',
      path: 'dyanmoToS3',
      method: 'put'
    },
    {
      action: 'storeDataset',
      path: 'storeDataset',
      method: 'put'
    },
    {
      action: 's3Test',
      path: 's3Test',
      method: 'get'
    },
    {
      action: 'listObjectsS3',
      path: 'listObjectsS3',
      method: 'get'
    },
    {
      action: 'automaticTraining',
      path: 'automaticTraining',
      method: 'post'
    },
    {
      action: 'readCsvFile',
      path: 'readCsvFile',
      method: 'get'
    },
    {
      action: 'emptyFile',
      path: 'emptyFile',
      method: 'post'
    },
  ], 
  user: [
    {
      action: 'login',
      path: 'login',
      method: 'post'
    },
    {
      action: 'reg',
      path: 'reg',
      method: 'post'
    },
    {
      action: 'getLoginStatus',
      path: 'status',
      method: 'get'
    },
    {
      action: 'logout',
      path: 'logout',
      method: 'get'
    },
  ],
};

for (let ctrl in routerConfig) {
  let actions = routerConfig[ctrl];
  actions.forEach(item => {
    let routerController = INTERFACE_CONFIG[ctrl].controller;
    let routerPath = INTERFACE_CONFIG[ctrl].prefix + item.path;
    createAction(router, '/api', routerController, item.action, routerPath, item.method);
  });
}
 

module.exports = router
