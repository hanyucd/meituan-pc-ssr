
const Redis = require('koa-redis'); // 处理session // redis
const nodeMailer = require('nodemailer'); // node发邮件
const userModel = require('../models/userModel');
const Email = require('../config');
const Passport = require('../utils/passport');
const axios = require('../utils/axios');

const Router = require('@koa/router');
const redisCli = new Redis().client; // 获取redis客户端

// 创建 koa 路由对象，设置前缀
const router = new Router({ prefix: '/users' });

/**
 * 用户注册
 */
router.post('/signup', async (ctx) => {
  const { username, password, email, code } = ctx.request.body; // post方式

  console.log('注册：', ctx.request.body);

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
        return;
      }
    } else {
      ctx.body = { code: -1, msg: '请填写正确的验证码' };
      return;
    }
  } else {
    ctx.body = { code: -1, msg: '请填写验证码' };
    return;
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

/**
 * 用户登录
 */
router.post('/signin', async (ctx, next) => {
  // 调用passport方法验证，参数：（策略，验证回调）
  return await Passport.authenticate('local', function (err, user, info, status) {
    if (err) {
      ctx.body = { code: -1, msg: err };
    } else if (user) {
      ctx.body = { code: 0, msg: '登录成功', user };
      console.log('登录:', user);

      // 进行登录动作
      return ctx.login(user);
    } else {
      ctx.body = { code: 1, msg: info };
    }
  })(ctx, next);
});

/**
 * 发送验证码
 */
router.post('/verify', async (ctx) => {
  console.log(ctx.request.body);
  console.log('发送验证码');
  // return;

  // 获取 请求中 用户名和验证码过期时间
  const username = ctx.request.body.username;
  // 获取 Redis中 用户名和验证码过期时间
  const saveExpire = await redisCli.hget(`nodemail:${username}`, 'expire');

  console.log('redis保存过期:', saveExpire);

  // 如果存在发送限制时间，且当前未到发送限制时间
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = { code: -1, msg: '验证请求过于频繁，1分钟内1次' };
    return false;
  }

  // 设置发邮件对象：基于 nodeMialer 提供的方法
  const transporter = nodeMailer.createTransport({
    service: 'qq',
    // 账户
    auth: {
      // 使用config里配置的数据
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  });

  // 设置收邮件对象，发送相关信息
  const userEmail = {
    // 直接使用config中封装好的接口
    code: Email.smtp.code(), // 验证码
    expire: Email.smtp.expire(), // 过期时间
    email: ctx.request.body.email, // 注册邮箱
    user: ctx.request.body.username // 用户名
  };

  // 设置邮件信息对象
  const mailOptions = {
    from: `"认证邮件" <${Email.smtp.user}>`, // 发件人(开发者邮箱)
    to: userEmail.email, // 收件人
    subject: 'HY-《学习仿写美团网》注册码', // 标题
    html: `您在《学习仿写美团网》网页中注册，您的邀请码是${userEmail.code}` // 内容
  };

  // 异步发送验证码
  // nodeMail发送邮件sendMail参数：邮件信息对象，回调函数
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    } else {
      console.log('发送邮件成功:', info);

      // 发送成功后存储发送信息(验证码，过期时间，收件地址)至redis | hash 特别适合用于存储对象
      // redis哈希表中写入多条数据 hmset(hashListName,key,value,key,value)
      redisCli.hmset(`nodemail:${userEmail.user}`, 'code', userEmail.code, 'expire', userEmail.expire, 'email', userEmail.email);
    }
  });
  // 发送邮件后响应请求
  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延时，有效期1分钟'
  };
});

/**
 * 获取用户信息
 */
router.get('/getUser', async (ctx) => {
  // 如果是登陆状态
  if (ctx.isAuthenticated()) { // 使用passportAPI
    // 从passport取出用户信息
    const { username, email } = ctx.session.passport.user;
    // 返回信息存至响应体
    ctx.body = { user: username, email };
  } else {
    ctx.body = { user: '', email: '' };
  }
});

/**
 * 退出接口
 */
router.get('/exit', async (ctx, next) => {
  // 执行注销操作
  await ctx.logout();
  // isAuthenticated: 判断是否认证 (检测现在是否是登录状态)
  if (!ctx.isAuthenticated()) {
    ctx.body = { code: 0 };
  } else {
    ctx.body = { code: -1 };
  }
});

module.exports = router;
