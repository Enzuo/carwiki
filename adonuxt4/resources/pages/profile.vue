<template>
  <div>
    {{authUser.email}}
    {{authUser.full_name}}
    <v-btn @click="logout">Logout</v-btn>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  mounted () {
  },
  fetch ({ store, redirect  }) {
    if(!store.state.authUser){
      return redirect('/login')
    }
  },
  computed : {
    ...mapState({
      authUser : 'authUser'
    })
  },
  methods : {
    async logout () {
      try {
        await this.$store.dispatch('logout')
        this.$router.push('/')
      }
      catch(e){
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
