const Koa = require('koa');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt'); ;; // 处理post请求参数

const mongoose = require('mongoose'); // mongoose
const bodyParser = require('koa-bodyparser');
const session = require('koa-generic-session'); // 处理session
const Redis = require('koa-redis'); // 处理session
const json = require('koa-json'); // 数据库配置
const dbConfig = require('./dbs/config'); // 数据库配置
const passport = require('./interface/utils/passport');

const userRoute = require('./interface/userRoute'); // koa用户相关路由接口

const app = new Koa();

// 连接数据库
mongoose.connect(dbConfig.dbs, { useNewUrlParser: true });
// 设置中间件
app.use(session({ key: 'mt', prefix: 'mt:uid', store: new Redis() }));
app.keys = ['mt', 'keys'];
app.use(passport.initialize());
app.use(passport.session());
app.use(json());

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = app.env !== 'production';

// 设置中间件
app.use(bodyParser({ extendTypes: ['json', 'form', 'text'] }));

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server;

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // koa路由处理
  app.use(userRoute.routes()).use(userRoute.allowedMethods());

  app.use((ctx) => {
    ctx.status = 200;
    ctx.respond = false; // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res);
  });

  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}

start();
