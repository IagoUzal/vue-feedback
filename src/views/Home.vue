<template>
  <main>
    <vue-headful
      title="Feedback - Feedback Project"
      description="Página de Feedback"
    />
    <section class="feedback container">
      <section class="destacado">
        <div class="imagen">
          <img src="../assets/image/login.gif" alt="" />
        </div>
        <div class="description">
          <p>
            Una colección de agradecimientos y referencias de las personas con
            las que compartes tu día día
          </p>
        </div>
        <div class="total_messages">
          <p>
            {{ totalMessages }} <br />
            mensajes escritos
          </p>
        </div>
        <div class="total_users">
          <p>{{ totalUsers }} <br />usuarios registrados</p>
        </div>
      </section>
      <input
        v-model="search"
        id="search"
        type="search"
        name="search"
        placeholder="Busca por usuario, tipo, categoria o localidad..."
      />
      <section class="anonimousData">
        <section class="messages">
          <h3>Últimos Mensajes publicados 💬</h3>
          <listMessages
            :messages="filteredMessages"
            v-show="seeAll"
          ></listMessages>
        </section>
        <section class="users">
          <h3>Usuarios registrados 🙋🏻‍♂️</h3>
          <listUsers :users="filteredUsers"></listUsers>
        </section>
      </section>
    </section>
  </main>
</template>

<script>
import api from "@/api/api.js";
import listMessages from "@/components/ListMessages.vue";
import listUsers from "@/components/ListUsers.vue";
export default {
  name: "Home",
  components: {
    listMessages,
    listUsers,
  },
  data() {
    return {
      messages: [],
      users: [],
      search: "",
      seeAll: true,
      totalMessages: null,
      totalUsers: null,
    };
  },
  computed: {
    filteredMessages() {
      if (!this.search) {
        return this.messages;
      }
      return this.messages.filter(
        (message) =>
          message.Para.toLowerCase().includes(this.search.toLowerCase()) ||
          message.type.toLowerCase().includes(this.search.toLowerCase()) ||
          message.category.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    filteredUsers() {
      if (!this.search) {
        return this.users;
      }
      return this.users.filter(
        (user) =>
          user.name.toLowerCase().includes(this.search.toLowerCase()) ||
          user.location.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    sumaMessages() {
      this.totalMessages = this.messages.length;
    },
    sumaUsers() {
      this.totalUsers = this.users.length;
    },
  },
  created() {
    // Todos los mensajes
    api.getMessages().then((res) => {
      this.messages = res.data.data;
      this.sumaMessages();
    });
    // Todos los usuarios
    api.getUsers().then((res) => {
      this.users = res.data.data;
      this.sumaUsers();
    });
  },
};
</script>

<style scoped>
.feedback {
  margin: 2rem auto;
}

.destacado {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.imagen {
  background: #fff;
  border-radius: 6px;
  padding: 1rem;
  height: 100%;
  text-align: center;
}

.description {
  background: #fff;
  border-radius: 6px;
  padding: 2rem;
  height: 100%;
  display: grid;
  align-items: center;
}

.description p {
  color: #162447;
  font-weight: 300;
  font-size: 1.4rem;
}

.total_messages {
  background: #e43f5a;
  border-radius: 6px;
  padding: 2rem;
  font-size: 2rem;
  height: 100%;
  display: grid;
  align-items: center;
}

.total_messages p {
  color: #fff;
}

.total_users {
  background: #162447;
  color: #fff;
  border-radius: 6px;
  padding: 2rem;
  font-size: 2rem;
  height: 100%;
  display: grid;
  align-items: center;
}

.total_users p {
  color: #fff;
}

input {
  background: #fff;
  border: none;
  border-radius: 6px;
  padding: 1rem;
  font-size: 1rem;
  color: #161617;
  width: 100%;
  font-style: italic;
}

.anonimousData {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.messages {
  grid-column: span 2;
}

h3 {
  margin-bottom: 2rem;
}
</style>
