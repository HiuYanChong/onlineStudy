'use strict';

exports.home = async(ctx, next) => {
  await ctx.render('page/home/home', {});
};

exports.person = async(ctx, next) => {
  await ctx.render('page/person/person', {});
};
