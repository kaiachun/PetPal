import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/Front.vue"),
    // 因此處為巢狀路由，要加入子路由
    children: [
      {
        path: "index",
        component: () => import("../views/Index.vue"),
      },
      {
        path: "products",
        component: () => import("../views/Products.vue"), // 對應元件
      },
      {
        path: "about",
        name: "About",
        component: () => import("../views/About.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("../views/Dashboard.vue"),
    // 加入巢狀路由
    children: [
      {
        path: "products", // 在第一層一定要加上 / ，在第二層不加 /
        component: () => import("../views/admin/Products.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
