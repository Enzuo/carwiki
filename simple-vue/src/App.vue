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

    <router-link to="/engine-edit">Go to Engine Edit</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import VueCharts from 'vue-charts'
import {VueTabs, VTab} from 'vue-nav-tabs'
import EngineGraph from './components/EngineGraph.vue'
import EngineEdit from './components/EngineEdit.vue'
import CarPowerGraph from './components/CarPowerGraph.vue'
import CarList from './components/CarList.vue'
import data from './data.js'

import VueRouter from 'vue-router'

import Vuex from 'vuex'

Vue.use(Vuex)

Vue.use(VueRouter)

var selectedCars = []
selectedCars.push(data.cars[0])
selectedCars.push(data.cars[1])
selectedCars.push(data.cars[2])
selectedCars[0].color = '#3366cc'
selectedCars[1].color = '#dc3912'
selectedCars[2].color = '#ff9900'

const EnginePage = {
  data : () => {
    return {
      engine : selectedCars[0].engine
    }
  },
  components : { EngineEdit },
  template: '<engine-edit :engine="engine"></engine-edit>' 
}

const routes = [
  { path: '/engine-edit', component: EnginePage },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

/*============================
           Store
============================*/

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})


export default {
  name: 'app',
  router : router,
  components : {
    VueTabs,
    VTab,
    EngineGraph,
    CarList,
    CarPowerGraph,
    EngineEdit,
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
