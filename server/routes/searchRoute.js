const Router = require('@koa/router');

const poiModel = require('../models/poiModel');
const productModel = require('../models/productModel');

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

/**
 * 根据关键字搜索
 */
router.get('/resultsByKeywords', async (ctx) => {
  // const { city, keyword } = ctx.query
  // let { status, data: {count, pois} } = await axios.get(`http://cp-tools.cn/search/resultsByKeywords`, {
  //   params: {
  //     city,
  //     keyword,
  //     sign
  //   }
  // })
  // ctx.body = {
  //   count: status === 200 ? count : 0,
  //   pois: status === 200 ? pois : []
  // }

  try {
    // const result = await ResultsByKeywords.findOne();
    ctx.body = { count: 0, pois: [] };

    // ctx.body = {
    //   count: result.count,
    //   pois: result.pois
    // };
  } catch (e) {
    ctx.body = { count: 0, pois: [] };
  }
});

/**
 * 获取制定城市关键词的产品信息
 */
router.get('/products', async(ctx) => {
  // const keyword = ctx.query.keyword || '旅游'
  // const city = ctx.query.city || '北京'
  // const city = '广州';
  const city = '北京';
  try {
    const result = await productModel.findOne({ city });
    ctx.body = {
      keyword: result.keyword,
      product: result.product,
      more: ctx.isAuthenticated() ? result.more : [],
      login: ctx.isAuthenticated(), // ctx.isAuthenticated(): Is it logged in??
      type: result.type
    };
  } catch (e) {
    ctx.body = {
      keyword: '',
      product: {},
      more: [],
      login: false,
      type: ''
    };
  }
});

module.exports = router;
