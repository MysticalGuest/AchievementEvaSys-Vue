// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入axios，并加到原型链中
// import axios from '@/request/axios.js';
// Vue.prototype.$axios=axios

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// npm install --save echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 启动mock模式
// require('./mock/index.js')
// require('./mock/student.js')
function requireAll (r) { r.keys().forEach(r) }
requireAll(require.context('./mock/', true, /\.js$/))

// Vue.prototype.$http.interceptors.response.use()
// Vue.prototype.$http.axios.i
// var instance = http.create();
// instance.interceptors.response.use()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
