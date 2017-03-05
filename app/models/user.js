'use strict';
const mongo = require('mongoose');
const Schema = mongo.Schema;
const id = Schema.objectId;

const user = new Schema({
  uid: id,
  name: String,
});

const USER = mongo.model('users', user);

exports = USER;
