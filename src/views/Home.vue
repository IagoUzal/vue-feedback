<template>
  <div class="home">
    <vue-headful
      title="Feedback Project"
      description="Proyecto final frontend con Vue Hack A Boss"
    />
    <main>
      <hero :titulo="titulo" :descripcion="descripcion"></hero>
      <section class="wraper">
        <div class="container">
          <h2>😀 Últimos usuarios registrados</h2>
          <buttonusers :users="users"></buttonusers>
          <h2>💬 Últimos mensajes publicados</h2>
          <listMessages :messages="messages"></listMessages>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import api from "@/api/api.js";
import hero from "@/components/Hero.vue";
import buttonusers from "@/components/ButtonUsers.vue";
import listMessages from "@/components/ListMessages.vue";

export default {
  name: "Home",
  components: {
    hero,
    buttonusers,
    listMessages,
  },
  data() {
    return {
      titulo: "¿Tienes algo que decir?",
      descripcion:
        "Una colección de agradecimientos y referencias de las personas con las que compartes tu día día",
      allUsers: [],
      users: [],
      allMessages: [],
      messages: [],
    };
  },
  created() {
    // Solo los últimos 5 usuarios registrados mostramos en la Landin
    api.getUsers().then((res) => {
      this.allUsers = res.data.data;
      this.users = this.allUsers.slice(this.allUsers.length - 5);
    });
    // Solo los últimos 6 mensajes publicados
    api.getMessages().then((res) => {
      this.allMessages = res.data.data;
      this.messages = this.allMessages.slice(this.allUsers.length - 6);
    });
  },
};
</script>

<style scoped>
.wraper {
  margin: 4rem 0;
}

h2 {
  margin: 2rem 0;
}
</style>
