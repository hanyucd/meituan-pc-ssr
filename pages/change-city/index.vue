<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <iSelect />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hot-city />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <category-city />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import iSelect from '@/components/change-city/i-select.vue';
import hotCity from '@/components/change-city/hot-city.vue';
import categoryCity from '@/components/change-city/category-city.vue';

export default {
  name: 'ChangeCityPage',
  components: {
    iSelect,
    hotCity,
    categoryCity
  }
};
</script>

<style lang="css">
</style>
