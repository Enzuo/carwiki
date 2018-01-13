<template>
  <div>
    <search-select
      v-if="edit"
      @select="selectEngine"
      api="engines"
      :preSelect="engine"
    >
    </search-select>
    <v-btn v-else flat color="primary" :href="'/engine/'+engine.id">{{ engine.name }}</v-btn>
  </div>
</template>

<script>
import SearchSelect from '~/components/SearchSelect'
import Vue from 'vue'

export default {
  props : { engine : Object, edit : Boolean },
  components : { SearchSelect },
  methods : {
    selectEngine (id, engine) {
      Vue.set(this.engine, engine)
    }
  }
}
</script>

<style scoped>

</style>
