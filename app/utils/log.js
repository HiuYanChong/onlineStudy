'use strict';
const fs = require('fs');
const log4js = require('log4js');
const logConfig = require('../../config/log');
const isProd = process.env.NODE_ENV === 'production';


const confirmPath = function(pathStr) {
  if (!fs.existsSync(pathStr)) {
    fs.mkdirSync(pathStr);
    console.log('createPath: ' + pathStr);
  }
};

const initLogPath = function() {
  if (logConfig.baseLogPath) {
    confirmPath(logConfig.baseLogPath)
    for (let i = 0, len = logConfig.appenders.length; i < len; i++) {
      if (logConfig.appenders[i].path) {
        confirmPath(logConfig.baseLogPath + logConfig.appenders[i].path);
      }
    }
  }
};

initLogPath();

// 加载配置文件
log4js.configure(logConfig);

const logUtil = {};

const errorLogger = log4js.getLogger('errorLogger');
const resLogger = log4js.getLogger('resLogger');

// 封装错误日志
logUtil.logError = function(ctx, error, resTime) {
  if (ctx && error) {
    const errorLog = formatError(ctx, error, resTime);
    errorLogger.error(errorLog);
    if (!isProd) {
      console.error(errorLog);
    }
  }
};

// 封装响应日志
logUtil.logResponse = function(ctx, resTime) {
  if (ctx) {
    const resLog = formatRes(ctx, resTime);
    resLogger.info(resLog);
    if (!isProd) {
      console.info(resLog);
    }
  }
};

// 格式化响应日志
const formatRes = function(ctx, resTime) {
  let logText = new String();

  // 响应日志开始
  logText += '\n' + '*************** response log start ***************' + '\n';

  // 添加请求日志
  logText += formatReqLog(ctx.request, resTime);

  // 响应状态码
  logText += 'response status: ' + ctx.status + '\n';

  // 响应内容
  logText += 'response body: ' + '\n' + JSON.stringify(ctx.body) + '\n';

  // 响应日志结束
  logText += '*************** response log end ***************' + '\n';

  return logText;

}

// 格式化错误日志
const formatError = function (ctx, err, resTime) {
  let logText = new String();

  // 错误信息开始
  logText += '\n' + '*************** error log start ***************' + '\n';

  // 添加请求日志
  logText += formatReqLog(ctx.request, resTime);

  // 错误名称
  logText += 'err name: ' + err.name + '\n';
  // 错误信息
  logText += 'err message: ' + err.message + '\n';
  // 错误详情
  logText += 'err stack: ' + err.stack + '\n';

  // 错误信息结束
  logText += '*************** error log end ***************' + '\n';

  return logText;
};

// 格式化请求日志
const formatReqLog = function(req, resTime) {
  let logText = new String();

  const method = req.method;
  // 访问方法
  logText += 'request method: ' + method + '\n';

  // 请求原始地址
  logText += 'request originalUrl:  ' + req.originalUrl + '\n';

  // 客户端ip
  logText += 'request client ip:  ' + req.ip + '\n';

  // 请求参数
  if (method === 'GET') {
    logText += 'request query:  ' + JSON.stringify(req.query) + '\n';
  } else {
    logText += 'request body: ' + '\n' + JSON.stringify(req.body) + '\n';
  }
  // 服务器响应时间
  logText += 'response time: ' + resTime + '\n';

  return logText;
};

module.exports = logUtil;
