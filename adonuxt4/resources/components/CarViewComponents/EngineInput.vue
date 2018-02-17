<template>
  <div>
    <search-select
      v-if="edit"
      @select="selectEngine"
      api="engines"
      :initSelect="value"
    >
    </search-select>
    <v-btn v-else-if="value" flat color="primary" :to="'/engine/'+value.id">{{ value.name }}</v-btn>
    <div v-else>-</div>
  </div>
</template>

<script>
import SearchSelect from '~/components/SearchSelect'
import Vue from 'vue'

export default {
  props : { value : Object, edit : Boolean },
  components : { SearchSelect },
  methods : {
    async selectEngine (id, engine) {
      if(id){
        engine = await this.$axios.$get(`engines/${id}`)
      }
      this.$emit('input', engine)
    }
  }
}
</script>

<style scoped>

</style>
