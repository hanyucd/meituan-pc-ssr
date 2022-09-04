const Router = require('@koa/router');

const categoryModel = require('../models/categoryModel');

// 创建 koa 路由对象，设置前缀
const router = new Router({ prefix: '/category' });

router.get('/crumbs', async (ctx) => {
  // const result = await categoryModel.findOne({
  //   // city: ctx.query.city
  // });

  const result = await categoryModel.find();
  // const result = await poiModel.find().limit(10);

  console.log('服务端:', result);

  if (result) {
    ctx.body = {
      areas: [],
      types: []
    };
    // ctx.body = {
    //   areas: result.areas,
    //   types: result.types
    // };
  } else {
    ctx.body = {
      areas: [],
      types: []
    };
  }

  // let {status,data:{areas,types}} = await axios.get('http://cp-tools.cn/categroy/crumbs',{
  //   params:{
  //     city:ctx.query.city.replace('市','') || "北京",
  //     sign
  //   }
  // })
  // ctx.body={
  //   areas: status===200?areas:[],
  //   types: status===200?types:[]
  // }
});

module.exports = router;
