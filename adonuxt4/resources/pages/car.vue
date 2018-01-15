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
      this.$router.go({ path: `/car/${id}`})
    }
  },
}
</script>

<style scoped>

</style>
