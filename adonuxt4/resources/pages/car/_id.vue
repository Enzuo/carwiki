<template>
  <v-container page>
    <div v-if="car">
      <h1>{{car.name}}</h1>
      <car-view :car="car"></car-view>

      <action-buttons :actions="actions"></action-buttons>
    </div>

  </v-container>
</template>

<script>
import axios from '~/plugins/axios'
import { mapMutations } from 'vuex'
import CarEco from '~/components/CarEco'
import CarView from '~/components/CarView'
import ActionButtons from '~/components/ActionButtons'


export default {
  components : {
    CarEco,
    CarView,
    ActionButtons
  },
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
  computed : {
    actions : function () {
      return [
        {icon : 'edit', to : '/edit/car/'+(this.car ? this.car.id : null), disabled : !this.$store.state.authUser},
        {icon : 'shopping_cart', click : () => { this.addToBasket(this.car) } }
      ]
    }
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
