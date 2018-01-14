<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="gears"
      hide-actions
      item-key="name"
    >
      <template :slot="edit ? 'headers' : ''" scope="props">
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
      <template :slot="edit ? 'items' : ''" scope="props">
        <td><input size="2" :value="props.item.gear"></td>
        <td class="text-xs-right"><input size="4" :value="props.item.rpm" @input="changeRPM($event.target.value, props.index)"></td>
        <td class="text-xs-right"><input size="5" :value="props.item.speed" @change="changeSpeed($event.target.value, props.index)"></td>
        <td class="text-xs-right"><input size="5" :value="props.item.ratio" @change="changeRatio($event.target.value, props.index)"></td>
        <td><v-btn flat icon @click="deleteRow(props.index)"><v-icon>delete</v-icon></v-btn></td>
      </template>
      <template :slot="edit ? '' : 'items'" scope="props">
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
        var speed = (maxGearRatio / currentGearRatio * maxGearSpeed)
        var gearData = {
          gear : i,
          rpm : rpm,
          speed : parseFloat(speed * (rpm / 1000)).toFixed(1),
          baseSpeed : parseFloat(speed).toFixed(1),
          ratio : parseFloat(currentGearRatio).toFixed(3)
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
      var gearRatio = this.car.gearRatio
      var maxGearRatio = gearRatio[gearRatio.length-1]
      var maxGearSpeed = this.car.gearSpeed

      // speed locked behavior : change all the ratios
      // according to the new Ratio and the current speeds
      if(this.isSpeedLocked){
        var refSpeed = this.gears[index].baseSpeed
        for(var i=0; i<gearRatio.length; i++){
          var speed = this.gears[i].baseSpeed
          var ratio = refSpeed / speed * newRatio
          this.car.gearRatio[i] = ratio
        }
        // Actually just to refresh once the calculations are done
        Vue.set(this.car.gearRatio, index, newRatio)
        return
      }

      // default behavior : just change ratio, it'll change the speed as a result
      if(!this.isSpeedLocked){
        Vue.set(this.car.gearRatio, index, newRatio)
      }

      // last gear : change ref speed
      if(index === gearRatio.length-1){
        var speed = maxGearRatio / newRatio * maxGearSpeed
        this.car.gearSpeed = speed
      }
    },
    changeSpeed : function (speed, index) {
      var rpm = this.rpms[index]
      speed = parseFloat(speed) / (rpm/1000) || 1
      if(speed < 1){
        speed = 1
      }
      var gearRatio = this.car.gearRatio
      var maxGearRatio = gearRatio[gearRatio.length-1]
      var maxGearSpeed = this.car.gearSpeed

      // last gear also always affect ref speed
      if(index === gearRatio.length-1){
        this.car.gearSpeed = speed
      }

      // one line behavior : change ref speed and that's all
      if(!(gearRatio.length > 1)){
        return
      }

      // default behavior : change gear ratio according to new speed ()
      if(!this.isRatioLocked){
        var newRatio = (maxGearSpeed/(speed / maxGearRatio)) //* (rpm / 1000)
        Vue.set(this.car.gearRatio, index, newRatio)
      }

      // gear column locked behavior : change ref speed according to new speed using gear ratios
      if(this.isRatioLocked && index !== gearRatio.length-1){
        var currentGearRatio = gearRatio[index]
        var speedForMaxGear = speed * (currentGearRatio / maxGearRatio )
        this.car.gearSpeed = speedForMaxGear
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
