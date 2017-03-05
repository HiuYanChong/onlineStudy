'use strict';

exports.addUser = async(ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = 'hhh';
};
