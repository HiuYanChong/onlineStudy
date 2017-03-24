/**
 * Created by ucweb on 17/3/24.
 */
const ApiError = require('../middleware/response_handler/lib/api_error');

exports.dbOperationHander = (ctx, result) => {
  if (result.result && result.result.ok !== 1) {
    const error = new ApiError('dbOperationFailed');
    throw error;
  }
};
