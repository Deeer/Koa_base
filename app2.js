/*
 中间件
 */

const Koa = require('koa')
const app = new Koa()

app.use(async (ctx,next) => {
    let stime = new Date().getTime()
    await next()
    let etime = new Date().getTime()
    ctx.response.type = 'text/html'
    ctx.response.body = '<h1>hellow word</h1>'
    console.log(`请求地址是 ： ${ctx.path} 响应时间是 ${etime - stime} ms`)
})

app.use(async (ctx, next) => {
  console.log("中间件1 dosomething")
  await next()
  console.log('中间件1 end');
})

app.use(async (ctx, next) => {
  console.log("中间件2 dosomething")
  // await next()
  console.log('中间件2 end');
})

app.use(async (ctx, next) => {
  console.log("中间件3 dosomething")
  await next()
  console.log('中间件3 end');
})

app.listen(3000, ()=> {
    console.log('server is running at http:// localhost: 3000');
})

/*  log ---------
dee >>> node app2.js                                             18-03-29 23:15
  server is running at http:// localhost: 3000
  中间件1 dosomething
  中间件2 dosomething
  中间件3 dosomething
  中间件3 end
  中间件2 end
  中间件1 end
  请求地址是 ： / 响应时间是 1 ms
 */

/*
  如果去掉第二个await next（）方法调用，则不会调用到第三个方法中
  app.use(async (ctx, next) => {
    console.log("中间件2 dosomething")
    // await next()
    console.log('中间件2 end');
  })

  log ---------
  Dee.local/Users/dee/Desktop/NodePractice/lession1
  dee >>> node app2.js                                             18-03-29 23:17
  server is running at http:// localhost: 3000
  中间件1 dosomething
  中间件2 dosomething
  中间件2 end
  中间件1 end
  请求地址是 ： / 响应时间是 1 ms
 */
