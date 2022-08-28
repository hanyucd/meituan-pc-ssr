<template>
  <div class="" />
</template>

<script>
export default {
  name: 'ExitPage',
  layout: 'blank',
  // nuxt生命周期的中间件阶段处理
  // 中间件阶段应用场景：无用户交互，需要自动触发
  // 中间件允许您定义一个自定义函数运行在一个页面或一组页面渲染之前
  middleware: async (ctx) => {
    const { status, data } = await ctx.$axios.get('/users/exit');
    console.log(data);

    if (status === 200 && data && data.code === 0) {
      window.location.href = '/';
    }
  }
};
</script>
