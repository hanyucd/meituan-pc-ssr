
import Router from 'koa-router'; // koa路由
import Redis from 'koa-redis'; // redis
import nodeMailer from 'nodemailer'; // node发邮件

import User from '../dbs/models/userModel'; // mongoose用户模型

import Email from '../dbs/config'; // 邮件配置文件
