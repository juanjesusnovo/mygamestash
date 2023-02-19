<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view :key="$route.fullPath"/>
    </v-main>
    <NavFooter />
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';
import NavFooter from './components/NavFooter.vue';

  export default {
    name: "App",
    data: () => {
    },
    components: { Navbar, NavFooter }
}
</script>
<style>
</style>