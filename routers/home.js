const Router = require('koa-router')
const homeRouters = new Router()
// koa-body 用来处理post请求中的参数
const koaBody = require('koa-body')()
const MOCK = require('mockjs')

homeRouters.get('/home', async (ctx, next) => {
  // get请求 用 ctx.request.query 即可获得
  // const result = await ctx.mongo.db('test').collection('users').insert({name: 'lee'})
  // const userId = result.ops[0]._id.toString();
  ctx.response.body = await ctx.mongo.db('test').collection('users').find().toArray();
  ctx.mongo.db('test').collection('users').remove({name: 'lee'})
  // ctx.response.body = obj
})
.post('/home', koaBody, async (ctx, next) => {
  const result = await ctx.mongo.db('test').collection('users').insert({name: 'lee'})
  const userId = result.ops[0]._id.toString();
  ctx.response.body = await ctx.mongo.db('test').collection('users').find().toArray();
  ctx.mongo.db('test').collection('users').remove({
    _id: mongo.ObjectId(userId)
  });
  
})

module.exports = homeRouters
