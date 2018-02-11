<template>
  <div>
    <search-select
      @select="selectCar"
      createPath="/edit/car"
      api="cars"
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
    selectCar (id) {
      if(!id){
        return this.$router.push({ path: `/car`})
      }
      this.$router.push({ path: `/car/${id}`})
    }
  },
}
</script>

<style scoped>

</style>
