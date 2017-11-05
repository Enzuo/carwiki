<template>
    <div id="car-list">
        <ul>
            <li v-for="(car, index) in cars" :key="index" :style="{'background-color': car.color}">
                Name : {{ car.name }}
                <div v-on:click="changeGear(index)">SelectedGear : {{ romanize(car.selectedGear) }}</div>
                <compact-picker :value="{'hex' : car.color }" :palette="palette" v-on:input="changeColor(index, $event)" ></compact-picker>
            </li>
        </ul>
    </div>
</template>

<script>
import {Compact} from 'vue-color'
import {romanize} from '../helpers.js'

export default {
    name : 'car-list',
    components : {
        'compact-picker': Compact,
    },
    props : {
        cars : {
            type : Array 
        },
    },
    data () {
        return {
            palette : [
                "#3366cc","#dc3912","#ff9900","#109618",
                "#990099","#0099c6","#dd4477","#66aa00",
                "#b82e2e","#316395","#994499","#22aa99",
                "#aaaa11","#6633cc","#e67300","#8b0707",
                "#651067","#329262","#5574a6","#3b3eac",
                "#b77322","#16d620","#b91383","#f4359e",
                "#9c5935","#a9c413","#2a778d","#668d1c",
                "#bea413","#0c5922","#743411"
            ],
            romanize : romanize,
        }
    },
    methods : {
        changeColor : function(index, col) {
            this.$emit('colorChange',{index, color:col.hex})
        },
        changeGear : function(index) {
            var car = this.cars[index]
            var selectedGear = car.selectedGear || 3
            selectedGear += 1
            if(selectedGear > car.gearRatio.length){
                selectedGear = 1
            }
            this.$emit('gearChange', {index, selectedGear})
        },
    },
}
</script>