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
  const userName = ctx.request.body.userName;
  const createAt = new Date().toString();
  const result = await ctx.mongo.collection('lesson').insertOne({ name, type, coverImg, videoList, userId, createAt, userName });
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
    videoList,
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
  await dbHandler.dbOperationHander(ctx, result);
  ctx.body = {
    lesson: result,
  };
};

exports.queryLessonCount = async(ctx, next) => {
  const type = ctx.request.body.type || '';
  let result;
  if (type) {
    result = await ctx.mongo.collection('lesson').find({ type }).toArray().length;
    await dbHandler.dbOperationHander(ctx, result);
  } else {
    result = await ctx.mongo.collection('lesson').find().toArray().length;
    await dbHandler.dbOperationHander(ctx, result);
  }
  console.log(result);
  ctx.body = {
    count: result,
  };
};

exports.lessonList = async(ctx, next) => {
  const type = ctx.request.body.type || '';
  const page = ctx.request.body.page || 1;
  const pageSize = ctx.request.body.pageSize || 10;
  let data;
  let result;
  if (type) {
    result = await ctx.mongo.collection('lesson').find({ type }).sort({ createAt: -1 })
                      .toArray();
    await dbHandler.dbOperationHander(ctx, result);
  } else {
    result = await ctx.mongo.collection('lesson').find().sort({ createAt: -1 })
                      .toArray();
    await dbHandler.dbOperationHander(ctx, result);
  }
  const totalCount = result.length;
  const indexBegin = (page - 1) * pageSize;
  const indexEnd = page * pageSize - 1;
  if (indexBegin >= totalCount) {
    data = null;
  } else if (indexBegin < totalCount && indexEnd < totalCount) {
    data = result.slice(indexBegin, indexEnd);
  } else if (indexBegin < totalCount && indexEnd > totalCount) {
    data = result.slice(indexBegin, totalCount);
  }
  ctx.body = {
    lessonList: data,
    totalCount,
  };
};