const responseHandler = async (ctx, next) => {
  // 执行路由
  await next();

  // 如果有返回数据，将返回数据添加到data中
  if (ctx.body) {
    ctx.body = {
      code: 1,
      message: 'success',
      data: ctx.body
    };
  } else {
    ctx.body = {
      code: 0,
      message: 'success',
    };
  }
}

module.exports = responseHandler;