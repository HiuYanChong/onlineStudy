'use strict';

const Router = require('koa-router');
const router = new Router();
const controller = require('./controller/index').controller;

// 首页
router.get('/', controller.page.home);
router.get('/home', controller.page.home);

// 个人中心
router.get('/person/:id', controller.page.person);

// 课程主页
router.get('/lesson/:id', controller.page.lesson);

// api
router.post('/api/addUser', controller.user.addUser);
router.post('/api/login', controller.user.login);
router.get('/api/checkLogin', controller.user.checkLogin);
router.get('/api/logout', controller.user.logout);
router.post('/api/attendLesson', controller.user.attendLesson);
router.post('/api/getAttendLesson', controller.user.getAttendLesson);
router.post('/api/getAttendLessonInfo', controller.user.getAttendLessonInfo);
router.post('/api/quitLesson', controller.user.quitLesson);
router.post('/api/uploadVideo', controller.file.uploadVideo);
router.post('/api/uploadImg', controller.file.uploadImg);
router.post('/api/createLesson', controller.lesson.create);
router.post('/api/deleteLesson', controller.lesson.delete);
router.post('/api/modifyLesson', controller.lesson.modify);
router.post('/api/searchLessonByUserId', controller.lesson.searchByUserId);
router.post('/api/searchLessonByLessonId', controller.lesson.searchByLessonId);
router.post('/api/queryLessonCount', controller.lesson.queryLessonCount);
router.post('/api/lessonList', controller.lesson.lessonList);

exports.router = router;

