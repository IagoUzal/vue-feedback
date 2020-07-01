<template>
  <main class="wall">
    <article class="container">
      <section class="perfil">
        <section class="user_info">
          <h3>Perfil de {{ user.name }} 🤗</h3>
          <img class="avatar" :src="path + user.avatar" :alt="user.name" />
          <ul>
            <li><span class="color_black">Nombre:</span> {{ user.name }}</li>
            <li>
              <span class="color_black">Apellidos:</span> {{ user.surname }}
            </li>
            <li>
              <span class="color_black">Localidad:</span> {{ user.location }}
            </li>
            <li>
              <span class="color_black">Feedback recivido:</span>
              <span class="span_data">{{ totalFeedback }}</span>
            </li>
          </ul>
        </section>
      </section>
      <section class="wall_feedback">
        <section class="send_feedback">
          <h3>Enviar feedback a {{ user.name }} 💬</h3>
          <div class="form">
            <p class="error_message" v-show="required">⚠️ {{ errorMessage }}</p>
            <label for="title">Titulo</label>
            <br />
            <input type="text" id="Titulo" v-model="title" />
            <br />
            <label for="text">Descripción</label>
            <br />
            <textarea
              name="text"
              id="text"
              cols="30"
              rows="4"
              v-model="text"
            ></textarea>
            <br />
            <label for="category">Categoria</label>
            <br />
            <select name="category" v-model="category">
              <option value="Profesional" selected>Profesional</option>
              <option value="Personal">Personal</option>
            </select>
            <br />
            <label for="type">Tipo</label>
            <br />
            <select name="type" id="type" v-model="type">
              <option value="Agradecimiento">Agradecimiento</option>
              <option value="Referencia" selected>Referencia</option>
            </select>
            <br />
            <label for="file"> Imagen</label>
            <p class="label_description">
              Selecciona una imagen para describir el feedback
            </p>
            <input type="file" id="file" ref="file" @change="onFileChanged" />
            <br />
            <button class="button_primary" @click="sendFeedback()">
              Enviar feedback
            </button>
          </div>
        </section>
        <section class="feedback_recibido">
          <h3>Último feedback recibido por {{ user.name }} 👇</h3>
          <ul>
            <li v-for="message in messages" :key="message.id">
              <div class="container_card">
                <div class="card_header">
                  <h3>{{ message.title }}</h3>
                  <p>Escrito por: {{ message.De }}</p>
                </div>
                <div class="card_body">
                  <p>{{ message.text }}</p>
                  <img
                    :src="path + message.image"
                    :alt="message.titulo"
                    :class="{ sinImagen: message.image === 'sin imagen' }"
                    class="img_feedback"
                  />
                </div>
                <div class="card_footer">
                  <p>
                    <span
                      class="label"
                      :class="{
                        profesional: message.category === 'Profesional',
                        personal: message.category === 'Personal',
                      }"
                      >{{ message.category }}</span
                    >
                    <span
                      class="label"
                      :class="{
                        agradecimiento: message.type === 'Agradecimiento',
                        referencia: message.type === 'Referencia',
                      }"
                      >{{ message.type }}</span
                    >
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </section>
      <section class="others">
        <h3>Otros</h3>
        <section class="others_img">
          <img src="../assets/image/register.gif" alt="" />
        </section>
      </section>
    </article>
  </main>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Wall",
  components: {},
  data() {
    return {
      messages: [],
      user: [],
      path: "http://localhost:3001/uploads/",
      title: "",
      text: "",
      category: "Profesional",
      type: "Referencia",
      file: null,
      fileNo: "sin imagen",
      totalFeedback: 0,
      errorMessage: "Error",
      required: false,
    };
  },
  methods: {
    onFileChanged() {
      this.file = this.$refs.file.files[0];
    },
    getMessagesPara() {
      let self = this;
      let para = this.$route.params.id;

      axios
        .get(`http://localhost:3001/messages/to/${para}`)
        .then(function(response) {
          self.messages = response.data.data;
          console.log(self.messages);
          self.totalFeedback = self.messages.length;
        })
        .catch(function(error) {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    },
    getUserInfo() {
      let self = this;
      let userID = this.$route.params.id;

      axios
        .get(`http://localhost:3001/users/${userID}`)
        .then(function(response) {
          self.user = response.data.data[0];
          console.log(self.user);
        });
    },
    sendFeedback() {
      let self = this;
      let toUserID = this.$route.params.id;

      let dataNewFeedback = new FormData();
      dataNewFeedback.append("to_users_id", toUserID);
      dataNewFeedback.append("title", this.title);
      dataNewFeedback.append("text", this.text);
      dataNewFeedback.append("category", this.category);
      dataNewFeedback.append("type", this.type);
      if (this.file !== null) {
        dataNewFeedback.append("image", this.file);
      } else {
        dataNewFeedback.append("image", this.fileNo);
      }

      axios
        .post("http://localhost:3001/messages", dataNewFeedback)
        .then(function(response) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Feedback Enviado Correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(function() {
            location.reload();
          }, 2000);
        })
        .catch(function(error) {
          if (error.response) {
            // Si hay error del Back lo guardo en locastorage y lo mestro en pantalla
            localStorage.setItem("errorBack", error.response.data.message);
            self.errorMessage = localStorage.getItem("errorBack");
            self.required = true;
          }
        });
    },
  },
  created() {
    this.getMessagesPara();
    this.getUserInfo();
  },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 2rem;
}

.wall {
  margin: 2rem 0;
}
h3 {
  margin-bottom: 2rem;
}

.perfil {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.sinImagen {
  display: none;
}

.user_info li {
  border-bottom: 1px solid #505050;
  padding: 0.5rem 0;
  width: 100%;
}

.form {
  background: #fff;
  padding: 2rem;
  border-radius: 6px;
}

.send_feedback {
  margin-bottom: 2rem;
}

.feedback_recibido ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.feedback_recibido ul li {
  background: #fff;
  padding: 2rem;
  border-radius: 6px;
}

.img_feedback {
  width: 100%;
}

.card_header {
  margin-bottom: 1rem;
}

.card_header h3 {
  margin-bottom: 0.25rem;
}

.card_header p {
  font-size: 0.8rem;
  font-style: italic;
}

.card_body {
  margin-bottom: 1rem;
}

.card_body img {
  margin: 0.8rem 0;
}

.card_footer {
  border-top: 1px solid #f0f0f0;
  margin-bottom: 0.5rem;
  padding-top: 0.8rem;
}

.others_img {
  border-radius: 6px;
}

.others_img img {
  width: 100px;
  height: 100px;
  border-radius: 6px;
}

.span_data {
  background: #162447;
  padding: 0.2rem 0.5rem;
  width: auto;
  height: auto;
  border-radius: 100%;
  color: #fff;
  margin-left: 0.5rem;
}

.color_black {
  color: #161617;
  font-weight: 600;
}
</style>
