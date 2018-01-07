<template>
  <div>
    Login out...
  </div>
</template>

<script>
  export default {
    mounted () {
      this.logout()
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
