const Router = require('@koa/router');

const poiModel = require('../models/poiModel');

// 创建 koa 路由对象，设置前缀
const router = new Router({ prefix: '/search' });

/**
 * 输入框搜索
 */
router.get('/top', async (ctx) => {
  try {
    // const top = await poiModel.find({
    //   name: new RegExp(ctx.query.input),
    //   city: ctx.query.city
    // });
    const top = await poiModel.find({
      name: new RegExp(ctx.query.input)
    });

    ctx.body = {
      code: 0,
      top: top.map((item) => {
        return { name: item.name, type: item.type };
      }),
      type: top.length ? top[0].type : ''
    };
  } catch (e) {
    ctx.body = { code: -1, top: [] };
  }
});

/**
 * 根据城市获取推荐
 */
router.get('/hotPlace', async (ctx) => {
  const city = ctx.store ? ctx.store.state.geoModule.position.city : ctx.query.city; // ctx.query.city: store/index.js pass parameter
  try {
    // const result = await poiModel.find({ city, type: ctx.query.type || '景点' }).limit(10);
    const result = await poiModel.find().limit(10);

    ctx.body = {
      code: 0,
      result: result.map((item) => {
        return { name: item.name, type: item.type };
      })
    };
  } catch (e) {
    ctx.body = { code: -1, result: [] };
  }
});

module.exports = router;
