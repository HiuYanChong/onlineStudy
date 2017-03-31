const ApiError = require('./lib/api_error');

const responseHandler = async ctx => {
  // 如果有返回数据，将返回数据添加到data中
  if (ctx.body) {
    ctx.body = {
      code: 1,
      message: 'success',
      data: ctx.body,
    };
  } else {
    ctx.body = {
      code: 0,
      message: 'success',
    };
  }
};

const urlFilter = function(pattern) {
  return async (ctx, next) => {
    const reg = new RegExp(pattern);
    try {
      // 先去执行路由
      await next();
    } catch (error) {
      if (error instanceof ApiError && reg.test(ctx.originalUrl)){
        ctx.status = 200;
        ctx.body = {
          code: error.code,
          message: error.message,
        };
      }
      throw error;
    }

    // 通过正则的url进行格式化处理
    if (reg.test(ctx.originalUrl)) {
      responseHandler(ctx);
    }
  };
};

module.exports = urlFilter;
