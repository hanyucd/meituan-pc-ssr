module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  /**
   * add your custom rules here
   *
   * off 或 0 - 关闭规则
   * warn 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
   * error 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  rules: {
    semi: ['error', 'always'], // 强制在语句末尾使用分号
    'no-console': 'off', // 禁止调用 console 对象的方法
    'no-unused-vars': 'off', // 禁止出现未使用过的变量
    'space-before-function-paren': 'off', // 要求或禁止函数圆括号之前有一个空格
    'vue/singleline-html-element-content-newline': 'off' // 关闭在单行元素的内容之前和之后需要换行
  }
};
