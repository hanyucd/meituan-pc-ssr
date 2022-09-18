const Router = require('@koa/router');
const cartModel = require('../models/cartModel');
const CryptoJS = require('crypto-js');

// 创建 koa 路由对象，设置前缀
const router = new Router({ prefix: '/cart' });

/**
 * 创建新购物车
 */
router.post('/create', async (ctx) => {
  console.log('!ctx.isAuthenticated()', !ctx.isAuthenticated());
  // 创建之前需要进行登录拦截
  if (!ctx.isAuthenticated()) { // isAuthenticated Whether to log in
    ctx.body = { code: -1, msg: 'please login' };
  } else {
    const time = Date(); // Date: For the same time zone
    const cartNo = CryptoJS.MD5(Math.random() * 1000 + time).toString();
    const { params: { id, detail } } = ctx.request.body; // ctx.request.body: post Way to get data
    // session下有个passport对象，里面存有user
    // eslint-disable-next-line new-cap
    const cart = new cartModel({ id, cartNo, time, user: ctx.session.passport.user, detail });

    const result = await cart.save(); // Stored in the database
    if (result) {
      ctx.body = {
        code: 0,
        msg: '',
        id: cartNo
      };
    } else {
      ctx.body = {
        code: -1,
        msg: 'fail'
      };
    }
  }
});

/**
 * 获取购物车信息
 */
router.post('/getCart', async (ctx) => {
  const { id } = ctx.request.body;
  console.log('server-post', id);

  try {
    const result = await cartModel.findOne({ cartNo: id });
    console.log('结果:', result);

    ctx.body = {
      code: 0,
      data: result ? result.detail[0] : {}
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      data: {}
    };
  }
});

module.exports = router;
