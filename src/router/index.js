import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const routes = [
  {
    // 首页
    path: "/",
    component: () => import("@/views/index.vue"),
    redirect: "/index",
    // 子组件
    children: [
      // 测试
      {
        path: "/test",
        name: "test",
        component: () => import("@/views/test.vue")
      },
      {
        path: "/test2",
        name: "test2",
        component: () => import("@/views/test2.vue")
      },
      // 班级管理
      {
        path: "/classes",
        name: "classes",
        component: () => import("@/views/classes/Classes.vue")
      },
      // 课程管理
      {
        path: "/project",
        name: "project",
        component: () => import("@/views/project/Project.vue")
      },
      // 考勤管理
      {
        path: "/work",
        name: "work",
        component: () => import("@/views/work/Work.vue")
      },
      // 课时管理
      {
        path: "/hour",
        name: "hour",
        component: () => import("@/views/hour/Hour.vue")
      },
      // 学员管理
      {
        path: "/student",
        name: "student",
        component: () => import("@/views/student/Student.vue")
      },
      // 教室管理
      {
        path: "/classroom",
        name: "classroom",
        component: () => import("@/components/classroom/Classroom.vue")
      },
      // 教师管理
      {
        path: "/teacher",
        name: "teacher",
        component: () => import("@/components/teacher/Teacher.vue")
      },
      // 校区管理
      {
        path: "/campus",
        name: "campus",
        component: () => import("@/components/campus/Campus.vue")
      },
      // 账号管理
      {
        path: "/account",
        name: "account",
        component: () => import("@/components/account/Account.vue")
      },
      // 轮播图管理
      {
        path: "/slideshow",
        name: "slideshow",
        component: () => import("@/components/slideshow/Slideshow.vue")
      },
      // 动态管理
      {
        path: "/state",
        name: "state",
        component: () => import("@/components/state/State.vue")
      },
      // 动态添加页面
      {
        path: "/stateList",
        name: "stateList",
        component: () => import("@/components/state/stateList.vue")
      },
      // 首页
      {
        path: "/index",
        name: "index",
        component: () => import("@/views/index/index.vue")
      }
    ]
  },
  // 登录
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/Login.vue")
  },
  // 404页面
  {
    path: "*",
    component: () => import("@/views/error/404.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
