<template>
  <div>
    <div v-if="car">
      {{car.name}}

      <v-btn
          color="blue"
          dark fab fixed bottom right
          @click="addToBasket(car)"
        >
        <v-icon>add</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import { mapMutations } from 'vuex'


export default {
  validate : ({params}) => {
    return /^\d+$/.test(params.id) || !params.id
  },
  async asyncData ({ params, store }) {
    let car = null
    if(params.id){
      let { data } = await axios.get(`cars/${params.id}`)
      car = data
    }
    store.commit('setCurrentCar', params.id)
    return { car }
  },
  methods : {
    ...mapMutations([
      'addToBasket',
    ])
  }
}
</script>

<style scoped>

</style>
