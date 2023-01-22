import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue"
import Catalog from "../views/Catalog.vue";
import Saved from "../views/Saved.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/catalog/:category",
    name: "Catalog",
    component: Catalog,
  },
  {
    path: "/saved",
    name: "Saved",
    component: Saved,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;