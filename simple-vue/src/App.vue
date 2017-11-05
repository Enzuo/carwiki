<template>
  <div id="app">
    <vue-tabs>
      <v-tab title="Power curve">
        <engine-graph
          :engines="engines"
        ></engine-graph>
      </v-tab>
  
      <v-tab title="Situations power curves">
        <car-power-graph
          :cars="cars"
          :minSpeed="20"
          :maxSpeed="120"
        ></car-power-graph>       
      </v-tab>
  
      <v-tab title="Car list details">
        <car-list
          :cars="cars"
          v-on:colorChange="colorChange"
          @gearChange="gearChange"
        ></car-list>
      </v-tab>
    </vue-tabs>    
  </div>
</template>

<script>
import Vue from 'vue'
import VueCharts from 'vue-charts'
import {VueTabs, VTab} from 'vue-nav-tabs'
import EngineGraph from './components/EngineGraph.vue'
import CarPowerGraph from './components/CarPowerGraph.vue'
import CarList from './components/CarList.vue'
import data from './data.js'

var selectedCars = []
selectedCars.push(data.cars[0])
selectedCars.push(data.cars[1])
selectedCars.push(data.cars[2])
selectedCars[0].color = '#3366cc'
selectedCars[1].color = '#dc3912'
selectedCars[2].color = '#ff9900'


export default {
  name: 'app',
  components : {
    VueTabs,
    VTab,
    EngineGraph,
    CarList,
    CarPowerGraph,
  },
  data () {
    return {
      cars : selectedCars,
    }
  },
  computed : {
    engines : function(){
      return this.cars.map((car) => { 
        var engine = car.engine
        engine.color = car.color 
        return engine 
      })
    },
  },
  methods : {
    colorChange : function(event){
      var newVal = Object.assign({}, this.cars[event.index], {color: event.color})
      Vue.set(this.cars, event.index, newVal)
    },
    gearChange : function(event){
      var newVal = Object.assign({}, this.cars[event.index], {selectedGear: event.selectedGear})
      Vue.set(this.cars, event.index, newVal)
    }
  }
}
</script>

<style>

</style>

<style src='vue-nav-tabs/themes/vue-tabs.css'></style>
