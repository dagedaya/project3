import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/index.vue'),
    children:[
      
    ]
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  },
  // 404页面
  {
    path:'*',
    component: () => import('@/views/error/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
