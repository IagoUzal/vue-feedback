<template>
  <article>
    <ul>
      <li v-for="message in messages" :key="message.id">
        <div class="card_image">
          <img
            class="avatar"
            :src="path + message.avatar_to"
            :alt="message.Para"
          />
        </div>
        <div class="container_card">
          <div class="card_header">
            <h3>{{ message.Para }}</h3>
            <p>Escrito por: {{ message.De }}</p>
          </div>
          <div class="card_body">
            <h3>{{ message.title }}</h3>
            <p>{{ message.text }}</p>
            <img
              :src="path + message.image"
              :alt="message.titulo"
              :class="{ sinImagen: path + message.image === 'sin imagen' }"
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
  </article>
</template>

<script>
export default {
  name: "listMessages",
  props: {
    messages: Array,
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

li {
  display: grid;
  grid-template-columns: 1fr 4fr;
  background: #fff;
  padding: 1rem;
  border-radius: 6px;
  gap: 1rem;
}

.card_header {
  margin-bottom: 1.2rem;
}

.card_header h3 {
  margin-bottom: 0.2rem;
}

.card_header p {
  font-size: 0.8rem;
  font-style: italic;
}

.card_body {
  margin-bottom: 1.2rem;
  padding-right: 1rem;
}

.card_body h3 {
  margin-bottom: 0.2rem;
}

.card_body img {
  margin-top: 1rem;
}

.card_footer {
  border-top: 1px solid #f0f0f0;
  padding-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}

h3 {
  font-weight: 600;
}

.sinImagen {
  display: none;
}
</style>
