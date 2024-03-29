// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './Utils/Utils'
import './mock/mockServer'
import ElementUI from 'element-ui'
import echarts from 'echarts'

import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
/* eslint-disable no-new */
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
