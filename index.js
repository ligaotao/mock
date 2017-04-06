const Koa = require('koa');
const mongo = require('koa-mongo')
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const cors = require('koa-cors')

const app = new Koa();

const homeRouters = require('./routers/home')

app.use(cors())
app.use(mongo({
  host: 'localhost',
  port: 27017,
  db: 'test',
  max: 100,
  min: 1,
}))
// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(homeRouters.routes())
app.listen(3000)
console.log('app started at port 3000...');