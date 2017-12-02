<template>
  <div>
    <v-text-field
      label="Name"
      :rules="[(v) => v.length <= 25 || 'Max 25 characters']"
      :counter="25"
      v-model="engine.name"
    ></v-text-field>
    <table>
      <thead>
        <tr>
            <th>RPM</th>
            <th>Torque (NM)</th>
            <th>Horsepower (PS)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(torque, index) in engine.profile" :key="index">
            <td><input v-model.number.lazy="torque[0]"/></td>
            <td><input v-model.number.lazy="torque[1]"/></td>
            <td><input
                :value="torqueToPS(torque[1], torque[0]).toFixed(1)"
                v-on:input="torque[1] = PSToTorque(parseInt($event.target.value), torque[0])"
            /></td>
            <td><button v-on:click="deleteRow(index)">-</button></td>
        </tr>
      </tbody>
    </table>
    <button v-on:click="addRow">+</button>
  </div>
</template>

<script>
import {torqueToPS, PSToTorque, getTypicalRPMInterval} from "~/../app/Helpers/helpers"

export default {
  name : 'engine-edit',
  props : ['engine'],
  data : () => {
    return { torqueToPS, PSToTorque }
  },
  methods : {
    deleteRow : function(index){
        this.engine.profile.splice(index,1)
    },
    addRow : function(index){
        var torqueArr = this.engine.profile
        var interval = getTypicalRPMInterval(torqueArr, 50)
        var rpm = torqueArr.length ? torqueArr[torqueArr.length-1][0] + interval : 1000
        torqueArr.push([rpm, 0])
    },
  }
}
</script>

<style scoped>

</style>
