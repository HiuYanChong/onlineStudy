'use strict';

const Router = require('koa-router');
const router = new Router();
const controller = require('./controller/index').controller;


router.get('/', controller.home.home);
router.post('/api/addUser', controller.user.addUser);

exports.router = router;

