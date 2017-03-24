'use strict';

const developmentEnv = require('./config/dev');
const testEnv = require('./config/test');
const prodEnv = require('./config/prod');
const isProd = process.env.NODE_ENV === 'production';
const webpackDevServer = require('./build/webpack-dev-server');

// 环境配置
const env = {
  development: developmentEnv,
  test: testEnv,
  production: prodEnv,
}[process.env.NODE_ENV || 'development'];

const path = require('path');
const koa = require('koa');
const mongo = require('koa-mongo');
const middleware = require('./app/middleware/index');
const koaNunjucks = require('koa-nunjucks-2');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const logger = require('koa-logger');
const session = require('koa-session');
const convert = require('koa-convert');
const router = require('./app/router').router;
const app = new koa();

// 链接数据库
app.use(mongo({
  uri: env.mongodb,
  max: 1000,
  min: 1,
  timeout: 30000,
  log: false,
}));

// session
app.keys = ['onlineStudy'];
const SESSIONCONFIG = {
  key: 'onlineStudy',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
};
app.use(convert(session(SESSIONCONFIG, app)));

// terminal logger
if (env.env === 'development') {
  app.use(logger());
}

// 文件logger
app.use(middleware.logger);

// render
app.use(koaNunjucks({
  ext: 'tpl',
  path: path.join(__dirname, '/app/views'),
  nunjucksConfig: {
    autoescape: true,
  },
}));

app.use(json())
  .use(bodyParser())
  .use(async (ctx, next) => {
    ctx.body = ctx.request.body;
    await next();
  })
  .use(middleware.responseHandler(/^\/api/))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(env.port);

if (!isProd) {
  webpackDevServer.listen(8080, 'localhost', () => {
    console.info('webpackDevServer Listening to 8080');
  });
}
module.exports = app;
