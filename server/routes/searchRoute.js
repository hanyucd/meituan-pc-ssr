const Router = require('@koa/router');

// 创建 koa 路由对象，设置前缀
const router = new Router({ prefix: '/search' });

/**
 * 输入框搜索
 */
router.get('/top', async (ctx) => {
});

module.exports = router;
