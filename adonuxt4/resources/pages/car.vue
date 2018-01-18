<template>
  <div>
    <search-select
      @select="selectCar"
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
      this.$router.push({ path: `/car/${id}`})
    }
  },
}
</script>

<style scoped>

</style>
