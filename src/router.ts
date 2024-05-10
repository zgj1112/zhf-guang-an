import { createRouter, createWebHashHistory } from "vue-router";
import login from "./components/index.vue";
const routes = [
  { path: "/", component: login },
  // { path: "/first", component: first, meta: { isAuth: true, title: "主页" } },
  {
    path: "/redirect",
    redirect: "/", // 重定向到 '/' 路由
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  // 缺少用户判断
  // console.log(to.meta);
  next(); //放行
});
export default router;
