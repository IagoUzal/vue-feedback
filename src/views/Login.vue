<template>
  <main class="container">
    <vue-headful
      title="Login - Feedback Project"
      description="Página de Login"
    />
    <section class="login">
      <section class="login_image">
        <img src="../assets/image/login.gif" alt="" />
      </section>
      <section class="login_form">
        <h1>
          Hola 🤗
        </h1>
        <form>
          <p class="error_message" v-show="required">{{ errorMessage }}</p>
          <input
            type="email"
            minlength="3"
            maxlength="60"
            placeholder="Email"
            required
            v-model="email"
          />
          <br />
          <input
            type="password"
            minlength="6"
            maxlength="100"
            placeholder="Password"
            required
            v-model="password"
            @keyup.enter="login()"
          />
          <br />
          <button type="button" class="button_primary" @click="login()">
            Login
          </button>
          <router-link class="button_text" :to="{ name: 'Register' }"
            >Ir a registro</router-link
          >
        </form>
      </section>
    </section>
  </main>
</template>

<script>
// import axios from "axios";
import { loginUser } from "@/api/utils.js";
import Swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      email: "iagouzal@gmail.com",
      password: "HackBoss15003",
      errorMessage: "Error",
      required: false,
    };
  },
  methods: {
    async login() {
      try {
        if (this.email === "" || this.password === "") {
          this.errorMessage =
            "⚠️ El campo email y password no pueden estar vacios";
          this.required = true;
        } else {
          await loginUser(this.email, this.password);
          localStorage.setItem("Usuario", this.email);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login Correcto",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push("/");
          setTimeout(function() {
            location.reload();
          }, 1500);
          this.required = false;
        }
      } catch (error) {
        if (error) {
          self.errorMessage = localStorage.getItem(errorBack);
          console.log(self.errorMessage);
          self.required = true;
        }
      }
    },
  },
};
</script>

<style scoped>
main {
  display: grid;
  align-content: center;
  justify-content: center;
}

.login {
  background: #fff;
  border-radius: 6px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  max-width: 600px;
  padding: 2rem;
  gap: 3rem;
  align-items: center;
  justify-items: center;
  margin: 4rem 0;
}

input {
  margin-bottom: 1rem;
  border: none;
  background: #dfdfe8;
  border-radius: 6px;
  padding: 0.5rem;
}
</style>
