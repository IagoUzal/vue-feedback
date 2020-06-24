<template>
  <footer id="footer">
    <section class="container">
      <img src="../assets/image/iagoalvarezuzal.jpg" alt="Iago Alvarez Uzal" />
      <p>
        <a href="https://www.linkedin.com/in/iagoalvarezuzal/"
          >Iago Alvarez Uzal</a
        >
        proyecto final bootcamp
        <a href="https://hackaboss.com/"> Hack A Boss</a>
      </p>
    </section>
  </footer>
</template>

<script>
export default {
  name: "footerCustom",
  data() {
    return {};
  },
};
</script>

<style scoped>
footer {
  background: #fff;
}

.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  padding: 1rem 0;
  align-items: center;
}

p {
  margin-bottom: 0;
  text-align: right;
}

img {
  width: 50px;
  height: 50px;
  border-radius: 100%;
}

a {
  color: #505050;
  text-decoration: none;
  font-weight: 700;
}
</style>
