<template>
  <article>
    <ul>
      <li v-for="user in users" :key="user.id">
        <router-link
          class="card_link"
          :to="{ name: 'Wall', params: { id: user.id } }"
        >
          <section class="card_header">
            <img
              class="avatar"
              :src="
                user.avatar.includes('uifaces')
                  ? user.avatar
                  : path + user.avatar
              "
              :alt="user.name"
            />
            <h3>
              {{ user.name }} {{ user.surname }} <br /><span
                class="location_text"
                >{{ user.location }}</span
              >
            </h3>
          </section>
        </router-link>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  name: "listUsers",
  props: {
    users: Array,
  },
  data() {
    return {
      path: "http://localhost:3001/uploads/",
    };
  },
};
</script>

<style scoped>
ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

li {
  display: grid;
  background: #fff;
  border-radius: 6px;
  align-content: center;
  align-items: center;
  padding: 1rem 0 0 1rem;
}

.card_header {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
}

.location_text {
  color: #505050;
  font-weight: 300;
  font-size: 0.8rem;
}

.card_link {
  text-decoration: none;
}

h3 {
  font-weight: 600;
  font-size: 1rem;
}

.surname {
  color: #505050 !important;
  font-weight: 400;
}
</style>
