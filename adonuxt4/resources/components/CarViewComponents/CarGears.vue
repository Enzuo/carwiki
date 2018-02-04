<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="gears"
      hide-actions
      item-key="name"
    >
      <template :slot="edit ? 'headers' : ''" slot-scope="props">
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
      <template :slot="edit ? 'items' : ''" slot-scope="props">
        <td><input size="2" :value="props.item.gear"></td>
        <td class="text-xs-right"><input size="4" :value="props.item.rpm" @input="changeRPM($event.target.value, props.index)"></td>
        <td class="text-xs-right"><input size="5" :value="props.item.speed" @change="changeSpeed($event.target.value, props.index)"></td>
        <td class="text-xs-right"><input size="5" :value="props.item.ratio" @change="changeRatio($event.target.value, props.index)"></td>
        <td><v-btn flat icon @click="deleteRow(props.index)"><v-icon>delete</v-icon></v-btn></td>
      </template>
      <template :slot="edit ? '' : 'items'" slot-scope="props">
        <td>{{props.item.gear}}</td>
        <td class="text-xs-right"><input size="4" :value="props.item.rpm" @input="changeRPM($event.target.value, props.index)"></td>
        <td class="text-xs-right">{{props.item.speed}}</td>
        <td class="text-xs-right">{{props.item.ratio}}</td>
      </template>
      <template v-if="edit" slot="footer">
        <td colspan="100%">
          <v-btn flat @click="add"><v-icon>add</v-icon></v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props : { car : Object, edit : Boolean },
  data : function () {
    var gearRatios = this.car.gearRatio
    var rpms = []
    for(var i=0; i<gearRatios.length; i++){
      rpms.push(1000)
    }
    return {
      isRatioLocked : false,
      isSpeedLocked : false,
      refRatio : gearRatios[gearRatios.length-1] * this.car.gearSpeed,
      rpms
    }
  },
  computed : {
    gears : function () {
      var gearRatios = this.car.gearRatio
      var datas = []
      for(var i=0; i<gearRatios.length; i++){
        var rpm = this.rpms[i]
        var speed = 1/gearRatios[i] * this.refRatio
        var gearData = {
          gear : i,
          rpm : rpm,
          speed : parseFloat(speed * (rpm / 1000)).toFixed(1),
          baseSpeed : parseFloat(speed).toFixed(1),
          ratio : parseFloat(gearRatios[i]).toFixed(3)
        }
        datas.push(gearData)
      }
      return datas
    },
    headers : function () {
      return  [
        {text: 'Gear', align: 'left', sortable: false, value: 'name'},
        {text: 'Rpm', align: 'right', sortable: false, value: 'rpm'},
        {text: 'Speed (km/h)', align: 'right', sortable: false, lockable: true, value: 'speed', active : this.isSpeedLocked},
        {text: 'Ratio', align: 'right', sortable: false, lockable: true, value: 'ratio', active : this.isRatioLocked},
      ]
    }
  },
  methods : {
    changeRPM : function (value, index) {
      Vue.set(this.rpms, index, value)
    },
    changeRatio : function (newRatio, index) {
      newRatio = parseFloat(newRatio) || 0.1

      if(this.isSpeedLocked){
        var newRefRatio = newRatio * this.gears[index].baseSpeed
        for(var i=0; i<this.car.gearRatio.length; i++){
          var speed = this.gears[i].baseSpeed
          this.car.gearRatio[i] = newRefRatio*1/speed
        }
        this.refRatio = newRefRatio
        return
      }

      Vue.set(this.car.gearRatio, index, newRatio)

      if(index === this.car.gearRatio.length-1){
        this.car.gearSpeed = 1/newRatio * this.refRatio
      }
    },
    changeSpeed : function (speed, index) {
      var rpm = this.rpms[index]
      speed = parseFloat(speed) / (rpm/1000) || 1
      if(speed < 1){
        speed = 1
      }

      if(this.isRatioLocked){
        this.refRatio = this.car.gearRatio[index] * speed
        return
      }

      var newRatio = this.refRatio * 1/speed
      Vue.set(this.car.gearRatio, index, newRatio)

      if(index === this.car.gearRatio.length-1){
        this.car.gearSpeed = speed
      }
    },
    add : function () {
      var gearRatio = this.car.gearRatio
      var defaultRatio = gearRatio.length ? gearRatio[gearRatio.length-1] : 1

      this.rpms.push(1000)
      this.car.gearRatio.push([defaultRatio])
    },
    deleteRow : function (index) {
      var gears = this.gears
      // last gear
      if(index === gears.length-1){
        if(gears.length >= 2){
          this.car.gearSpeed = gears[gears.length-2].baseSpeed
        }
      }
      this.rpms.splice(index, 1)
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
