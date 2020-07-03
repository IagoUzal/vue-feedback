<template>
  <main class="profile container">
    <article class="my_profile">
      <section class="profile_data">
        <h3>Tus datos de perfil 🤗</h3>
        <p class="description">
          Aquí puedes consultar tus datos de perfíl y actualizarlos
        </p>
        <section class="card_profile">
          <section class="cambiar_avatar">
            <img
              class="avatar"
              :src="path + profile.avatar"
              :alt="profile.name"
            />
            <input
              type="file"
              class="inputfile"
              id="file"
              ref="file"
              @change="onFileChanged"
            />
            <label for="file">Cambiar Avatar</label>
          </section>
          <input class="input_list" type="text" v-model="profile.name" />
          <br />
          <input class="input_list" type="text" v-model="profile.surname" />
          <br />
          <input class="input_list" type="email" v-model="profile.email" />
          <br />
          <input class="input_list" type="text" v-model="profile.location" />
          <br />
          <button class="button_primary" @click="editProfile()">
            Actualizar
          </button>
        </section>
      </section>
      <section class="feedback_enviado">
        <h3>Feedback enviado ✍🏼</h3>
        <p class="description">
          Aquí puedes editar el feedback enviado o borrarlo si lo deseas
        </p>
        <ul>
          <li v-for="(feedback, index) in feedbackSend" :key="feedback.id">
            <section class="card_header">
              <img
                class="avatar"
                :src="path + feedback.avatar_to"
                :alt="feedback.Para"
              />
              <section class="card_name">
                <p>Enviado a:</p>
                <h3>{{ feedback.Para }}</h3>
              </section>
            </section>
            <section class="card_body">
              <p class="error_message" v-show="required">{{ messageError }}</p>
              <label for="title">Editar titulo</label>
              <br />
              <input type="text" v-model="feedback.title" />
              <br />
              <label for="text">Editar Mensaje</label>
              <br />
              <textarea rows="4" cols="30" v-model="feedback.text" />
              <br />
              <img
                :src="path + feedback.image"
                :alt="feedback.title"
                class="img_feedback"
              />
            </section>
            <section class="card_footer">
              <p>
                <span
                  class="label"
                  :class="{
                    profesional: feedback.category === 'Profesional',
                    personal: feedback.category === 'Personal',
                  }"
                  >{{ feedback.category }}</span
                >
                <span
                  class="label"
                  :class="{
                    agradecimiento: feedback.type === 'Agradecimiento',
                    referencia: feedback.type === 'Referencia',
                  }"
                  >{{ feedback.type }}</span
                >
              </p>
              <hr />
              <button class="button_primary" @click="editFeedback(index)">
                Actualizar
              </button>
              <button class="button_text" @click="deleteFeedback(index)">
                Borrar
              </button>
            </section>
          </li>
        </ul>
      </section>
      <section class="feedback_recibido">
        <h3>
          Feedback recibido 💬
        </h3>
        <p class="description">
          Aquí puedes consultar tu feedback recibido
        </p>
      </section>
    </article>
  </main>
</template>

<script>
/*
  - FIXME:
    - actualizar password

  - TODO:
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

      if (this.file !== null) {
        dataEditProfile.append("avatar", this.file);
      }

      dataEditProfile.append("name", this.profile.name);
      dataEditProfile.append("surname", this.profile.surname);
      dataEditProfile.append("email", this.profile.email);
      dataEditProfile.append("location", this.profile.location);

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
    deleteFeedback(index) {
      let self = this;
      let dataDelete = this.feedbackSend[index].id;
      axios
        .delete(`http://localhost:3001/messages/${dataDelete}`)
        .then(function(response) {
          alert("Mensaje borrado correctamente");
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
  created() {
    this.getProfile();
    this.getFeedbackSend();
  },
};
</script>

<style scoped>
.profile {
  margin-top: 2rem;
}

.description {
  font-size: 0.8rem;
  font-style: italic;
  margin-bottom: 2rem;
}

.my_profile {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.my_profile h3 {
  margin-bottom: 0.2rem;
}

.feedback_enviado {
  grid-column: span 3;
}

.feedback_enviado ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.card_profile {
  border-radius: 6px;
}

.input_list {
  background: transparent;
  border-radius: 0;
  border-bottom: 1px solid #505050;
  width: 100%;
}

.feedback_enviado ul li {
  background: #fff;
  border-radius: 6px;
  padding: 1rem;
}

.card_header {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  justify-items: start;
  align-items: center;
  margin-bottom: 1rem;
}

.card_name p {
  margin-bottom: 0;
  font-size: 0.8rem;
  font-style: italic;
}

.card_body {
  margin-bottom: 1rem;
  padding-right: 1rem;
}

.card_body input,
textarea {
  background: transparent;
  font-family: Muli;
  padding-left: 0;
  font-size: 1rem;
  color: #505050;
}

.button_primary {
  margin-right: 1rem;
  margin-top: 1rem;
}

hr {
  margin-top: 1.5rem;
}

/* input[type="file"] {
  width: 100%;
  display: inline-block;
} */

.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.inputfile + label {
  color: #e43f5a;
  background-color: transparent;
  cursor: pointer;
}

.inputfile:focus + label,
.inputfile + label:hover {
  color: #162447;
}

.cambiar_avatar {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: center;
}
</style>
