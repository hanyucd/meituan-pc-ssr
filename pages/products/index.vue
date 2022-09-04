<template>
  <el-row class="page-product">
    <el-col :span="19">
      <!-- 面包屑组件 -->
      <crumbs :keyword="keyword" />
      <!-- 分类区域筛选组件 -->
      <categroy :types="types" :areas="areas" />
      <!-- 产品列表组件 -->
      <list :list="list" />
    </el-col>

    <el-col :span="5">
      <!-- 地图组件 -->
      <!-- <amap v-if="point.length" :width="230" :height="290" :point="point" /> -->
    </el-col>
  </el-row>
</template>
<script>
import Crumbs from '@/components/products/crumbs.vue';
import Categroy from '@/components/products/category.vue';
import List from '@/components/products/list.vue';
// import Amap from '@/components/products/map.vue';
export default {
  name: 'ProductsPage',
  components: {
    Crumbs,
    Categroy,
    List
    // Amap
  },
  /**
   * nuxt异步数据生命周期，渲染前获取数据，返回的值自动写入 Data
   */
  async asyncData (ctx) {
    // 通过ctx拿到请求上下文
    const keyword = ctx.query.keyword; // 提取关键词
    const city = ctx.store.state.geoModule.position.city; // 提取用户城市
    const serverUrl = 'http://localhost:3000';

    // 向服务端相应接口发送请求
    // 请求指定城市关键词的产品
    const { status, data: { count, pois } } = await ctx.$axios.get(`${serverUrl}/search/resultsByKeywords`, {
      params: {
        keyword, // 关键词
        city // 城市
      }
    });

    // 制定城市得到城市内的所有区域和类别(用于筛选)
    const { status: status2, data: { areas, types } } = await ctx.$axios.get(`${serverUrl}/category/crumbs`, {
      params: {
        city
      }
    });
    console.log('类型：', types);

    if (status === 200 && status2 === 200) {
      return {
        list: pois.filter(item => item.photos.length).map((item) => { // 产品信息列表（用于产品列表）
          // filter()过滤掉无图数据
          // 优化数据结构（把后端数据进行处理映射为前端方便可用）
          return {
            type: item.type, // 类型
            img: item.photos[0].url, // 介绍图
            name: item.name, // 产品名
            comment: Math.floor(Math.random() * 10000), // 评论人数
            rate: Number(item.biz_ext.rating), // 评分
            price: Number(item.biz_ext.cost), // 价格
            scene: item.tag, // 标签
            tel: item.tel, // 联系电话
            status: '可订明日', // 状态
            location: item.location, // 地址
            module: item.type.split(';')[0] // 所属模块
          };
        }),
        keyword, // 关键词（用于面包屑导航）
        areas: areas.filter(item => item.type !== '').slice(0, 5), // 所有区域（用于区域筛选）
        types: types.filter(item => item.type !== '').slice(0, 5) // 所有类型（用于类型筛选）
        // point: (pois.find(item => item.location).location || '').split(',') // 经纬度坐标（用于地图）
      };
    }
  },
  data () {
    return {
      // list: [],
      // types: [],
      // areas: [],
      // keyword: '',
      // point: []
    };
  }
};
</script>

<style lang="scss">
@import '@/assets/css/products/index.scss';
</style>
