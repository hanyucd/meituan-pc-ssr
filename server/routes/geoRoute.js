const Router = require('@koa/router');
const axios = require('../utils/axios');

const menuModel = require('../models/menuModel');
const provinceModel = require('../models/provinceModel');
const cityModuel = require('../models/cityModuel');

// 创建 koa 路由对象，设置前缀
const router = new Router({ prefix: '/geo' });

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

/**
 * 获取省份
 */
router.get('/menu', async (ctx) => {
  const result = await menuModel.findOne();
  ctx.body = { menu: result.menu };
});

/**
 * 获取省份
 */
router.get('/province', async (ctx) => {
  const province = await provinceModel.find();
  ctx.body = {
    province: province.map((item) => {
      return {
        id: item.id,
        name: item.value
      };
    })
  };
});

/**
 * 得到指定省的城市
 */
router.get('/province/:id', async (ctx) => {
  const city = await cityModuel.findOne({ id: ctx.params.id });

  ctx.body = {
    code: 0,
    city: city.value.map((item) => {
      return { id: item.id, province: item.province, name: item.name };
    })
  };
});

/**
 * 得到全国所有城市
 */
router.get('/city', async (ctx) => {
  let city = [];
  const result = await cityModuel.find();
  result.forEach((item) => {
    city = city.concat(item.value);
  });

  ctx.body = {
    code: 0,
    city: city.map((item) => {
      return {
        province: item.province,
        id: item.id,
        name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
          ? item.province
          : item.name
      };
    })
  };
});

/**
 * 得到热门城市列表
 */
router.get('/hotCity', async (ctx) => {
  const list = ['北京市', '上海市', '广州市', '深圳市', '天津市', '西安市', '杭州市', '南京市', '武汉市', '成都市'];
  const result = await cityModuel.find();

  let nList = [];
  result.forEach((item) => {
    nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)));
  });

  ctx.body = {
    hots: nList
  };
});

module.exports = router;
