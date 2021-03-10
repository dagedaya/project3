import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 安装插件

// 封装的axios
import HttpRequest from './api/httpRequest.js'

// 时间转换插件moment
import Moment from './api/moment.js'
Vue.use(ElementUI)
Vue.http = Vue.prototype.$http = HttpRequest
Vue.prototype.$moment = Moment

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
