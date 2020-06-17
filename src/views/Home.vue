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
          <h3>😀 Últimos usuarios registrados</h3>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import navcustom from "@/components/NavCustom.vue";
import hero from "@/components/Hero.vue";

export default {
  name: "Home",
  components: {
    navcustom,
    hero,
  },
  data() {
    return {
      titulo: "¿Tienes algo que decir?",
      descripcion:
        "Una colección de agradecimientos y referencias de las personas con las que compartes tu día día",
    };
  },
};
</script>

<style scoped>
.wraper {
  margin: 4rem 0;
}
</style>
