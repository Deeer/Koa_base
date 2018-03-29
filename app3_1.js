/*
  本质上讲，路由也是一种中间件
  和之前不同的是，这里少了if判断，还省略了await next()

  除了get方法外，koa-router还支持其他请求方法
  .post('/users', async (ctx, next) => {
   // ...
   })
   .put('/users/:id', async (ctx, next) => {
     // ...
   })
   .del('/users/:id', async (ctx, next) => {
     // ...
   })
   .all('/users/:id', async (ctx, next) => {
     // ...
   });

   在任意的http请求中，遵从RESTful规范，可以把get／post／put/delete类型的请求分别对查／增／改／删
   这里router的方法也一一对应，通常我们使用get来获取数据，使用post来更新资源，put和delete使用比较少。
   all方法，通常用于匹配一组路由或者全部路由从而做一设置和处理，也可以处理不确定的从客户端发过来的请求方法类型的情况


   命名路由
   router.get('user', '/users/:id', function (ctx, next) {
  // ...
    });

    router.url('user', 3);
    // => 生成路由 "/users/3"

    router.url('user', { id: 3 });
    // => 生成路由 "/users/3"

    router.use(function (ctx, next) {
      // 重定向到路由名称为 “sign-in” 的页面
      ctx.redirect(ctx.router.url('sign-in'));
    })


    路由前缀
    通过 prefix 这个参数，我们可以为一组路由添加统一的前缀，和嵌套路由类似，也方便我们管理路由和简化路由的写法。不同的是，前缀是一个固定的字符串，不能添加动态参数。

    var router = new Router({
      prefix: '/users'
    });

    router.get('/', ...); // 匹配路由 "/users"
    router.get('/:id', ...); // 匹配路由 "/users/:id"

    该写法将有助于我们架构代码区块


    路由嵌套

    var forums = new Router();
    var posts = new Router();

    posts.get('/', function (ctx, next) {...});
    posts.get('/:pid', function (ctx, next) {...});
    forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());

    // 可以匹配到的路由为 "/forums/123/posts" 或者 "/forums/123/posts/123"
    app.use(forums.routes());
  */
const Koa = require('koa')
// 注意 require('koa-router') 返回的是函数:
const router = require('koa-router')()
const app = new Koa()

router.get('/',async (ctx, next) =>{
    ctx.response.body = '<h1>index page</h1>'
})

router.get('/user/:id', function (ctx, next) {
  console.log(ctx.url.id);
  ctx.response.body = `<h1>user page </h1>`
 });

router.get('/home',async (ctx, next) =>{

})

router.get('/404',async (ctx, next) =>{
    ctx.response.body = '<h1>404 page</h1>'
})


app.use(router.routes())

app.listen(3000, ()=> {
    console.log('sever is running at localhost:3000');
})
