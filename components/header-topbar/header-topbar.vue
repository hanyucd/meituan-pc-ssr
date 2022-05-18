<template>
  <!-- gutter指定间隔 -->
  <el-row :gutter="0" class="m-header">
    <!-- 栅格占据的列数 -->
    <el-col :span="5">
      <header-geo />
    </el-col>
    <el-col :span="5">
      <header-User />
    </el-col>
    <el-col :span="14">
      <header-nav />
      导航
    </el-col>
  </el-row>
</template>

<script>
import headerGeo from '../header-geo/header-geo';
import headerUser from '../header-user/header-user';
import headerNav from '../header-nav/header-nav';

export default {
  name: 'HeaderTopbar',
  components: {
    headerGeo,
    headerUser,
    headerNav
  },
  data () {
    return {
      user: ''
    };
  }
};
</script>

<style>
</style>
