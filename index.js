'use strict';

const koa = require('koa');
const app = new koa();
const router = require('./src/router').router;

const mongoose = require('mongoose');
mongoose.content();


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(5000);
