<template>
  <div>
    <search-select
      @select="selectEngine"
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
      this.$router.push({ path: `/engine/${id}`})
    }
  }
}
</script>

<style scoped>

</style>
