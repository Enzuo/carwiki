<template>
    <div id="car-list">
        <ul>
            <li v-for="(car, index) in carsWithColor" :key="index" :style="{'background-color': car.colorObj.hex}">
                {{ car.name }}
                <compact-picker :value="car.colorObj" :palette="palette" v-on:input="updateValue(index, $event)" ></compact-picker>
            </li>
        </ul>
    </div>
</template>

<script>
import {Compact} from 'vue-color'
import Vue from 'vue'

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
            carsWithColor : this.cars.map((car) =>{
                car.colorObj = {}
                car.colorObj.hex = car.color
                return car
            }),
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
        }
    },
    methods : {
        updateValue : function(index, col) {
            var newVal = Object.assign({}, this.carsWithColor[index], {colorObj: col})
            Vue.set(this.carsWithColor, index, newVal)
        },
    },
}
</script>