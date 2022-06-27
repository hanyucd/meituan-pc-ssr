<template>
  <el-container>
    <el-header height="197px">
      <m-Header />
    </el-header>

    <el-main>
      <nuxt />
    </el-main>

    <el-footer>
      <m-footer />
    </el-footer>
  </el-container>
</template>

<script>
import mHeader from '@/components/header/header';
import mFooter from '@/components/public/footer/index.vue';

export default {
  name: 'DefaultLayout',
  components: {
    mHeader,
    mFooter
  },
  data () {
    return {};
  }
};
</script>
