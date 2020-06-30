<template>
  <header>
    <nav id="nav">
      <div class="nav_container">
        <div class="nav_left">
          <router-link class="logo" :to="{ name: 'Home' }"
            >Feedback 💬</router-link
          >
        </div>
        <div class="nav_right">
          <router-link
            class="button_primary"
            :to="{ name: 'Login' }"
            v-if="!logged"
            >Login</router-link
          >
          <router-link
            class="button_text"
            :to="{ name: 'Register' }"
            v-if="!logged"
            >Registro</router-link
          >
          <img
            :src="path + avatar"
            :alt="userName"
            class="img_login"
            v-if="logged"
          />
          <router-link
            :to="{ name: 'MyProfile', params: { id: this.userID } }"
            v-if="logged"
            >Mi Perfil</router-link
          >
          <button
            class="button_primary"
            @click="logoutUser()"
            v-show="logged === true"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
// Importando funciones de cerrar sesión y si esta autenticado
import { clearLogin, isLoggedIn } from "@/api/utils.js";

export default {
  name: "navcustom",
  data() {
    return {
      userName: "",
      userID: 0,
      avatar: "uifaces",
      logged: false,
      path: "http://localhost:3001/uploads/",
    };
  },
  methods: {
    logoutUser() {
      this.userName = "";
      this.userID = 0;
      this.logged = false;
      this.$router.push("/");
      return clearLogin();
    },
    getUserName() {
      this.userName = localStorage.getItem("Usuario");
      this.avatar = localStorage.getItem("avatar");
      if (localStorage.getItem("userID")) {
        this.userID = localStorage.getItem("userID");
      } else {
        this.userID = 0;
      }
    },
  },
  created() {
    this.getUserName();
    if (isLoggedIn()) {
      this.logged = true;
    } else {
      this.logged = false;
    }
  },
};
</script>

<style scoped>
#nav {
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 30px;
}

#nav a {
  font-weight: 600;
  color: #162447;
  text-decoration: none;
  padding-right: 1rem;
}

#nav a.router-link-exact-active {
  color: #162447;
}

.nav_container {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.nav_right {
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: end;
  align-content: center;
  align-items: center;
  gap: 1rem;
}

.logo {
  font-weight: 900 !important;
  font-size: 1.5rem;
}

.img_login {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 2px solid #505050;
  padding: 2px;
}
</style>
