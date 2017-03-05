'use strict';

const Router = require('koa-router');
const router = new Router();
const controller = require('./controller/index').controller;


router.get('/home', function(ctx, next) {
  ctx.body = 'hello home';
});

router.post('/add', controller.user.addUser);

exports.router = router;

