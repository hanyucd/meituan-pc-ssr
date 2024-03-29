const Router = require('@koa/router');
const OrderModel = require('../models/orderModel');
const CartModel = require('../models/cartModel');
const CryptoJS = require('crypto-js'); // 加密

const router = new Router({ prefix: '/order' });

// 创建购物车分类栏
router.post('/createOrder', async(ctx) => {
  const { id, price, count } = ctx.request.body;
  const time = Date();
  const orderID = CryptoJS.MD5(Math.random() * 1000 + time).toString();
  // isAuthenticated 是否登录
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: '请先登录!'
    };
  } else {
    const findCart = await CartModel.findOne({ cartNo: id });
    const order = new OrderModel({
      id: orderID,
      count,
      total: price * count,
      time,
      user: ctx.session.passport.user,
      name: findCart.detail[0].name,
      imsg: findCart.detail[0].imgs,
      status: 0
    });
    try {
      const result = await order.save();
      if (result) {
        await findCart.remove();
        ctx.body = {
          code: 0,
          id: orderID
        };
      } else {
        ctx.body = {
          code: -1
        };
      }
    } catch (e) {
      ctx.body = {
        code: -1
      };
    }
  }
});

// 获取购物车分类栏
router.get('/getOrders', async (ctx) => {
  // isAuthenticated 是否登录
  if (!ctx.isAuthenticated()) {
    ctx.body = { code: -1, list: [], msg: 'please login' };
  } else {
    try {
      // find 查询所有
      const result = await OrderModel.find();
      if (result) {
        ctx.body = {
          code: 0,
          list: result
        };
      } else {
        ctx.body = {
          code: -1
        };
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        list: []
      };
    }
  }
});

module.exports = router;
