<template>
  <v-app>
    <v-main class="main-background" style="padding: 0px">
      <v-row
        row
        style="
          display: flex;
          height: 100vh;
          width: 100vw;
          justify-content: center;
        "
      >
        <v-col
          class="mx-auto my-auto"
          cols="12"
          xs="12"
          sm="12"
          md="6"
          lg="4"
          xl="4"
        >
          <v-card
            outlined
            shaped
            style="box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px"
          >
            <v-card-title class="text-xs-right">
              <span class="text-xs-right main-title ml-2 mb-n3">Sondhana</span>
            </v-card-title>
            <v-card-text>
              <div class="text-xs-center"></div>
              <v-container grid-list-xl>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-row row wrap>
                    <v-col md12 xs12 class="pb-0" md="12" cols="12">
                      <span>Email</span>
                      <v-text-field
                        v-model="email"
                        type="email"
                        outlined
                        required
                        dense
                        placeholder="e.g. johndoe@email.com"
                        :rules="emailRules"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-spacer> </v-spacer>

                  <v-row>
                    <v-col md12 xs12 class="pb-0">
                      <span>Password</span>
                      <v-text-field
                        v-model="password"
                        outlined
                        type="password"
                        required
                        dense
                        placeholder="e.g. 1-9/a-z/A-Z/!-+"
                        :rules="passwordRules"
                        v-on:keyup.enter="accessLogin"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
                <v-alert
                  border="left"
                  color="red"
                  dense
                  v-if="errorSnackBar"
                  icon="mdi-alert"
                  transition="scale-transition"
                  text
                  type="warning"
                  class="mt-4"
                  style="border-radius: 0"
                  >Email or Password maybe wrong</v-alert
                >
                <small>*indicates required field</small>
                <div class="text-xs-right">
                  <v-btn
                    color="primary"
                    block
                    :disabled="loading"
                    @click="validation()"
                  >
                    <span v-if="loading">Loading</span>
                    <span v-if="!loading">Login</span></v-btn
                  >
                </div>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-main>

    <v-main v-if="login === 'Success'" style="background: rgb(245, 246, 250)">
      <app-header v-if="login === 'Success'"></app-header>
      <v-container fluid style="background: rgb(245, 246, 250)">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import LoginService from "../services/LoginService";
export default {
  name: "Login",
  components: {},
  data: () => ({
    loading: false,
    login: false,
    email: "",
    password: "",
    emailRules: [
      (v) => !!v || "Email is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [(v) => !!v || "Password is required"],
    valid: false,
    errorSnackBar: false,
  }),
  methods: {
    async accessLogin() {
      this.loading = true;
      let formObj = {
        email: this.email,
        password: this.password,
      };
      await LoginService.handleLogin(formObj).then((res) => {
        if (res == "success") {
          this.loading = false;
          this.$router.push("/project-create");
        } else {
          this.loading = false;
          this.errorSnackBar = true;
        }
      });
    },
    validation() {
      if (this.$refs.form.validate()) {
        this.valid = true;
        this.accessLogin();
      } else {
        this.valid = false;
      }
    },
  },
};
</script>

<style>
.v-main .element-style{
    padding: 0px;
}
.main-background {
  background: rgb(5, 56, 107);
  background: linear-gradient(
    148deg,
    rgba(5, 56, 107, 1) 0%,
    rgba(55, 150, 131, 1) 62%,
    rgba(92, 219, 149, 1) 100%
  );
}
.main-title {
  font-family: "Lexend Deca", sans-serif;
  font-size: 1.5rem;
}
</style>
>