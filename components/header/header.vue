<template>
  <div class="m-header">
    <el-row>
      <el-col>
        <header-topbar />
      </el-col>
    </el-row>

    <!-- <el-row>
      <el-col>
        <search-bar />
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import headerTopbar from '../header-topbar/header-topbar';

export default {
  name: 'HeaderIndex',
  components: {
    headerTopbar
  }
};
</script>

<style lang="scss">
  @import '@/assets/css/public/header/index.scss';
</style>
