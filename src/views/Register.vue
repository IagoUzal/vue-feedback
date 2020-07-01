<template>
  <main class="container container_register">
    <vue-headful
      title="Registro - Feedback Project"
      description="Página de Registro"
    />
    <section class="register_card">
      <section class="img_card">
        <img src="../assets/image/register.gif" alt="" />
      </section>
      <section class="form_card">
        <h1>
          Hola 🤗
        </h1>
        <p>
          Rellena todos los datos <br />
          para pertenecer a la comunidad
        </p>
        <p class="error_message" v-show="required">⚠️ {{ errorMessage }}</p>
        <label for="name">Nombre</label>
        <br />
        <input type="text" id="name" v-model="name" />
        <br />
        <label for="surname">Apellidos</label>
        <br />
        <input type="text" id="surname" v-model="surname" />
        <br />
        <label for="email">Email</label>
        <br />
        <input type="email" id="email" v-model="email" />
        <br />
        <label for="password">Password</label>
        <br />
        <input type="password" id="password" v-model="password" />
        <br />
        <label for="location">Selecciona tu Comunidad</label>
        <br />
        <input type="text" id="location" v-model="location" />
        <br />
        <label for="avatar">Selecciona tu imagen de perfil</label>
        <br />
        <input type="file" id="file" ref="file" @change="onFileChanged" />
        <br />
        <button class="button_primary" @click="newUser()">Registrar</button>
        <router-link class="button_text" :to="{ name: 'Login' }"
          >Ir a login</router-link
        >
      </section>
    </section>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      password: "",
      location: "",
      file: null,
      errorMessage: "Error",
      required: false,
    };
  },
  methods: {
    onFileChanged() {
      this.file = this.$refs.file.files[0];
    },
    newUser() {
      let self = this;

      let dataNewUser = new FormData();
      dataNewUser.append("name", this.name);
      dataNewUser.append("surname", this.surname);
      dataNewUser.append("email", this.email);
      dataNewUser.append("password", this.password);
      dataNewUser.append("location", this.location);
      dataNewUser.append("avatar", this.file);

      axios
        .post("http://localhost:3001/users", dataNewUser)
        .then(function(response) {
          alert("Usuario registrado correctamente");
          setTimeout(function() {
            location.reload();
          }, 1500);
        })
        .catch(function(error) {
          if (error.response) {
            // Si hay error del Back lo guardo en locastorage y lo muestro en pantalla
            localStorage.setItem("errorBack", error.response.data.message);
            self.errorMessage = localStorage.getItem("errorBack");
            self.required = true;
          }
        });
    },
  },
};
</script>

<style scoped>
.register_card {
  background: #fff;
  border-radius: 6px;
  margin: 4rem 0;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  align-items: center;
  justify-items: center;
}

.form_card h1 {
  margin-bottom: 0.2rem;
}

.form_card p {
  font-style: italic;
  font-size: 0.8rem;
  margin-bottom: 1.5rem;
}

.img_card img {
  max-width: 400px;
  max-height: 400px;
}
</style>
