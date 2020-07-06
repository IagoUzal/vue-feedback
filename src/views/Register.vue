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
        <!-- <br />
        <label for="location">Selecciona tu Comunidad</label>
        <br />
        <input type="text" id="location" v-model="location" />
        <br />
        <label for="avatar">Selecciona tu imagen de perfil</label>
        <br />
        <input type="file" id="file" ref="file" @change="onFileChanged" /> -->
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
import Swal from "sweetalert2";

export default {
  name: "Register",
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      password: "",
      location: "sin definir",
      avatar: "avatar.png",
      errorMessage: "Error",
      required: false,
    };
  },
  methods: {
    newUser() {
      let self = this;

      let dataNewUser = new FormData();
      dataNewUser.append("name", this.name);
      dataNewUser.append("surname", this.surname);
      dataNewUser.append("email", this.email);
      dataNewUser.append("password", this.password);
      dataNewUser.append("location", this.location);

      axios
        .post("http://localhost:3001/users", dataNewUser)
        .then(function(response) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title:
              "Genial estas registrado, revisa tu email y valida tu usuario",
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push("/login");
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
.container_register {
  display: grid;
  align-content: center;
  justify-content: center;
}

.register_card {
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

.form_card h1 {
  margin-bottom: 0.2rem;
}

.form_card p {
  font-style: italic;
  font-size: 0.8rem;
  margin-bottom: 1.5rem;
}

.img_card img {
  max-width: 250px;
  max-height: 250px;
}
</style>
