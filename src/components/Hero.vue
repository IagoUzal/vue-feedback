<template>
  <section class="hero">
    <div class="container">
      <div class="hero_content">
        <div class="titulo">
          <h1>{{ titulo }}</h1>
          <p>{{ descripcion }}</p>
          <router-link
            class="button_primary button_large"
            :to="{ name: 'Feedback' }"
            >Ir al feddback</router-link
          >
        </div>
        <div class="img">
          <lottie-player
            src="https://assets8.lottiefiles.com/packages/lf20_MeTWrj.json"
            background="transparent"
            speed="1"
            style="width: 300px; height: 300px;"
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "hero",
  props: {
    titulo: String,
    descripcion: String,
    imagen: String,
  },
};
</script>

<style scoped>
.hero {
  background: #162447;
  color: #fff;
}

.hero h1 {
  color: #fff;
}

.hero_content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.titulo {
  padding: 4rem 8rem 4rem 0;
  display: grid;
  align-content: center;
}

.titulo p {
  font-size: 1.4rem;
  font-weight: 300;
  color: #f0f0f0;
}

.img {
  display: grid;
  justify-content: left;
}

.button_primary {
  margin-top: 1rem;
}
</style>
