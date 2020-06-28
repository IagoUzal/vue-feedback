<template>
  <main class="profile container">
    <section class="profile">
      <h3>Tus datos de perfil</h3>
      <img
        class="avatar"
        :src="
          profile.avatar.includes('uifaces')
            ? profile.avatar
            : path + profile.avatar
        "
        :alt="profile.name"
      />
      <input type="file" id="file" ref="file" @change="onFileChanged" />
      <br />
      <input type="text" v-model="name" :placeholder="profile.name" />
      <br />
      <input type="text" v-model="surname" :placeholder="profile.surname" />
      <br />
      <input type="text" v-model="email" :placeholder="profile.email" />
      <br />
      <input type="text" v-model="location" :placeholder="profile.location" />
      <br />
      <button class="button_primary" @click="editProfile()">Actualizar</button>
    </section>
    <section class="feedback">
      <h3>Feedback enviado</h3>
      <ul>
        <li v-for="(feedback, index) in feedbackSend" :key="feedback.id">
          <img class="avatar" :src="feedback.avatar_to" :alt="feedback.Para" />
          <p class="error_message" v-show="required">{{ messageError }}</p>
          <p>{{ feedback.Para }}</p>
          <input type="text" v-model="feedback.title" />
          <br />
          <textarea rows="4" cols="30" v-model="feedback.text" />
          <br />
          <img :src="feedback.image" :alt="feedback.title" />
          <p>{{ feedback.category }}</p>
          <p>{{ feedback.type }}</p>
          <button class="button_primary" @click="editFeedback(index)">
            Actualizar
          </button>
          <button class="button_primary">Borrar</button>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
/*
  - FIXME:
    - actualizar password

  - TODO:
    - edit messages escritos
    - delete messages escritos
    - maquetación
*/
import axios from "axios";
import { clearLogin } from "@/api/utils.js";

export default {
  name: "MyProfile",
  data() {
    return {
      path: "http://localhost:3001/uploads/",
      profile: [],
      file: null,
      name: null,
      surname: null,
      email: null,
      location: null,
      feedbackSend: [],
      messageError: "Error",
      required: false,
    };
  },
  methods: {
    // Modificar imagen de perfil
    onFileChanged() {
      this.file = this.$refs.file.files[0];
    },
    // Traer los datos de perfíl del usuario autenticado
    getProfile() {
      let self = this;

      axios
        .get("http://localhost:3001/users/" + self.$route.params.id)
        .then(function(res) {
          self.profile = res.data.data[0];
          console.log(self.profile);
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

      let dataEditProfile = new FormData();

      console.log(this.name);
      console.log(this.surname);

      if (this.file !== null) {
        dataEditProfile.append("avatar", this.file);
      }
      if (this.name !== null) {
        dataEditProfile.append("name", this.name);
      }
      if (this.surname !== null) {
        dataEditProfile.append("surname", this.surname);
      } else {
        console.log("no hacer nada");
      }
      if (this.email !== null) {
        dataEditProfile.append("email", this.email);
      }
      if (this.location !== null) {
        dataEditProfile.append("location", this.location);
      }

      // dataEditProfile.append("name", this.profile.name);
      // dataEditProfile.append("surname", this.profile.surname);
      // dataEditProfile.append("email", this.profile.email);
      // dataEditProfile.append("location", this.profile.location);

      axios
        .put("http://localhost:3001/users/" + userID, dataEditProfile)
        .then(function(response) {
          alert(
            "Usuario modificado correctamente, tienes que volver a iniciar sesión"
          );
          self.logoutUser();
          // setTimeout(function() {
          //   location.reload();
          // }, 1500);
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
            location.reload();
          }
        });
    },
    logoutUser() {
      this.$router.push("/login");
      return clearLogin();
    },

    //   axios
    //     .put("http://localhost:3001/users/" + userID, {
    //       avatar: this.file,
    //       name: this.profile.name,
    //       surname: this.profile.surname,
    //       email: this.profile.email,
    //       location: this.profile.location,
    //     })
    //     .then(function(response) {
    //       alert("Usuario modificado correctamente");
    //     })
    //     .catch(function(error) {
    //       if (error.response) {
    //         alert(error.response.data.message);
    //       }
    //     });
    // },

    // ======= GET, PUT, DELETE, FEEDBACK BY USER ID =======

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
    editFeedback(index) {
      let self = this;
      let dataIn = this.feedbackSend[index].id;
      let userID = this.$route.params.id;
      if (
        this.feedbackSend[index].title === "" ||
        this.feedbackSend[index].text === ""
      ) {
        this.messageError = "Los campos Titulo y Texto no pueden estar vacios";
        this.required = true;
      } else {
        axios
          .put(`http://localhost:3001/messages/${dataIn}`, {
            title: this.feedbackSend[index].title,
            text: this.feedbackSend[index].text,
            type: this.feedbackSend[index].type,
            category: this.feedbackSend[index].category,
          })
          .then(function(response) {
            alert("Feedback modificado correctamente");
            setTimeout(function() {
              location.reload();
            }, 1500);
          })
          .catch(function(error) {
            if (error.response) {
              alert(error.response.data.message);
            }
          });
      }
    },
    deleteFeedback() {},
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
