import { createRouter, createWebHashHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/FrontLayer.vue"),
      children: [
        {
          path: "",
          component: () => import("../views/front/HomeView.vue"),
        },
        {
          path: "products",
          component: () => import("../views/front/ProductsView.vue"),
        },
        {
          path: "product/:id",
          component: () => import("../views/front/ProductView.vue"),
        },
        {
          path: "carts",
          component: () => import("../views/front/CartView.vue"),
        },
        {
          path: "login",
          component: () => import("../views/front/LoginView.vue"),
        },
      ],
    },
    {
      path: "/admin",
      component: () => import("../views/DashBoard.vue"),
      children: [
        {
          path: "",
          component: () => import("../views/admin/HomeView.vue"),
        },
        {
          path: "products",
          component: () => import("../views/admin/Products.vue"),
        },
        {
          path: "orders",
          component: () => import("../views/admin/Orders.vue"),
        },
      ],
    },
  ],
});

export default router;
