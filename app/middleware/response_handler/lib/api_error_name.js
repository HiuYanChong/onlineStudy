/**
 * API错误名称
 */
let ApiErrorNames = {};

ApiErrorNames.UNKNOW_ERROR = 'unknowError';
ApiErrorNames.USER_NOT_EXIST = 'userNotExist';
ApiErrorNames.DB_ERROR = 'dbOperationFailed';
ApiErrorNames.Login_TIMEOUT = 'loginTimeOut';

/**
 * API错误名称对应的错误信息
 */
const errorMap = new Map();

errorMap.set(ApiErrorNames.UNKNOW_ERROR, { code: -1, message: '未知错误' });
errorMap.set(ApiErrorNames.USER_NOT_EXIST, { code: 101, message: '昵称或密码错误' });
errorMap.set(ApiErrorNames.DB_ERROR, { code: 102, message: '数据库操作失败' });
errorMap.set(ApiErrorNames.Login_TIMEOUT, { code: 103, message: '登录超时' });

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
