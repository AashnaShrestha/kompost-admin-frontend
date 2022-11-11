<template>
  <div>
    <v-navigation-drawer v-model="drawer" mini fixed app>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="@/assets/logo.png"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>KOMPOST</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider />

      <v-list>
        <div v-for="item in items" :key="item.title">
          <v-divider v-if="item.title == 'Task'"></v-divider>
          <v-list-item v-if="!item.subItems" v-on:click="clicked(item.path)">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-title v-text="item.title" />
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-layout>
        <v-flex>
          <v-toolbar-title>Application</v-toolbar-title>
        </v-flex>
      </v-layout>

      <v-row class="d-flex flex-row-reverse">
        <v-menu
          transition="slide-y-transition"
          bottom
          :nudge-width="250"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on }">
            <v-btn text icon class="mr-4" v-on="on">
              <v-icon large>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-card class="cardBorderRadious">
            <v-list>
              <v-list-item-content class="pa-3">
                <v-list-item-sub-title><b>Hello,</b></v-list-item-sub-title>
                <v-list-item-title> Admin</v-list-item-title>
              </v-list-item-content>
            </v-list>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text title="Logout" color="grey darken-1" @click="logout">
                <v-icon class="mr-1">mdi-lock-open</v-icon>
                Log out
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    drawer: false,

    items: [
      {
        title: "Home",
        icon: "mdi-home",
        href: "/",
        path: "/",
      },
    ],
    mini: true,
  }),
  created() {},
  mounted() {},
  methods: {
    clicked(path) {
      this.$router.push({ path: path });
      this.drawer = false;
      console.log("New path clicked");
      console.log(path);
    },
    logout() {
      localStorage.clear();
      this.$router.push("/");
      window.location.reload();
    },
  },
};
</script>
<style>
.toolbar-color {
  background-color: #0d97f4 !important;
}

.icon-color .v-btn__content {
  color: #ffffff;
}

.icon-flipped {
  transform: scaleX(-1);
  -moz-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -ms-transform: scaleX(-1);
}
</style>