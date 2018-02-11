<template>
  <div>
    <search-select
      @select="selectEngine"
      createPath="/edit/engine"
      api="engines"
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
      if(!id){
        return this.$router.push({ path: `/engine`})
      }
      this.$router.push({ path: `/engine/${id}`})
    }
  }
}
</script>

<style scoped>

</style>
