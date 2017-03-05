'use strict';

const path = require('path');
const baseLogPath = path.resolve(__dirname, '../logs')

const errorPath = '/error';
const errorFileName = 'error';
const errorLogPath = baseLogPath + errorPath + '/' + errorFileName;

const responsePath = '/response';
const responseFileName = 'response';
const responseLogPath = baseLogPath + responsePath + '/' + responseFileName;


module.exports = {
  appenders:
    [
      // 错误日志
      {
        category: 'errorLogger',             // logger名称
        type: 'dateFile',                   // 日志类型
        filename: errorLogPath,             // 日志输出位置
        alwaysIncludePattern: true,          // 是否总是有后缀名
        pattern: '-yyyy-MM-dd-hh.log',       // 后缀，每小时创建一个新的日志文件
        path: errorPath,
      },
      // 响应日志
      {
        category: 'resLogger',
        type: 'dateFile',
        filename: responseLogPath,
        alwaysIncludePattern: true,
        pattern: '-yyyy-MM-dd-hh.log',
        path: responseLogPath,
      },
    ],
  levels:
    {
      errorLogger: 'ERROR',
      resLogger: 'ALL',
    },
  baseLogPath: '',
};
