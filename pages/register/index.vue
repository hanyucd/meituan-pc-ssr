<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo" />
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button size="mini" class="el-button-bg-color">登录</el-button>
          </a>
        </span>
      </header>
    </article>

    <section>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <!-- 昵称 -->
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>

        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" />
          <el-button size="mini" class="el-button-yz" @click="sendMsg">{{ sendCode }}</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="6" />
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password" />
        </el-form-item>

        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="ruleForm.cpwd" type="password" />
        </el-form-item>

        <el-form-item>
          <!-- <a href="/login"> -->
          <el-button class="el-button-bg-color" @click="register">同意以下协议并注册</el-button>
          <!-- </a> -->
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a class="f1" href="https://rules-center.meituan.com/rules-detail/4" target="_blank">《美团点评用户服务协议》</a>
          <a class="f1" href="https://rules-center.meituan.com/rules-detail/2" target="_blank">《美团点评隐私政策》</a>
        </el-form-item>
      </el-form>
    </section>

    <footer class="footer--mini">
      <p class="copyright">
        ©
        <a class="f1" href="https://www.meituan.com">meituan.com</a>&nbsp;
        <a class="f1" target="_blank" href="http://www.miibeian.gov.cn/">京ICP证070791号</a>&nbsp;
        <span class="f1">京公网安备11010502025545号</span>
      </p>
    </footer>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js';
// import axios from 'axios';

export default {
  name: 'RegisterPage',
  layout: 'blank', // 使用 blank 模版
  data () {
    return {
      sendCode: '发送验证码到邮箱',
      statusMsg: '',
      error: '',
      ruleForm: {
        name: '',
        code: '',
        pwd: '',
        cpwd: '',
        email: ''
      },
      // 定义验证规则数据
      rules: {
        name: [{
          // 必选项
          required: true,
          type: 'string',
          // 提示信息
          message: '请输入昵称',
          // 触发校验时机
          trigger: 'blur'
        }],
        email: [{
          required: true,
          type: 'email',
          message: '请输入邮箱',
          trigger: 'blur'
        }],
        pwd: [{
          required: true,
          message: '创建密码',
          trigger: 'blur'
        }],
        cpwd: [{
          required: true,
          message: '确认密码',
          trigger: 'blur'
        }, {
          // 自定义验证函数
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pwd) {
              callback(new Error('两次输入密码不一致'));
            } else {
              callback();
            }
          },
          trigger: 'blur'
        }]
      }
    };
  },
  methods: {
    // 发送验证码
    sendMsg () {
      const self = this;
      let namePass;
      let emailPass;
      if (self.timerid) {
        return false;
      }
      // 使用el-ui提供的API实现验证逻辑
      this.$refs.ruleForm.validateField('name', (valid) => {
        namePass = valid;
      });
      self.statusMsg = '';
      // 如果验证失败
      if (namePass) { return false; }

      this.$refs.ruleForm.validateField('email', (valid) => {
        emailPass = valid;
      });

      // 如果都验证成功
      if (!namePass && !emailPass) {
        // 通过axios发送Ajax请求
        // 使用.then()语法，也可以用async await语法
        self.$axios.post('/users/verify', {
          // 设置接口需要的参数
          // 中文需要进行URI编码
          username: encodeURIComponent(self.ruleForm.name),
          email: self.ruleForm.email
        }).then((res) => {
          console.log(res);

          const { status, data } = res;
          // 如果响应状态成功
          if (status === 200 && data && data.code === 0) {
            let count = 60;
            self.statusMsg = `验证码已发送,剩余${count--}秒`;
            // 1秒刷新一次时间
            self.timerid = setInterval(function () {
              self.statusMsg = `验证码已发送,剩余${count--}秒`;
              // 如果60秒
              if (count === 0) {
                // 取消延时调用
                clearInterval(self.timerid);
                self.timerid = null;
                self.statusMsg = '';
              }
            }, 1000);
          } else {
            self.statusMsg = data.msg;
          }
        });
      }
    },
    // 注册
    register () {
      const self = this;
      // el-ui提供的输入验证API
      this.$refs.ruleForm.validate((valid) => {
        // 如果验证通过
        if (valid) {
          // 发送注册请求
          self.$axios.post('/users/signup', {
            // 设置post请求参数
            username: window.encodeURIComponent(self.ruleForm.name), // 用户名
            password: CryptoJS.MD5(self.ruleForm.pwd).toString(), // 密码MD5加密
            email: self.ruleForm.email, // 邮箱
            code: self.ruleForm.code // 验证码
          }).then(({ status, data }) => {
            // 如果响应正常
            if (status === 200) {
              // 如果data正常
              if (data && data.code === 0) {
                // 强制跳转到登录页面
                location.href = '/login';
              } else {
                self.error = data.msg;
              }
            } else {
              self.error = `服务器出错，错误码:${status}`;
            }
            // 定时清空error（防止error一直存在造成误导）
            setTimeout(function () {
              self.error = '';
            }, 1500);
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
  @import "@/assets/css/register/index.scss";
  .footer--mini {
    padding-top: 20px;
    border-top: 1px solid #e5e5e5;
    color: #999;
    font-size: 13px;
    .f1 {
      color: #999;
    }
  }
</style>
