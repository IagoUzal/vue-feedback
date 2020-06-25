<template>
  <main>
    <vue-headful
      title="Login - Feedback Project"
      description="Página de Login"
    />
    <section class="login container">
      <h1>
        Login 🙋🏻‍♂️
      </h1>
      <form>
        <p v-show="required">{{ message }}</p>
        <input
          type="email"
          minlength="3"
          maxlength="60"
          placeholder="Email"
          required
          v-model="email"
        />
        <input
          type="password"
          minlength="6"
          maxlength="100"
          placeholder="Password"
          required
          v-model="password"
          @keyup.enter="login()"
        />
        <button type="button" @click="login()">Login</button>
        <router-link :to="{ name: 'Register' }">Registro</router-link>
      </form>
    </section>
  </main>
</template>

<script>
// import axios from "axios";
import { loginUser } from "@/api/utils.js";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      message: "Error",
      required: false,
    };
  },
  methods: {
    async login() {
      try {
        if (this.email === "" || this.password === "")
          throw Error("Los campos Email y Password no pueden estar vacios");
        this.required = false;
        await loginUser(this.email, this.password);

        // Guardar email en localstorage
        localStorage.setItem("Usuario", this.email);
        // Enviar al feedback
        this.$router.push("/feedback");
        location.reload();
      } catch (error) {
        console.log(error);
        this.message = error.message;
        this.required = true;
        if (error.response) {
          alert(error);
        }
      }
    },
  },
};
</script>

<style scoped></style>
