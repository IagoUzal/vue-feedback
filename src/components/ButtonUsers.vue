<template>
  <div class="card">
    <article>
      <ul>
        <li v-for="user in users" :key="user.id">
          <img :src="user.avatar" :alt="user.name" />
          <h3>
            {{ user.name }} <span class="surname"> {{ user.surname }} </span>
          </h3>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
export default {
  name: "buttonusers",
  props: {
    users: Array,
  },
};
</script>

<style scoped>
img {
  width: 50px;
  height: 50px;
  border-radius: 100%;
}

ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

li {
  display: grid;
  grid-template-columns: 1fr 2fr;
  background: #fff;
  padding: 1rem;
  border-radius: 6px;
  align-content: center;
  align-items: center;
  gap: 1rem;
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
