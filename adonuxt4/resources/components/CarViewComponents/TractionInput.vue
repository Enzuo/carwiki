<template>
  <div>
    <v-select v-if="edit"
      v-bind:items="tractionsTypes"
      :value="value"
      @input="$emit('input', $event)"
      item-text="label"
      item-value="id"
      label="Select"
      single-line
      clearable
      auto
      :hint="getTractionById(value).title"
      persistent-hint
    >
      <template slot="item" scope="data">
        <span>{{data.item.label}}</span><span style="padding-left:5px" class="caption">- {{data.item.title}}</span>
      </template>
    </v-select>
    <div v-else>
      {{ traction }}
    </div>
  </div>
</template>

<script>
const tractionsTypes = [
  { id : 1, label : 'FWD', title : 'forward wheel drive'},
  { id : 2, label : 'RWD', title : 'rear wheel drive'},
  { id : 3, label : 'AWD', title : 'all wheel drive'},
]
export default {
  props : { value : Number, edit : Boolean },
  data : function () {
    return {
      tractionsTypes
    }
  },
  computed : {
    traction : function () {
      var o = this.getTractionById(this.value)
      return o ? o.label : null
    }
  },
  methods : {
    getTractionById : function (id) {
      return this.tractionsTypes.find( function(type) {
        if(type.id === id){
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
