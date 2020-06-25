<template>
  <main class="profile container">
    <section class="profile">
      <h3>Tus datos de perfil</h3>
      <p>Cambia aquí tus datos para actualizarlos</p>
      <img class="avatar" :src="profile.avatar" :alt="profile.name" />
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpg, image/jpeg"
      />
      <br />
      <input type="text" v-model="profile.name" />
      <br />
      <input type="text" v-model="profile.surname" />
      <br />
      <input type="text" v-model="profile.email" />
      <br />
      <input type="text" v-model="profile.location" />
      <br />
      <button class="button_primary" @click="editProfile()">Actualizar</button>
    </section>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "MyProfile",
  data() {
    return {
      profile: [],
    };
  },
  methods: {
    // Traer los datos de perfíl del usuario autenticado
    getProfile() {
      let self = this;

      axios
        .get("http://localhost:3001/users/" + self.$route.params.id)
        .then(function(res) {
          self.profile = res.data.data[0];
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    },

    editProfile() {
      let self = this;

      axios
        .put("http://localhost:3001/users/" + self.$route.params.id, {
          name: this.profile.name,
          surname: this.profile.surname,
          email: this.profile.surname,
          location: this.profile.location,
        })
        .then(function(response) {
          alert("Usuario modificado");
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    },
  },
  created() {
    this.getProfile();
  },
};
</script>

<style scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
}
</style>
