<template>
  <div>
    <v-tabs v-model="active">
      <v-tabs-bar class="blue" dark>
        <v-tabs-item
          :href="'#engine'"
          ripple
        >
          Engine
        </v-tabs-item>
        <v-tabs-item
          :href="'#situations'"
          ripple
        >
          Situations
        </v-tabs-item>
        <v-tabs-slider color="white"></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content
          :id="'engine'"
        >
          <engine-graph
            :engines="engines"
          ></engine-graph>
          <div v-for="car in cars" :key="car.id">
            {{ car.name }}
          </div>
          <v-card flat>
            <v-card-text>{{ text }}</v-card-text>
          </v-card>
        </v-tabs-content>
        <v-tabs-content
          :id="'situations'"
        >
          <car-power-graph
          :cars="cars"
          :minSpeed="20"
          :maxSpeed="120">
          </car-power-graph>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>
import EngineGraph from '~/components/EngineGraph'
import PowerGraph from '~/components/PowerGraph'

export default {
  components : {
    EngineGraph,
    'car-power-graph': PowerGraph,
  },
  data : function() {
    return {
      text : 'lorem ipsum',
      active : 'engine',
    }
  },
  async asyncData ({ params, store, query }) {
    console.log(params, query);
    if(query && query.cars){
      let cars = JSON.parse(query.cars)

      let actions = []
      cars.forEach((carId) => {
        actions.push(store.dispatch('addToBasket', carId))
      })
      await Promise.all(actions)
      console.log('all cars', cars)
    }
    let cars = store.getters.carsInBasket
    return { cars }
  },
  computed : {
    engines : function () {
      return this.cars.reduce((result, car) => {
        var engine = car.engine
        if(engine){
          // TODO : it changes the store here
          engine.carWeight = car.weight
          engine.color = car.color
          result.push(engine)
        }
        return result
      }, [])
    }
  }
}
</script>

<style scoped>

</style>
