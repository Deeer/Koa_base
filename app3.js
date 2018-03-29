/*
  koa router -- 比较笨的写法
 */

/*
  asyc 标记的函数为异步函数，在异步函数中，可以用await 调用另一个异步函数，
  async 和 await 这两个关键字是ES7中引入的，参数ctx是koa引入的，我们可以通过他来访问
  request 和response ,next是koa传入的将要处理的下一个异步函数。

  注意，node在v7.6.0 中才支持async 和 await 所以在运行node 之前，确保版本正确
 */
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
    if (ctx.request.path == '/') {
        ctx.response.body = '<h1>index pagt</h1>'
    } else {
      await next()
    }
})

app.use(async (ctx, next) => {
  if (ctx.request.path == '/home') {
    ctx.response.body = '<h1>home page</h1>'
  } else {
     await next()
  }
})

app.use(async (ctx, next) => {
    if (ctx.request.path == '/404') {
        ctx.response.body = '<h1>404 not found</h1>'
    } else {
      await next()
    }
})

app.listen(3000, ()=>{
  console.log('server us running at http://localhost: 3000')
})
