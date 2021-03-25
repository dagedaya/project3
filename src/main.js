import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 ElementUI
Vue.use(ElementUI)
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 安装插件

// 封装的axios
import HttpRequest from './api/httpRequest.js'
Vue.http = Vue.prototype.$http = HttpRequest

// 上传头像
import config from './api/config.js'
Vue.prototype.$config = config

// 时间转换插件moment
import Moment from './api/moment.js'
Vue.prototype.$moment = Moment

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
