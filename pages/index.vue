<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <index-menu />
      </el-col>
      <el-col :span="19">
        <index-life />
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">3</el-col>
    </el-row>
  </div>
</template>

<script>
import indexMenu from '@/components/index/index-menu/index-menu';
import indexLife from '@/components/index/index-life/index-life.vue';
// import indexArtistic from '@/components/index/artistic.vue';

export default {
  name: 'IndexPage',
  components: { indexMenu, indexLife },
  created() {
    // console.log(Vuex);
    console.log(this.$store.state);
    console.log(this.$store.state.geoModule);
  }
};
</script>

<style lang="scss">
  @import '@/assets/css/index/index.scss';
</style>
