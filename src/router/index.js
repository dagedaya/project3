import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    component: () => import('@/views/index.vue'),
    redirect: '/classes',
    children: [
      {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test.vue')
      },
      {
        path: '/test2',
        name: 'test2',
        component: () => import('@/views/test2.vue')
      },
      {
        path: '/classes',
        name: 'classes',
        component: () => import('@/views/classes/Classes.vue')
      },
      {
        path: '/project',
        name: 'project',
        component: () => import('@/views/project/Project.vue')
      },
      {
        path: '/work',
        name: 'work',
        component: () => import('@/views/work/Work.vue')
      },
      {
        path: '/hour',
        name: 'hour',
        component: () => import('@/views/hour/Hour.vue')
      },
      {
        path: '/student',
        name: 'student',
        component: () => import('@/views/student/Student.vue')
      }
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
    path: '*',
    component: () => import('@/views/error/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
