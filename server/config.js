
module.exports = {
  // 1.3 配置数据库
  dbs: 'mongodb://127.0.0.1:27017/meituan-pc',
  redis: {
    get host() {
      // 默认主机
      return '127.0.0.1';
    },
    get port() {
      // 默认端口
      return 6379;
    }
  },
  smtp: {
    // 默认腾讯邮箱
    get host() {
      return 'smtp.qq.com';
    },
    // 自己接受验证码的腾讯邮箱
    get user() {
      return '1807003141@qq.com';
    },
    // 填入你的授权码
    get pass() {
      return 'fnuktnvqagwgdibh';
    },
    // 生成验证码
    get code() {
      return () => {
        return Math.random().toString(16).slice(2, 6).toUpperCase();
      };
    },
    // 验证码过期时间
    get expire () {
      return () => {
        return new Date().getTime() + 60 * 1000; // 1 分钟
      };
    }
  }
};

// POP3/STMP: fnuktnvqagwgdibh

// IMAP/SMTP: snspmhtnsdhoefag
