<template>
  <div class="page-order">
    <el-row>
      <el-col :span="4" class="navbar">
        <h3>我的美团</h3>
        <dl>
          <dt>我的订单</dt>
          <dd>全部订单<i class="el-icon-arrow-right" /></dd>
          <dd>待付款<i class="el-icon-arrow-right" /></dd>
          <dd>待使用<i class="el-icon-arrow-right" /></dd>
        </dl>
        <dl>
          <dt>我的收藏</dt>
          <dd>收藏的商家<i class="el-icon-arrow-right" /></dd>
          <dd>收藏的团购<i class="el-icon-arrow-right" /></dd>
        </dl>
        <dl>
          <dt>抵用卷</dt>
          <dd>可用卷<i class="el-icon-arrow-right" /></dd>
          <dd>失效卷<i class="el-icon-arrow-right" /></dd>
        </dl>
      </el-col>
      <el-col :span="19" class="table">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部订单" name="all">
            <list :cur="cur" />
          </el-tab-pane>
          <el-tab-pane label="待付款" name="unpay">
            <list :cur="cur" />
          </el-tab-pane>
          <el-tab-pane label="待使用" name="unuse">
            <list :cur="cur" />
          </el-tab-pane>
          <el-tab-pane label="待评价" name="unreplay">
            <list :cur="cur" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import List from '@/components/order/list.vue';

export default {
  name: 'OrderPage',
  components: {
    List
  },
  async asyncData(ctx) {
    const serverUrl = 'http://localhost:3000';

    const { status, data: { code, list } } = await ctx.$axios.get(`${serverUrl}/order/getOrders`);

    if (status === 200 && code === 0 && list.length) {
      return {
        list: list.map((item) => {
          return {
            img: item.imgs.length ? item.imgs[0].url : 'https://i.loli.net/2019/01/10/5c3767c4a52de.png',
            name: item.name,
            count: 1,
            total: item.total,
            status: item.status,
            statusText: item.status === 0 ? '待付款' : '已付款'
          };
        }),
        cur: list.map((item) => {
          return {
            img: item.imgs.length ? item.imgs[0].url : 'https://i.loli.net/2019/01/10/5c3767c4a52de.png',
            name: item.name,
            count: 1,
            total: item.total,
            status: item.status,
            statusText: item.status === 0 ? '待付款' : '已付款'
          };
        })
      };
    }
  },
  data() {
    return {
      activeName: 'all',
      list: [],
      cur: []
    };
  },
  watch: {
    activeName(val) {
      this.cur = this.list.filter((item) => {
        if (val === 'unpay') {
          return item.status === 0;
        } else if (val === 'all') {
          return true;
        } else {
          return false;
        }
      });
    },
    list() {
      const val = this.name;
      this.cur = this.list.filter((item) => {
        if (val === 'unplay') {
          return item.status === 0;
        } else if (val === 'all') {
          return true;
        } else {
          return false;
        }
      });
    }
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name;
    }
  }
};
</script>
