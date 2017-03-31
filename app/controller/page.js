'use strict';

exports.home = async(ctx, next) => {
  await ctx.render('page/home/home', {});
};

exports.person = async(ctx, next) => {
  await ctx.render('page/person/person', {});
};

exports.lesson = async(ctx, next) => {
  const lessonId = ctx.params.id;
  await ctx.render('page/lesson/lesson', {
    lessonId,
  });
};

exports.search = async(ctx, next) => {
  await ctx.render('page/search/search', {});
};