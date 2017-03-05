'use strict';

const developmentEnv = require('./config/dev');
const testEnv = require('./config/test');

// 环境配置
const env = {
  development: developmentEnv,
  test: testEnv,
}[process.env.NODE_ENV || 'development'];

const koa = require('koa');
const middleware = require('./app/middleware/index');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const logger = require('koa-logger');
const router = require('./app/router').router;

const mongoose = require('mongoose');
mongoose.connect(env.mongodb);

const app = new koa();

// terminal logger
if (env.env === 'development') {
  app.use(logger());
}

// 文件logger
app.use(middleware.logger);

app.use(json())
  .use(bodyParser())
  .use(async (ctx, next) => {
    ctx.body = ctx.request.body;
    await next();
  })
  .use(middleware.responseHandler)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(env.port);
