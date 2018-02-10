<template>
  <div>
    <v-layout row>
    <multiselect
      v-model="selectedItem"
      :options="items"
      :loading="isLoading"
      :internal-search="false"
      :clearOnSelect="true"
      :preserveSearch="true"
      :placeholder="search"
      @input="selectItem"
      @search-change="searchItem"
      label="name"
      track-by="name"
    >
      <template slot="noResult">Not found, <button>create one </button>?</template>
    </multiselect>
    <v-btn icon v-if="search && search.length > 4 && search !== 'Search'">
      <v-icon>
        control_point
      </v-icon>
    </v-btn>
    </v-layout>
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
      search : 'Search', // also placeholder
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
      this.$emit('select', item ? item.id : null, item)
    },
    searchItem : async function (searchText) {
      this.search = searchText || 'Search'
      await this.searchItemDebounce(searchText)
    },
    searchItemDebounce : _.debounce(async function(searchText) {
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

