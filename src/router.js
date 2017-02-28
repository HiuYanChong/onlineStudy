'use strict';

const router = require('koa-router')();

router.get('/home', function* () {
  this.body = 'hello home';
});

exports.router = router;

