<template>
  <div class="m-menu">
    <!-- 首页菜单 -->
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部分类</dt>

      <dd v-for="(item,idx) in menu " :key="idx" @mouseenter="mouseenter">
        <i :class="item.type" />
        {{ item.name }}
        <span class="arrow" />
      </dd>
    </dl>

    <div v-if="kind" class="detail" @mouseenter="sover" @mouseleave="sout">
      <template v-for="(item,idx) in curdetail.child">
        <h4 :key="idx">{{ item.title }}</h4>
        <span v-for="v in item.child" :key="v">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'IndexMenu',
  data() {
    return {
      kind: '' // 记录鼠标 hover 时的菜单类型
    };
  },
  computed: {
    ...mapState('homeModule', ['menu']),
    curdetail() {
      return this.menu.filter(item => item.type === this.kind)[0];
    }
  },
  methods: {
    mouseenter(event) {
      // 利用原生事件更新kind
      // 通过DOM选择符API找到触发事件元素中第一个i标签的类名
      this.kind = event.target.querySelector('i').className;
    },
    mouseleave() {
      this._timer = setTimeout(() => {
        this.kind = '';
      }, 150);
    },
    sover() {
      // 移出主菜单进入 detail 时固定 kind
      clearTimeout(this._timer);
    },
    sout() {
      // 移出detial直接清空kind，不再显示detail区域
      this.kind = '';
    }
  }
};
</script>
