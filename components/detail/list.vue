﻿<template lang="html">
  <div class="m-detail-list">
    <ul>
      <li>{{ list.filter(item=>item.photos.length).length }}款套餐</li>
      <item v-for="(item,idx) in list" :key="idx" :meta="item" />
    </ul>
  </div>
</template>

<script>
import Item from './item.vue';
export default {
  name: 'DetailList',
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>
