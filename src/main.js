import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

  // 引入 ElementUI
  import ElementUI from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';
  Vue.use(ElementUI);//安装插件 

  // 封装的axios
  import HttpRequest from "./api/httpRequest.js"
  Vue.http = Vue.prototype.$http=HttpRequest

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
