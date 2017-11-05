<template>
  <div id="app">
    <vue-tabs>
      <v-tab title="Power curve">
        <engine-graph
          :engines="engines"
        ></engine-graph>
      </v-tab>
  
      <v-tab title="Situations power curves">
        <!--<vue-chart    
          :columns="columns"    
          :rows="rows"    
          :options="options"        
        ></vue-chart>   -->          
      </v-tab>
  
      <v-tab title="Car list details">
        <car-list
          :cars="cars"
          v-on:colorChange="colorChange"
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
import CarList from './components/CarList.vue'
import data from './data.js'

var selectedCars = []
selectedCars.push(data.cars[0])
selectedCars.push(data.cars[1])
selectedCars[0].color = '#3366cc'
selectedCars[1].color = '#dc3912'

export default {
  name: 'app',
  components : {
    VueTabs,
    VTab,
    EngineGraph,
    CarList,
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
      console.log(event)
      var newVal = Object.assign({}, this.cars[event.index], {color: event.color})
      Vue.set(this.cars, event.index, newVal)
    }
  }
}
</script>

<style>

</style>

<style src='vue-nav-tabs/themes/vue-tabs.css'></style>
