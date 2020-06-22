<template>
  <header>
    <nav id="nav">
      <div class="nav_container">
        <div class="nav_left">
          <router-link class="logo" :to="{ name: 'Home' }"
            >Feedback 💬</router-link
          >
        </div>
        <div class="nav_right">
          <router-link class="button_primary" :to="{ name: 'Login' }"
            >Login</router-link
          >
          <router-link class="button_text" :to="{ name: 'Register' }"
            >Registro</router-link
          >
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "navcustom",
};
</script>

<style scoped>
#nav {
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 30px;
}

#nav a {
  font-weight: 600;
  color: #162447;
  text-decoration: none;
  padding-right: 1rem;
}

#nav a.router-link-exact-active {
  color: #162447;
}

.nav_container {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.nav_right {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: end;
  align-content: center;
  align-items: baseline;
}

.logo {
  font-weight: 900 !important;
  font-size: 1.5rem;
}
</style>
