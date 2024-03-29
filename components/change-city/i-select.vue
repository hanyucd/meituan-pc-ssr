<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市">
      <el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>

    <span class="name">直接搜索:</span>
    <!-- el-ui 远程搜索组件 -->
    <!-- querySearchAsync为用户输入事件处理函数 -->
    <!-- handleSelect为用户选择搜索结果事件处理函数 -->
    <el-autocomplete v-model="input" :fetch-suggestions="querySearchAsync" placeholder="请输入城市中文或拼音" @select="handleSelect" />
  </div>
</template>

<script>
import _ from 'lodash'; // 实现延时

export default {
  name: 'ISelect',
  data () {
    return {
      province: [], // 省市列表
      pvalue: '', // 所选省份
      city: [], // 当前省份城市列表
      cvalue: '', // 所选城市
      input: '',
      cities: [] // 全国城市列表
    };
  },
  watch: {
    // 监听当前省份，请求省份中的城市
    async pvalue (newPvalue) {
      const self = this;
      // 请求：获取指定省份城市
      const { status, data: { city } } = await self.$axios.get(`/geo/province/${newPvalue}`);
      if (status === 200) {
        self.city = city.map((item) => {
          return {
            value: item.id,
            label: item.name
          };
        });
        self.cvalue = '';
      }
    }
  },
  async mounted () {
    const self = this;
    // 非SSR：当页面加载时候，同时请求省份列表数据
    const { status, data: { province } } = await self.$axios.get('/geo/province');
    if (status === 200) {
      self.province = province.map((item) => {
        // 做数据映射，方便改后端数据结构
        return {
          value: item.id,
          label: item.name
        };
      });
    }
  },
  methods: {
    // 参数：要搜索的内容，回调
    // 回调函数参数：对象数组，每一项的value值将显示在筛选框中
    querySearchAsync: _.debounce(async function (query, callback) {
      const self = this;
      // 如果用户输入过省份得到了此省城市数据
      if (self.cities.length) {
        // 从此省城市中过滤出包含输入关键字的城市
        callback(self.cities.filter(item => item.value.includes(query)));
      } else {
        // 发送请求获取全国所有城市
        const { status, data: { city } } = await self.$axios.get('/geo/city');
        if (status === 200) {
          // 映射数据结构
          self.cities = city.map((item) => {
            return {
              value: item.name
            };
          });
          // 过滤出结果
          callback(self.cities.filter(item => item.value.includes(query)));
        } else {
          // eslint-disable-next-line node/no-callback-literal
          callback([]);
        }
      }
    }, 300),

    // 搜索框和联动筛选公用的切换store中城市的方法
    handleSelect (param) {
      let city = '';
      if (typeof param === 'string') {
        // 取得城市label
        city = this.city.filter(item => item.value === param)[0].label;
      } else {
        city = param.value;
      }
      // 切换vuex中当前城市
      this.$store.dispatch('geoModule/setPosition', { city });
      // 跳转到主页（编程式导航）
      this.$router.push({ path: '/' });
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/css/changeCity/iselect.scss';
</style>
