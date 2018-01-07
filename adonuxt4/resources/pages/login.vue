<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onLogin">
                <div>{{error}}</div>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      :autofocus="true"
                      type="email"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit">Login</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
            <a href="/register">register</a>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  computed: {
    user () {
      return this.$store.state.authUser
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    },
    email(value) {
      this.error = null
    },
    password(value) {
      this.error = null
    }
  },
  methods: {
    async onLogin () {
      try {
        await this.$store.dispatch('login', {email: this.email, password: this.password})
      }
      catch(e){
        this.error = e
      }
    }
  }
}
</script>

<style scoped>

</style>
