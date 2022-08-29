const Router = require('@koa/router');
const axios = require('../utils/axios');

// 创建 koa 路由对象，设置前缀
const router = new Router({ prefix: '/geo' });

const sign = '2695a435bae7897e2cc9fc2e0ed4ef43';

/**
 * 查询当前省份/城市
 */
router.get('/getPosition', async (ctx) => {
  // 使用第三方接口得到数据
  // const { status, data: { province, city } } = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`);
  // if (status === 200) {
  //   ctx.body = { province, city };
  // } else {
  //   ctx.body = { province: '福建省', city: '厦门市' };
  // }

  // const result = await Positon.findOne() // Operating a local database
  // ctx.body = {
  //   province: result.province,
  //   city: result.city
  // }

  ctx.body = {
    province: '浙江省',
    city: '杭州市'
  };
});

module.exports = router;
