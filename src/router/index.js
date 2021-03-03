import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/index.vue'),
    redirect: '/classes',
    children:[
      {
        path:'/classes',
        name:'classes',
        component: () => import('@/views/classes/Classes.vue')
      },
      {
        path:'/project',
        name:'project',
        component: () => import('@/views/project/Project.vue')
      },
      {
        path:'/work',
        name:'work',
        component: () => import('@/views/work/Work.vue')
      },
      {
        path:'/hour',
        name:'hour',
        component: () => import('@/views/hour/Hour.vue')
      },
      {
        path:'/student',
        name:'student',
        component: () => import('@/views/student/Student.vue')
      },
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
