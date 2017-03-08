const Router = require('koa-router')
const homeRouters = new Router()
// koa-body 用来处理post请求中的参数
const koaBody = require('koa-body')()
const MOCK = require('mockjs')

homeRouters.get('/home', async (ctx, next) => {
  // get请求 用 ctx.request.query 即可获得
  let data = {
    'data|1-20': [{
      'id|+1': 999,
      'name': function () {return MOCK.Random.cname()},
      'ico': function () { return MOCK.Random.image('100x100', MOCK.mock('@color'), 'img')}
    }]
  }
  let obj = {
    code: 200,
    message: 'success',
    data: MOCK.mock(data).data
  }
  ctx.response.body = obj
})
.post('/home', koaBody, async (ctx, next) => {
  ctx.response.body = ctx.request.body
})

module.exports = homeRouters
