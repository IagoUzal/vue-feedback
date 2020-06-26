<template>
  <main class="profile container">
    <section class="profile">
      <h3>Tus datos de perfil</h3>
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
    <section class="feedback">
      <h3>Feedback enviado</h3>
      <ul>
        <li v-for="feedback in feedbackSend" :key="feedback.id">
          <img class="avatar" :src="feedback.avatar_to" :alt="feedback.Para" />
          <p>{{ feedback.Para }}</p>
          <h3>{{ feedback.title }}</h3>
          <p>{{ feedback.text }}</p>
          <img :src="feedback.image" :alt="feedback.title" />
          <p>{{ feedback.category }}</p>
          <p>{{ feedback.type }}</p>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
/*
  - FIXME: 
    - actualizar avatar
    - actualizar password 

  - TODO: 
    - edit messages escritos
    - delete messages escritos
    - maquetación
*/
import axios from "axios";

export default {
  name: "MyProfile",
  data() {
    return {
      profile: [],
      feedbackSend: [],
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
    // editar datos de usuario
    editProfile() {
      let self = this;
      let userID = this.$route.params.id;

      axios
        .put("http://localhost:3001/users/" + userID, {
          avatar: this.profile.avatar,
          name: this.profile.name,
          surname: this.profile.surname,
          email: this.profile.email,
          location: this.profile.location,
        })
        .then(function(response) {
          alert("Usuario modificado correctamente");
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    },
    getFeedbackSend() {
      let self = this;
      let userID = this.$route.params.id;

      axios
        .get(`http://localhost:3001/messages/users/${userID}`)
        .then(function(response) {
          self.feedbackSend = response.data.data;
          console.log(self.feedbackSend);
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
    this.getFeedbackSend();
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
