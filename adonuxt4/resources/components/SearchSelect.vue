<template>
  <div>
    <multiselect
      v-model="selectedItem"
      :options="items"
      :loading="isLoading"
      :internal-search="false"
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
import _ from 'lodash'


export default {
  name : 'search-select',
  props: ['id','api','initSelect'],
  components : {
    Multiselect,
  },
  data : () => {
    return {
      items : [],
      selectedItem : this.initSelect || null,
      isLoading : false,
    }
  },
  async mounted() {
    await this.getItems()
    if(this.initSelect){
      this.selectedItem = this.initSelect
    }
  },
  methods : {
    selectItem (item) {
      if(item){
        this.$emit('select', item.id, item)
      }
    },
    searchItem : _.debounce(async function(searchText) {
      if(searchText){
        this.isLoading = true
        await this.getItems(searchText)
        this.isLoading = false
      }
    }, 600),
    async getItems (searchText) {
      var params = {}
      if(searchText){
        params.search = searchText
      }
      let data = await this.$axios.$get(this.api, {params})
      this.items = data
    }
  },
  // watch : {
  //   initSelect : function () {
  //     console.log('watch initSelect')
  //     this.items.push(this.initSelect)
  //     this.selectedItem = this.initSelect
  //   }
  // }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

