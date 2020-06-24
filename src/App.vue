<template>
  <div id="app">
    <navCustom></navCustom>
    <router-view />
    <footerCustom></footerCustom>
  </div>
</template>

<script>
import navCustom from "@/components/NavCustom.vue";
import footerCustom from "@/components/FooterCustom.vue";

export default {
  components: {
    footerCustom,
    navCustom,
  },
};
</script>

<style scoped></style>
