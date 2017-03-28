'use strict';

const dbHandler = require('../utils/dbOperationHandler');
const ApiError = require('../middleware/response_handler/lib/api_error');
const ObjectId = require('mongodb').ObjectId;

exports.create = async(ctx, next) => {
  const name = ctx.request.body.name;
  const type = ctx.request.body.type;
  const coverImg = ctx.request.body.coverImg;
  const videoList = ctx.request.body.videoList;
  const userId = ctx.request.body.userId;
  const createAt = new Date().toString();
  const result = await ctx.mongo.collection('lesson').insert({ name, type, coverImg, videoList, userId, createAt });
  const lessonId = result.ops[0]._id.toString();
  await dbHandler.dbOperationHander(ctx, result);
  ctx.body = {
    name,
    type,
    coverImg,
    videoList,
    lessonId,
  };
};

exports.delete = async(ctx, next) => {
  const lessonId = ctx.request.body.lessonId;
  const result = await ctx.mongo.collection('lesson').remove({ _id: ObjectId(lessonId) });
  await dbHandler.dbOperationHander(ctx, result);
  ctx.body = {
    deleted: true,
  };
};

exports.modify = async(ctx, next) => {
  const lessonId = ctx.request.body.lessonId;
  const videoList = ctx.request.body.videoList;
  const result = await ctx.mongo.collection('lesson').updateOne(
    { _id: ObjectId(lessonId) },
    {
      $set: { videoList },
      $currentDate: { lastModified: true },
    }
  );
  await dbHandler.dbOperationHander(ctx, result);
  ctx.body = {
    viedoList,
  };
};

exports.searchByUserId = async(ctx, next) => {
  const userId = ctx.request.body.userId;
  const result = await ctx.mongo.collection('lesson').find({ userId }).toArray();
  await dbHandler.dbOperationHander(ctx, result);
  ctx.body = {
    lesson: result,
  };
};

exports.searchByLessonId = async(ctx, next) => {
  const lessonId = ctx.request.body.lessonId;
  const _id = ObjectId(lessonId);
  const result = await ctx.mongo.collection('lesson').find({ _id }).toArray();
  console.log(result);
  await dbHandler.dbOperationHander(ctx, result);
  ctx.body = {
    lesson: result,
  };
};