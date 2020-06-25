import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { isLoggedIn } from "../api/utils";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },

  {
    path: "/feedback",
    name: "Feedback",
    component: () => import("../views/Feedback.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/myprofile/:id",
    name: "MyProfile",
    component: () => import("../views/MyProfile.vue"),
    meta: {
      // Ruta Privada
      allowAnonymous: false,
    },
    beforeEnter: (to, from, next) => {
      // Si la ruta es privada y el usuario no tiene token
      if (!to.meta.allowAnonymous && !isLoggedIn()) {
        alert("Ohh no tienes permisos");
      } else {
        next();
      }
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
