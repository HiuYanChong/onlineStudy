'use strict';

const asyncBusboy = require('async-busboy');
const path = require('path');
const fs = require('fs');
const os = require('os');
const ApiError = require('../middleware/response_handler/lib/api_error');

// 优化
// TODO

exports.uploadVideo = async(ctx, next) => {
  const { files, fields } = await asyncBusboy(ctx.req);
  const src = [];
  await new Promise(resolve => {
    for (let i = 0; i < files.length;i++) {
      const item = files[i];
      // 上传的不是视频
      if (!/^video/.test(item.mimeType)) {
        const error = new ApiError('videoRequired');
        throw error;
      }
      const file = item.filename.split('.');
      const fileName = `${file[0]}${new Date() * 1}.${file[file.length - 1]}`;
      const imgPath = path.join(__dirname, '../../dist/' + fileName);
      fs.open(imgPath, 'w', (err) => {
        if (err) {
          const uploadError = new ApiError('uploadFailed');
          throw uploadError;
        }
        const stream = fs.createWriteStream(imgPath);
        try {
          files[0].pipe(stream);
        } catch (err) {
          const error = new ApiError('uploadFailed');
          throw error;
        }
        src.push(`/dist/${fileName}`);
        if (i === files.length - 1) {
          resolve();
        }
      });
    }
  });
  ctx.body = {
    src,
  };
};

exports.uploadImg = async(ctx, next) => {
  const { files, fields } = await asyncBusboy(ctx.req);
  const src = [];
  await new Promise(resolve => {
    for (let i = 0; i < files.length;i++) {
      const item = files[i];
      // 上传的不是图片
      if (!/^image/.test(item.mimeType)) {
        const error = new ApiError('imageRequired');
        throw error;
      }
      const file = item.filename.split('.');
      const fileName = `${file[0]}${new Date() * 1}.${file[file.length - 1]}`;
      const imgPath = path.join(__dirname, '../../dist/' + fileName);
      fs.open(imgPath, 'w', (err) => {
        if (err) {
          const uploadError = new ApiError('uploadFailed');
          throw uploadError;
        }
        const stream = fs.createWriteStream(imgPath);
        try {
          files[0].pipe(stream);
        } catch (err) {
          const error = new ApiError('uploadFailed');
          throw error;
        }
        src.push(`/dist/${fileName}`);
        if (i === files.length - 1) {
          resolve();
        }
      });
    }
  });
  ctx.body = {
    src,
  };
};
