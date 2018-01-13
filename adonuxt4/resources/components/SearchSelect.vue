<template>
  <div>
    <multiselect
      v-model="selectedItem"
      :options="items"
      placeholder="Search"
      @input="selectItem"
      @search-change="searchItem"
      label="name"
      track-by="name"
    >
      <template slot="noResult">Not found, <button>create one </button>?</template>
    </multiselect>
  </div>
</template>


<script>
import axios from '~/plugins/axios'
import Multiselect from 'vue-multiselect'

export default {
  name : 'search-select',
  props: ['id','params','api','preSelect'],
  components : {
    Multiselect,
  },
  data : () => {
    return {
      items : [],
      selectedItem : this.preSelect || null,
    }
  },
  mounted() {
    this.getItems()
  },
  methods : {
    selectItem (item) {
      if(item){
        this.$emit('select', item.id, item)
      }
      console.log(this.selectedItem)
    },
    searchItem : async(searchText) => {

    },
    async getItems () {
      let data = await this.$axios.$get(this.api)
      this.items = data
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

