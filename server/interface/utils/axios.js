const axios = require('axios');

// 创建一个axios实例
const axiosInstance = axios.create({
  // 进程环境变量设置
  baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`,
  timeout: 2000,
  headers: {
  }
});

module.exports = axiosInstance;
