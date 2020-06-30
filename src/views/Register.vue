<template>
  <main class="container">
    <vue-headful
      title="Registro - Feedback Project"
      description="Página de Registro"
    />
    <section class="register_card">
      <section class="img_card"></section>
      <section class="form_card">
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
        <input type="text" id="location" v-model="location" />
        <label for="avatar">Selecciona tu imagen de perfil</label>
        <br />
        <input type="file" id="file" ref="file" @change="onFileChanged" />
        <br />
        <button class="button_primary" @click="newUser()">Registro</button>
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
            alert(error.response.data.message);
          }
        });
    },
  },
};
</script>

<style scoped></style>
