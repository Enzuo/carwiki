<template>
  <div>
    hi
    <!-- <no-ssr>
      <model-list-select
        :list="engines"
        option-value="id"
        v-model="selectedEngine"
        placeholder="select item"
        @searchchange="searchEngine">
      </model-list-select>
    </no-ssr> -->
    <multiselect
      v-model="selectedEngine"
      :options="engines"
      placeholder="Search"
      @input="selectEngine"
      @search-change="searchEngine"
      label="name"
      track-by="name"
    >
    </multiselect>
  </div>
</template>


<script>
import axios from '~/plugins/axios'
// import { ModelListSelect } from 'vue-search-select'
import Multiselect from 'vue-multiselect'

export default {
  name : 'search-select',
  props: ['id','params'],
  components : {
    // ModelListSelect,
    Multiselect,
  },
  data : () => {
    return {
      engines : [],
      selectedEngine : null,
    }
  },
  mounted() {
    this.getEngines()
  },
  methods : {
    selectEngine (engine) {
      console.log('select', engine)
      this.$emit('select', engine.id)
    },
    searchEngine : async(searchText) => {

    },
    async getEngines () {
      let { data } = await axios.get('engines')
      this.engines = data
    }
  }
}
</script>
