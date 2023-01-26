import { createWebHistory, createRouter } from "vue-router";
import { supabase } from "../supabase/init";
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import Catalog from "../views/Catalog.vue";
import Saved from "../views/Saved.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
      auth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
      auth: false,
    },
  },
  {
    path: "/catalog/:category",
    name: "Catalog",
    component: Catalog,
    meta: {
      title: "Catalog",
      auth: true,
    },
  },
  {
    path: "/saved",
    name: "Saved",
    component: Saved,
    meta: {
      title: "Saved",
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Change document titles
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Shopping Cart`;
  next();
});

// Route guard for auth routes
router.beforeEach((to, from, next) => {
  const user = supabase.auth.user();
  if (to.matched.some((res) => res.meta.auth)) {
    if (user) {
      next();
      return;
    }
    next({ name: "Login" });
    return;
  }
  next();
});

export default router;