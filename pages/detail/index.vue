<template>
  <div class="page-detail">
    <el-row>
      <el-col :span="24">
        <!-- 面包屑 -->
        <crumbs :keyword="keyword" :type="type" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <!-- tab:导航 -->
        <summa :meta="product" />
      </el-col>
    </el-row>
    <el-row class="m-title">
      <el-col :span="24">
        <h3>商家团购及优惠</h3>
      </el-col>
    </el-row>
    <el-row v-if="canOrder || !login">
      <el-col :span="24">
        <!-- 列表 -->
        <list v-if="login" :list="list" />

        <div v-else class="deal-need-login">
          <img src="https://i.loli.net/2019/01/10/5c3763c93e4bc.png" alt="登录查看">
          <span>请登录后查看详细团购优惠</span>
          <el-button type="primary" round>
            <a href="/login">立即登录</a>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Crumbs from '@/components/detail/crumbs.vue';
import Summa from '@/components/detail/summary.vue';
import List from '@/components/detail/list.vue';

export default {
  name: 'DetailPage',
  components: { Crumbs, Summa, List },

  async asyncData(ctx) {
    const serverUrl = 'http://localhost:3000';

    const { status, data: { product, more: list, login, type, keyword } } = await ctx.$axios.get(`${serverUrl}/search/products`, {
      params: {
        city: ctx.store.state.geoModule.position.city
      }
    });
    // console.log(login, product, list)
    if (status === 200) {
      return {
        keyword,
        product,
        type,
        list,
        login
      };
    } else {
      return {
        keyword,
        product: {},
        type,
        list: [],
        login: false
      };
    }
  },
  computed: {
    canOrder() {
      return this.list.filter(item => item.photos.length).length;
    }
  }
};
</script>

<style lang="scss">
  @import "@/assets/css/detail/index.scss";
</style>
