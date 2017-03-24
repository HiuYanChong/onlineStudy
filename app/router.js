'use strict';

const Router = require('koa-router');
const router = new Router();
const controller = require('./controller/index').controller;

// 首页
router.get('/', controller.page.home);

// 个人中心
router.get('/person/:id', controller.page.person);

// api
router.post('/api/addUser', controller.user.addUser);
router.post('/api/login', controller.user.login);
router.get('/api/checkLogin', controller.user.checkLogin);
router.get('/api/logout', controller.user.logout);

exports.router = router;

