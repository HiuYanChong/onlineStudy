'use strict';
const dbHandler = require('../utils/dbOperationHandler');
const router = require('koa-router');
const ApiError = require('../middleware/response_handler/lib/api_error');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;

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
  const result = await ctx.mongo.collection('users').insertOne({ name, pass, role, lessonAttend: [] });
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
  if(!result[0]) {
    const error = new ApiError('userNotExist');
    throw error;
  };
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

exports.attendLesson = async(ctx, next) => {
  const userId = ctx.request.body.userId;
  const lessonId = ctx.request.body.lessonId;
  const result = await ctx.mongo.collection('users').updateOne(
    { _id: ObjectId(userId) },
    {
      $addToSet: { lessonAttend: lessonId },
      $currentDate: { lastModified: true },
    }
  );
  await dbHandler.dbOperationHander(ctx, result);
  ctx.body = {
    attend: true,
    lessonId,
  };
};

exports.getAttendLesson = async(ctx, next) => {
  const userId = ctx.request.body.userId;
  const result = await ctx.mongo.collection('users').find({ _id: ObjectId(userId) }).toArray();
  await dbHandler.dbOperationHander(ctx, result);
  const lesson = result[0].lessonAttend;
  ctx.body = {
    lesson,
  };
};

exports.quitLesson = async(ctx, next) => {
  const userId = ctx.request.body.userId;
  const lessonId = ctx.request.body.lessonId;
  const result = await ctx.mongo.collection('users').updateOne(
    { _id: ObjectId(userId) },
    {
      $pullAll: { lessonAttend: [lessonId] },
      $currentDate: { lastModified: true },
    }
  );
  await dbHandler.dbOperationHander(ctx, result);
  ctx.body = {
    quit: true,
    lessonId,
  };
};


exports.getAttendLessonInfo = async(ctx, next) =>{
  const userId = ctx.request.body.userId;
  let attendList = await ctx.mongo.collection('users').find({ _id: ObjectId(userId)}).toArray();
  attendList = attendList[0].lessonAttend;
  await dbHandler.dbOperationHander(ctx, attendList);
  console.log(attendList);
  const lessonInfo = [];
  for (let i = 0; i < attendList.length; i++) {
    const result = await ctx.mongo.collection('lesson').find({ _id: ObjectId(attendList[i])}).toArray();
    await dbHandler.dbOperationHander(ctx, result);
    lessonInfo.push(result[0]);
  };
  ctx.body = {
    lesson: lessonInfo,
  };
};