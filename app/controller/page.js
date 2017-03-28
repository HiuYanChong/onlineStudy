'use strict';

exports.home = async(ctx, next) => {
  await ctx.render('page/home/home', {});
};

exports.person = async(ctx, next) => {
  await ctx.render('page/person/person', {});
};

exports.lesson = async(ctx, next) => {
  const lessonId = ctx.params.id;
  console.log(lessonId);
  await ctx.render('page/lesson/lesson', {
    lessonId,
  });
};