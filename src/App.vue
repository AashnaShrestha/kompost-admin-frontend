<template>
  <v-app>
    <v-main>
      <app-header v-if="!$route.meta.hideNavbar" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    "app-header": Header,
    //s"app-footer": Footer,
  },

  data: () => ({
  }),
};
</script>
