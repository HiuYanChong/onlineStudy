'use strict';
const dbHandler = require('../utils/dbOperationHandler');
const router = require('koa-router');
const ApiError = require('../middleware/response_handler/lib/api_error');
const bcrypt = require('bcrypt');

const checkValidityOfName = async(ctx, next, name) => {
  const result = await ctx.mongo.collection('users').find({ name }).toArray();
  return !result[0];
};

exports.addUser = async(ctx, next) => {
  const name = ctx.request.body.username;
  const role = ctx.request.body.role;
  let pass = ctx.request.body.password;
  //  检查昵称是否注册
  const nameValidity = await checkValidityOfName(ctx, next, name);
  if (!nameValidity) {
    const error = new ApiError('nameExist');
    throw error;
  }
  await bcrypt.hash(pass, 10).then(hash => {
    pass = hash;
  });
  const result = await ctx.mongo.collection('users').insert({ name, pass, role });
  const userId = result.ops[0]._id.toString();
  await dbHandler.dbOperationHander(ctx, result);
  ctx.session.user = {
    name,
    role,
    id: userId,
  };
  ctx.body = {
    name,
    role,
    id: userId,
  };
  /*;
  ctx.body = await ctx.mongo.db('test').collection('users').find()
    .toArray();*/
  /*ctx.mongo.db('test').collection('users').remove({
    _id: mongo.ObjectId(userId)
  });*/
};

exports.login = async(ctx, next) => {
  const name = ctx.request.body.username;
  let pass = ctx.request.body.password;
  const tid = ctx.request.body.tid;
  const time = new Date() * 1;
  if (time - tid > 60 * 2) {
    // 超过两分钟
    const error = new ApiError('loginTimeOut');
    throw error;
  }
  pass = pass.split(tid)[0];
  const result = await ctx.mongo.collection('users').find({ name }).toArray();
  // 用户不存在
  // TODO
  const password = result[0].pass;
  if (password) {
    await bcrypt.compare(pass, password).then(res => {
      if (res === true) {
        ctx.session.user = {
          name,
          role: result[0].role,
          id: result[0]._id,
        };
        ctx.body = {
          name,
          role: result[0].role,
          id: result[0]._id,
        };
      } else {
        const error = new ApiError('userNotExist');
        throw error;
      }
    }).catch(error => {
      throw error;
    });
  }
};

exports.checkLogin = async(ctx, next) => {
  const userInfo = ctx.session.user;
  if (userInfo) {
    ctx.body = {
      isLogin: true,
      name: userInfo.name,
      role: userInfo.role,
      id: userInfo.id,
    };
  } else {
    ctx.body = {
      isLogin: false,
    };
  }
};

exports.logout = async(ctx, next) => {
  ctx.session = null;
  ctx.body = {
    isLogout: 1,
  };
};