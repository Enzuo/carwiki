<template>
  <div>
    <search-select
      @select="selectEngine"
    >
    </search-select>
    <nuxt-child/>
  </div>
</template>

<script>
import SearchSelect from '~/components/SearchSelect'


export default {
  components : {
    SearchSelect
  },
  methods : {
    selectEngine (id) {
      console.log('route re push ', id)
      this.$router.push({ path: `/engine/${id}`})
    }
  }
}
</script>

<style scoped>

</style>
