<template>
    <div>
        Engine name : {{engine.name}}
        <table>
            <tr>
                <th>RPM</th>
                <th>Torque (NM)</th>
                <th>Horsepower (PS)</th>
            </tr>
            <tr v-for="(torque, index) in engine.torque" :key="index">
                <td><input v-model.number.lazy="torque[0]"/></td>
                <td><input v-model.number.lazy="torque[1]"/></td>
                <td><input 
                    :value="torqueToPS(torque[1], torque[0]).toFixed(1)" 
                    v-on:input="torque[1] = PSToTorque(parseInt($event.target.value), torque[0])"
                /></td>
                <td><button v-on:click="deleteRow(index)">-</button></td>
            </tr>
        </table>
        <button v-on:click="addRow">+</button>
    </div>
</template>

<script>
import {torqueToPS, PSToTorque, getTypicalRPMInterval} from '../helpers.js'

export default {
    name : 'engine-edit',
    data : function(){
        return {
            torqueToPS, PSToTorque
        }
    },
	props : {
		engine : {
			required: true,
			type: Object
		},
    },
    methods : {
        deleteRow : function(index){
            this.engine.torque.splice(index,1)
        },
        addRow : function(index){
            var torqueArr = this.engine.torque
            var interval = getTypicalRPMInterval(torqueArr, 50)
            var rpm = torqueArr.length ? torqueArr[torqueArr.length-1][0] + interval : 1000
            torqueArr.push([rpm, 0])
        },
    }
}
</script>
