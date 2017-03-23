/**
 * API错误名称
 */
let ApiErrorNames = {};

ApiErrorNames.UNKNOW_ERROR = 'unknowError';
ApiErrorNames.USER_NOT_EXIST = 'userNotExist';

/**
 * API错误名称对应的错误信息
 */
const errorMap = new Map();

errorMap.set(ApiErrorNames.UNKNOW_ERROR, { code: -1, message: '未知错误' });
errorMap.set(ApiErrorNames.USER_NOT_EXIST, { code: 101, message: '用户不存在' });

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