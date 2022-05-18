<template>
  <div class="m-header">
    <el-row>
      <el-col>
        <header-topbar />
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <header-search />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import headerTopbar from '../header-topbar/header-topbar';
import headerSearch from '../header-search/header-search';

export default {
  name: 'HeaderIndex',
  components: {
    headerTopbar,
    headerSearch
  }
};
</script>

<style lang="scss">
  @import '@/assets/css/public/header/index.scss';
</style>
