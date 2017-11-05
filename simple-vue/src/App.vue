<template>
  <div id="app">
    <vue-tabs>
      <v-tab title="First tab">
        {{msg}}
        <engine-graph
          :engines="engines"
        ></engine-graph>
      </v-tab>
  
      <v-tab title="Power curve">
        <!--<vue-chart    
          :columns="columns"    
          :rows="rows"    
          :options="options"        
        ></vue-chart>   -->          
      </v-tab>
  
      <v-tab title="Third tab">
        Third tab content
      </v-tab>
    </vue-tabs>    
    <car-list
      :cars="cars"
    ></car-list>
  </div>
</template>

<script>
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
      msg: 'Welcome to Your Vue.js App',
      cars : selectedCars,
      engines: selectedCars.map((car) => { 
        var engine = car.engine
        engine.color = car.color 
        return engine 
      }),
    }
  },
  
}
</script>

<style>

</style>

<style src='vue-nav-tabs/themes/vue-tabs.css'></style>
