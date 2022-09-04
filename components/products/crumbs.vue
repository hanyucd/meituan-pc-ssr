<template>
  <div class="m-crumbs">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">{{ position.city.replace('市', '') }}美团</el-breadcrumb-item>
      <el-breadcrumb-item>{{ position.city.replace('市', '') }}{{ decodeKeyword }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ProductCrumb',
  props: {
    keyword: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState('geoModule', ['position']),
    decodeKeyword() {
      return decodeURIComponent(this.keyword);
    }
  }
};
</script>
