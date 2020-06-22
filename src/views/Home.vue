<template>
  <div class="home">
    <vue-headful
      title="Feedback Project"
      description="Proyecto final frontend con Vue Hack A Boss"
    />
    <navcustom></navcustom>
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
import navcustom from "@/components/NavCustom.vue";
import hero from "@/components/Hero.vue";
import buttonusers from "@/components/ButtonUsers.vue";
import listMessages from "@/components/ListMessages.vue";

export default {
  name: "Home",
  components: {
    navcustom,
    hero,
    buttonusers,
    listMessages,
  },
  data() {
    return {
      titulo: "¿Tienes algo que decir?",
      descripcion:
        "Una colección de agradecimientos y referencias de las personas con las que compartes tu día día",
      users: [],
      messages: [],
    };
  },
  created() {
    api.getUsers().then((res) => {
      this.users = res.data.data;
    });
    api.getMessages().then((res) => {
      this.messages = res.data.data;
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
