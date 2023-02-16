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
      ],
    },
  ],
});

export default router;
