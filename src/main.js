import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vueHeadful from "vue-headful";

Vue.component("vue-headful", vueHeadful);

Vue.config.productionTip = false;

// Importando CSS general
import "@/assets/css/main.css";

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
