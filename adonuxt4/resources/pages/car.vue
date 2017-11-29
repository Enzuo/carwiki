<template>
  <div>
    <search-select
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
}
</script>

<style scoped>

</style>
