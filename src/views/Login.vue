<template>
  <main class="container">
    <vue-headful
      title="Login - Feedback Project"
      description="Página de Login"
    />
    <section class="login">
      <section class="login_image">
        <lottie-player
          src="https://assets10.lottiefiles.com/private_files/lf30_PZz906.json"
          background="transparent"
          speed="1"
          style="width: 200px; height: 200px;"
          loop
          autoplay
        ></lottie-player>
      </section>
      <section class="login_form">
        <h1>
          Hola 🤗
        </h1>
        <form>
          <p class="error_message" v-show="required">{{ message }}</p>
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

export default {
  name: "Login",
  data() {
    return {
      email: "iagouzal@gmail.com",
      password: "HackBoss15003",
      message: "Error",
      required: false,
    };
  },
  methods: {
    // async login() {
    //   try {
    //     if (this.email === "" || this.password === "")
    //       throw Error("Los campos Email y Password no pueden estar vacios");
    //     this.required = false;

    //     await loginUser(this.email, this.password);

    //     // Guardar email en localstorage
    //     localStorage.setItem("Usuario", this.email);
    //     // Enviar al feedback
    //     this.$router.push("/feedback");
    //     location.reload();
    //   } catch (error) {
    //     console.log(error);
    //     this.message = error.message;
    //     this.required = true;
    //     // if (error.response) {
    //     //   // alert(error);
    //     // }
    //     if (error.response) {
    //       console.log(localStorage.getItem(errorBack));
    //       this.message = localStorage.getItem(errorBack);
    //       this.required = true;
    //       localStorage.removeItem(errorBack);
    //     }
    //   }
    // },
    async login() {
      try {
        await loginUser(this.email, this.password);
        localStorage.setItem("Usuario", this.email);
        this.$router.push("/");
        location.reload();
      } catch (error) {
        this.message = localStorage.getItem(errorBack);
        this.required = true;
        localStorage.removeItem(errorBack);
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
