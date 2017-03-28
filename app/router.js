'use strict';

const Router = require('koa-router');
const router = new Router();
const controller = require('./controller/index').controller;

// 首页
router.get('/', controller.page.home);

// 个人中心
router.get('/person/:id', controller.page.person);

// 课程主页
router.get('/lesson/:id', controller.page.lesson);

// api
router.post('/api/addUser', controller.user.addUser);
router.post('/api/login', controller.user.login);
router.get('/api/checkLogin', controller.user.checkLogin);
router.get('/api/logout', controller.user.logout);
router.post('/api/uploadVideo', controller.file.uploadVideo);
router.post('/api/uploadImg', controller.file.uploadImg);
router.post('/api/createLesson', controller.lesson.create);
router.post('/api/deleteLesson', controller.lesson.delete);
router.post('/api/modifyLesson', controller.lesson.modify);
router.post('/api/searchLessonByUserId', controller.lesson.searchByUserId);
router.post('/api/searchLessonByLessonId', controller.lesson.searchByLessonId);

exports.router = router;

