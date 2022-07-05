
// import Router from 'koa-router'; // koa路由
import Redis from 'koa-redis'; // redis
import nodeMailer from 'nodemailer'; // node发邮件

import User from '../dbs/models/userModel';
import Email from '../dbs/config'; // mongoose用户模型

const Router = require('@koa/router'); // 邮件配置文件
// 获取redis客户端
const redisCli = new Redis().client;

// 创建 koa 路由对象，设置前缀
const router = new Router({ prefix: '/users' });
