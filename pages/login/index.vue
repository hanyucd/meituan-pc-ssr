<template>
  <div class="page-login">
    <div class="login-header">
      <a href="/">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
      </a>
    </div>
    <div class="login-panel">
      <div class="banner">
        <img src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" width="480" height="370" alt="美团网">
      </div>

      <div class="form">
        <h4 v-if="error" class="tips">
          <i />{{ error }}
        </h4>

        <p><span>账号登录</span></p>
        <el-input v-model="username" prefix-icon="profile" />
        <el-input v-model="password" prefix-icon="password" type="password" />

        <div class="foot">
          <el-checkbox v-model="checked">7天内自动登录</el-checkbox>
          <b>忘记密码？</b>
        </div>

        <el-button class="btn-login" type="success" size="mini" @click="login"> 登录 </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js';

export default {
  name: 'LoginPage',
  layout: 'blank',
  data() {
    return {
      checked: '',
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    /**
     * 登陆
     */
    login() {
      const self = this;
      // 发送登陆请求
      self.$axios.post('/users/signin', {
        username: window.encodeURIComponent(self.username),
        password: CryptoJS.MD5(self.password).toString()
      }).then((res) => {
        console.log(res);

        const { status, data } = res;
        // 如果服务器响应正常
        if (status === 200) {
          // 如果数据正常
          if (data && data.code === 0) {
            // 跳转主页
            location.href = '/';
          } else {
            self.error = data.msg;
          }
        } else {
          self.error = '服务器出错';
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/css/login/index.scss';
</style>
