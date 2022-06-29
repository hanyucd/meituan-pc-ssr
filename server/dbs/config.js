
export default {
  // 1.3配置数据库
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
  stmp: {
    get host() {
      // 默认腾讯邮箱
      return 'smtp.qq.com';
    },
    get user() {
      // 自己接受验证码的腾讯邮箱
      return '583520052@qq.com';
    },
    get pass() {
      return 'nrgjtbcqxijtdjhh'; // 填入你的授权码
    },
    get code () {
      // 生成验证码
      return () => {
        return Math.random().toString(16).slice(2, 6).toUpperCase();
      };
    },
    get expire () {
      // 验证码过期
      return () => {
        return new Date().getTime() + 60 * 60 * 1000;
      };
    }
  }
};
