<template>
  <el-container>
    <el-header height="197px">
      <m-Header />
    </el-header>

    <el-main>
      <nuxt />
    </el-main>

    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import mHeader from '@/components/header/header';

export default {
  name: 'DefaultLayout',
  components: {
    mHeader
  },
  data () {
    return {};
  }
};
</script>
