<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="gears"
      hide-actions
      item-key="name"
    >
      <template slot="headers" scope="props">
        <tr>
          <th v-for="header in props.headers" :key="header.text"
              :class="['column',
                header.lockable ? 'sortable' : '',
                header.active ? 'active' : '',
                header.align === 'left' ? 'text-xs-left' : '',
              ]"
              @click="lockColumn(header.value)"
          >
            <v-icon v-if="header.lockable && (!header.align || header.align === 'right')">lock</v-icon>
            {{ header.text }}
            <v-icon v-if="header.lockable && header.align === 'left'">lock</v-icon>
          </th>
        </tr>
      </template>
      <template slot="items" scope="props">
        <td><input :value="props.item.gear"></td>
        <td class="text-xs-right"><input :value="props.item.rpm" @input="changeRPM($event.target.value, props.index)"></td>
        <td class="text-xs-right"><input :value="props.item.speed" @change="changeSpeed($event.target.value, props.index)"></td>
        <td class="text-xs-right"><input :value="props.item.ratio" @change="changeRatio($event.target.value, props.index)"></td>
        <td><v-btn flat icon @click="deleteRow(props.index)"><v-icon>delete</v-icon></v-btn></td>
      </template>
      <template slot="footer">
        <td colspan="100%">
          <v-btn flat icon @click="add"><v-icon>add</v-icon></v-btn>
        </td>
      </template>
    </v-data-table>
    {{ isRatioLocked }}
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props : ['car'],
  data : function () {
    var rpms = []
    for(var i=0; i<this.car.gearRatio.length; i++){
      rpms.push(1000)
    }
    return {
      isRatioLocked : false,
      isSpeedLocked : false,
      rpms
    }
  },
  computed : {
    gears : function () {
      var gearRatio = this.car.gearRatio
      var maxGearSpeed = this.car.gearSpeed
      var datas = []
      for(var i=0; i<gearRatio.length; i++){
        var rpm = this.rpms[i]
        var maxGearRatio = gearRatio[gearRatio.length-1]
        var currentGearRatio = gearRatio[i]
        var speedForRPM = (maxGearRatio / currentGearRatio * maxGearSpeed) * (rpm / 1000)
        var gearData = {gear : i, rpm : rpm, speed : parseFloat(speedForRPM).toFixed(1), ratio : parseFloat(currentGearRatio).toFixed(3)}
        datas.push(gearData)
      }
      return datas
    },
    headers : function () {
      return  [
        {text: 'Gear', align: 'left', sortable: false, value: 'name'},
        {text: 'Rpm', align: 'left', sortable: false, value: 'rpm'},
        {text: 'Speed (km/h)', align: 'left', lockable: true, value: 'speed', active : this.isSpeedLocked},
        {text: 'Ratio', align: 'left', lockable: true, value: 'ratio', active : this.isRatioLocked},
      ]
    }
  },
  methods : {
    changeRPM : function (value, index) {
      Vue.set(this.rpms, index, value)
    },
    changeRatio : function (value, index) {
      Vue.set(this.car.gearRatio, index, value)
    },
    changeSpeed : function (speed, index) {
      if(parseFloat(speed) < 1){
        speed = 1
      }
      var gearRatio = this.car.gearRatio
      var rpm = this.rpms[index]
      var maxGearRatio = gearRatio[gearRatio.length-1]
      var maxGearSpeed = this.car.gearSpeed

      // not last gear
      if(index !== gearRatio.length-1){
        var newRatio = ((rpm/1000)*maxGearSpeed/(speed / maxGearRatio)) //* (rpm / 1000)
        Vue.set(this.car.gearRatio, index, newRatio)
      }

      // else last gear
      else {
        // var maxGearRatio = gearRatio[gearRatio.length-1]
        // var maxGearSpeed = this.car.gearSpeed
        // newRatio = ((rpm/1000)*maxGearSpeed/(speed / maxGearRatio)) //* (rpm / 1000)
        if(gearRatio.length > 1){
          var previousGearRPM = this.rpms[gearRatio.length-2]
          var previousGearRatio = gearRatio[gearRatio.length-2]
          var previousGearSpeed = (maxGearRatio / previousGearRatio * maxGearSpeed) * (previousGearRPM / 1000)
          var newRatio = ((rpm/1000)*maxGearSpeed/(speed / maxGearRatio)) //* (rpm / 1000)
          Vue.set(this.car.gearRatio, index, newRatio)
        }

        this.car.gearSpeed = speed / (rpm/1000)
      }
    },
    add : function () {
      var gearRatio = this.car.gearRatio
      var defaultRatio = gearRatio.length ? gearRatio[gearRatio.length-1] : 1

      this.rpms.push(1000)
      this.car.gearRatio.push([defaultRatio])
    },
    deleteRow : function (index) {
      console.log('delete ', index)
      this.car.gearRatio.splice(index, 1)
    },
    lockColumn : function (colValue) {
      // Unlock previous different locked column
      if(colValue === 'ratio'){
        this.isSpeedLocked = false
        this.isRatioLocked = this.isRatioLocked ? false : true
      }
      if(colValue === 'speed'){
        this.isRatioLocked = false
        this.isSpeedLocked = this.isSpeedLocked ? false : true
      }
    }
  }
}
</script>

<style scoped>

</style>
