﻿<template>
  <div class="m-crumbs">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">{{ $store.state.geoModule.position.city.replace('市','') }}美团</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">{{ $store.state.geoModule.position.city.replace('市','') }}{{ type }}</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">{{ $store.state.geoModule.position.city.replace('市','') }}{{ decodeURIComponent(keyword) }}</a></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'DetailCrumb',
  props: {
    keyword: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  }
};
</script>
