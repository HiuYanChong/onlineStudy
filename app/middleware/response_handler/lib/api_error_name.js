/**
 * API错误名称
 */
let ApiErrorNames = {};

ApiErrorNames.UNKNOW_ERROR = 'unknowError';
ApiErrorNames.USER_NOT_EXIST = 'userNotExist';
ApiErrorNames.DB_ERROR = 'dbOperationFailed';
ApiErrorNames.Login_TIMEOUT = 'loginTimeOut';
ApiErrorNames.NAME_EXIST = 'nameExist';
ApiErrorNames.UPLOAD_EXISR = 'uploadFailed';
ApiErrorNames.IMG_REQUIRED = 'imageRequired';
ApiErrorNames.VIDEO_REQUIED = 'videoRequired';

/**
 * API错误名称对应的错误信息
 */
const errorMap = new Map();

errorMap.set(ApiErrorNames.UNKNOW_ERROR, { code: -1, message: '未知错误' });
errorMap.set(ApiErrorNames.USER_NOT_EXIST, { code: 101, message: '昵称或密码错误' });
errorMap.set(ApiErrorNames.DB_ERROR, { code: 102, message: '数据库操作失败' });
errorMap.set(ApiErrorNames.Login_TIMEOUT, { code: 103, message: '登录超时' });
errorMap.set(ApiErrorNames.NAME_EXIST, { code: 104, message: '昵称已存在' });
errorMap.set(ApiErrorNames.UPLOAD_EXISR, { code: 105, message: '上传失败' });
errorMap.set(ApiErrorNames.IMG_REQUIRED, { code: 106, message: '文件不是图片文件' });
errorMap.set(ApiErrorNames.VIDEO_REQUIED, { code: 107, message: '文件不是视频文件' });

// 根据错误名称获取错误信息
ApiErrorNames.getErrorInfo = (errorName) => {
  let errorInfo;

  if (errorName) {
    errorInfo = errorMap.get(errorName);
  }

  if (!errorInfo) {
    errorName = ApiErrorNames.UNKNOW_ERROR;
    errorInfo = errorMap.get(errorName);
  }

  return errorInfo;
};

module.exports = ApiErrorNames;
