import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { isLoggedIn } from "../api/utils";

Vue.use(VueRouter);

import axios from "axios";
import Swal from "sweetalert2";

// Enviar el token en el header para el back, si no está aquí cada vez que se recarga la página se pierde
// console.log(localStorage.getItem("authtoken"));
axios.defaults.headers.common["Authorization"] = localStorage.getItem(
  "authtoken"
);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
    path: "/wall/:id",
    name: "Wall",
    component: () => import("../views/Wall.vue"),
    meta: {
      // Ruta Privada
      allowAnonymous: false,
    },
    beforeEnter: (to, from, next) => {
      if (!to.meta.allowAnonymous && !isLoggedIn()) {
        Swal.fire(
          "¿Quieres enviar un mensaje?",
          "Tienes que estar registrado o hacer Login",
          "warning"
        );
      } else {
        next();
      }
    },
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
      if (!to.meta.allowAnonymous && !isLoggedIn()) {
        alert("Tienes que estar registrado o hacer Login");
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
