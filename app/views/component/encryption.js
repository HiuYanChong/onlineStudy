import md5 from 'md5';

export default {
  encryptByMd5(value) {
    return md5(value);
  },
};
