<template>
  <div>
    <v-layout row>
      <v-flex xs3>
        <v-text-field
          v-model.number.lazy="fromSpeed"
          label="From speed (km/h)"
        ></v-text-field>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          v-model.number.lazy="toSpeed"
          label="To speed (km/h)"
        ></v-text-field>
      </v-flex>
      <v-flex xs2>
        <v-select
          :items="availableGears"
          label="Gear"
          item-text="name"
          item-value="gear"
          v-model="gear"
        ></v-select>
      </v-flex>
      <v-flex xs4>
        <v-select
          :items="situations"
          label="Predefined situations"
          item-text="name"
          single-line
          @change="onSituationChange"
          bottom
        ></v-select>
      </v-flex>
    </v-layout>
    <power-graph
      :cars="cars"
      :fromSpeed="fromSpeed"
      :toSpeed="toSpeed">
    </power-graph>
  </div>
</template>

<script>
import PowerGraph from '~/components/PowerGraph'
import {mapMutations} from 'vuex'
import {romanize} from '~/plugins/helpers'

export default {
  name : 'car-situation-power',
  components : {
    PowerGraph
  },
  props: {
    cars: {
      required: true,
      type: Array
    },
  },
  data : () => {
    return {
      fromSpeed : 30,
      toSpeed : 50,
      gear : 4,
      situations : [
        { name : 'out of round about'       , gear : 2, fromSpeed :30,  toSpeed :50, },
        { name : 'accelerating out of town' , gear : 3, fromSpeed :50,  toSpeed :90, },
        { name : 'passing on a country road', gear : 4, fromSpeed :80,  toSpeed :100, },
        { name : 'back to speed on highway' , gear : 5, fromSpeed :110, toSpeed :130, },
        { name : 'on acceleration lane'     , gear : 4, fromSpeed :60,  toSpeed :120, },
        { name : 'on acceleration lane'     , gear : 3, fromSpeed :60,  toSpeed :110, },
        { name : 'from road to highway'     , gear : 5, fromSpeed :80,  toSpeed :120, },
      ]
    }
  },
  computed : {
    availableGears : function () {
      let maxGear = this.cars.reduce(function(a, b) {
        let aGear = a.gearRatio ? a.gearRatio.length : 0
        let bGear = b.gearRatio ? b.gearRatio.length : 0
        return Math.max(aGear, bGear);
      });
      let gears = []
      for(let i=1; i<=maxGear; i++){
        gears.push({gear:i, name:romanize(i)})
      }
      return gears
    }
  },
  watch : {
    gear : function(gear){
      this.cars.forEach((car) => {
        this.changeBasketCarGear({carId : car.id, gear })
      })
    }
  },
  methods : {
    onSituationChange (evt, data) {
      this.fromSpeed = evt.fromSpeed
      this.toSpeed = evt.toSpeed
      this.gear = evt.gear
    },
    ...mapMutations([
      'changeBasketCarGear'
    ])
  }

}
</script>

<style scoped>

</style>
