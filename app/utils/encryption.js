'ust strict';

const md5 = require('md5');

module.exports = {
  encryptionByMd5(value) {
    return md5(value);
  },
};