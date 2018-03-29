const Koa = require('koa')
const app = new Koa()

//每收到一个http请求，koa都会调用通过app.use注册的async 函数。 同时为该函数传入ctx和 next
//两个参数。而这个async函数就是我们说的中间件

/**
 * ctx 作为上下文使用， 包含了基本的ctx.request 和 ctx.response 另外 koa内部，对一些常用的
 * 属性和方法作了代理操作，使得我们可以直接通过ctx获取
 * 除此之外，koa还约定了一个中间件的存储空间，ctx.state 通过state可以存储一些数据
 *
 * next 的作用是将处理的控制权交给下一个中间件，而next（）后面的代码，将会在下一个中间件及后面的中间
 * 件执行结束之后再执行
 */
app.use(async (ctx,next) => {
  await next()
  ctx.response.type = 'text/html'
  ctx.response.body = '<h1>hellow</h1>'
})

app.listen(3000, ()=> {
  console.log('start at port 3000')
})
