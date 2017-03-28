'use strict';

const user = require('./user');
const page = require('./page');
const file = require('./file');
const lesson = require('./lesson');

exports.controller = {
  user,
  page,
  file,
  lesson,
};
