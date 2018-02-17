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
      selectLabel=""
      deselectLabel=""
      @input="selectItem"
      @search-change="searchItem"
      label="name"
      track-by="name"
    >
      <template slot="noResult">Not found, <button>create one </button>?</template>
    </multiselect>
    <v-btn icon v-if="search && search.length > 4 && search !== placeholder && createPath" @click="create">
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
  props: ['id','api','initSelect','createPath'],
  components : {
    Multiselect,
  },
  data : () => {
    return {
      items : [],
      selectedItem : this.initSelect || null,
      isLoading : false,
      placeholder : 'Search',
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
      this.search = searchText || this.placeholder
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
    },
    create : function () {
      this.$router.push({ path : this.createPath, query : {name : this.search}})
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
<style scoped>
  .multiselect .multiselect__tags {
    border-radius: 0px;
  }
</style>

