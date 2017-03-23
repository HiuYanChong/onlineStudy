/**
 * 自定义Api异常
 */
const ApiErrorNames = require('./api_error_name');

class ApiError extends Error {
  constructor(errorName) {
    super();
    const errorInfo = ApiErrorNames.getErrorInfo(errorName);
    this.name = errorName;
    this.code = errorInfo.errorCode;
    this.message = errorInfo.errorMessage;
  }
}

module.exports = ApiError
