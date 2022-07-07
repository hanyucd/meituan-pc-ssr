
// import Router from 'koa-router'; // koa路由
import Redis from 'koa-redis'; // redis
import nodeMailer from 'nodemailer'; // node发邮件

import userModel from '../dbs/models/userModel';
import Email from '../dbs/config'; // mongoose用户模型
import axios from './utils/axios'; // HTTP请求

const Router = require('@koa/router'); // 邮件配置文件
// 获取redis客户端
const redisCli = new Redis().client;

// 创建 koa 路由对象，设置前缀
const router = new Router({ prefix: '/users' });

/**
 * 用户注册
 */
router.post('/signup', async (ctx) => {
  const { username, password, email, code } = ctx.request.body; // post方式

  // 校验验证码(读Redis)
  if (code) {
    const saveCode = await redisCli.hget(`nodemail:${username}`, 'code'); // redis 读验证码
    const saveExpire = await redisCli.hget(`nodemail:${username}`, 'expire'); // redis 读过期时间
    // 如果验证码相等
    if (code === saveCode) {
      // 如果过期
      if (new Date().getTime() - saveExpire > 0) {
        // 结果写入响应体 失败为-1 成功为0
        ctx.body = { code: -1, msg: '验证码已过期，请重新尝试' };
        return false;
      }
    } else {
      ctx.body = { code: -1, msg: '请填写正确的验证码' };
    }
  } else {
    ctx.body = { code: -1, msg: '请填写验证码' };
  }

  // 存储用户信息(读写mongoDb)
  const user = await userModel.find({ username }); // 拿到用户模型
  // 如果已经被注册
  if (user.length) {
    ctx.body = { code: -1, msg: '已被注册' };
    return false;
  }

  // 创建新用户
  const nuser = await userModel.create({ username, password, email });
  // 存储成功自动登录，存储失败响应
  if (nuser) {
    const res = await axios.post('/users/signin', { username, password });
    // 如果登陆成功
    if (res.data && res.data.code === 0) {
      ctx.body = { code: 0, msg: '注册成功', user: res.data.user };
    } else {
      ctx.body = { code: -1, msg: 'error' };
    }
  } else {
    ctx.body = { code: -1, msg: '注册失败' };
  }
});
