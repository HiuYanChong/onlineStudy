'use strict';

exports.home = async(ctx, next) => {
  await ctx.render('page/home/home', {
    name: '1232',
    age: '111',
  });
};
