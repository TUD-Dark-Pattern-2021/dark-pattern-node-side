const express = require('express')
const commons = require('./utils/commons')
const userController = require('./controller/user')
const animeController = require('./controller/anime')
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
  anime: {
    prefix: '/anime/',
    controller: animeController
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
    }
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
    }
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
      action: 'addItem',
      path: 'addItem',
      method: 'post'
    },
    {
      action: 'update',
      path: 'update',
      method: 'put'
    },
    {
      action: 'del',
      path: 'del',
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
    {
      action: 'changePassword',
      path: 'change_password',
      method: 'put'
    },
    {
      action: 'avatar',
      path: 'avatar/:uid',
      method: 'get'
    },
    {
      action: 'addToFavorite',
      path: 'favorite/add',
      method: 'post'
    },
    {
      action: 'delFavorite',
      path: 'favorite/delete/:id',
      method: 'delete'
    },
    {
      action: 'getFavoriteList',
      path: 'favorite/list',
      method: 'get'
    },
    {
      action: 'forgotPassword',
      path: 'forgotPassword',
      method: 'post'
    },
    {
      action: 'resetPassword',
      path: 'resetPassword/:token',
      method: 'get'
    },
    {
      action: 'updatePassword',
      path: 'updatePassword',
      method: 'put'
    },
    {
      action: 'uploadAvatar',
      path: 'upload_avatar',
      method: 'post'
    },
    {
      action: 'deleteAccount',
      path: 'delete',
      method: 'delete'
    }
  ],
  anime: [{
    action: 'list',
    path: 'list',
    method: 'get'
  }]
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
