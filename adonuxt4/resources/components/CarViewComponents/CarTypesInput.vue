<template>
  <div>
    <v-select v-if="edit"
      v-bind:items="items"
      :value="value"
      @input="$emit('input', $event)"
      item-text="label"
      item-value="id"
      label="Select"
      single-line
      clearable
      auto
      :hint="selectedItemTitle"
      persistent-hint
    >
      <template slot="item" scope="data">
        <span>{{data.item.label}}</span><span v-if="data.item.title" style="padding-left:5px" class="caption">- {{data.item.title}}</span>
      </template>
    </v-select>
    <div v-else>
      {{ selectedItemLabel }}
    </div>
  </div>
</template>

<script>
const tractionsTypes = [
  { id : 1, label : 'FWD', title : 'forward wheel drive'},
  { id : 2, label : 'RWD', title : 'rear wheel drive'},
  { id : 3, label : 'AWD', title : 'all wheel drive'},
]

const transmissionsTypes = [
  { id : 1, label : 'Manual' },
  { id : 2, label : 'Automatic'},
]
export default {
  props : { value : Number, edit : Boolean, type : String },
  data : function () {
    var items = tractionsTypes
    if(this.type === 'transmission'){
      items = transmissionsTypes
    }
    return {
      items
    }
  },
  computed : {
    selectedItemLabel : function () {
      var o = this.getItemById(this.value)
      return o ? o.label : null
    },
    selectedItemTitle : function () {
      var o = this.getItemById(this.value)
      return o ? o.title : null
    }
  },
  methods : {
    getItemById : function (id) {
      return this.items.find( function(item) {
        if(item.id === id){
          return true
        }
        return false
      })
    }
  }
}
</script>

<style scoped>

</style>
