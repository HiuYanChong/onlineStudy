'use strict';

exports.addUser = async(ctx, next) => {
  const name = ctx.request.body.username;
  const pass = ctx.request.body.password;
  const result = await ctx.mongo.collection('users').insert({ name, pass });
  console.log(result);
  const userId = result.ops[0]._id.toString();
  ctx.body = await ctx.mongo.db('test').collection('users').find()
    .toArray();
  /*ctx.mongo.db('test').collection('users').remove({
    _id: mongo.ObjectId(userId)
  });*/
};
