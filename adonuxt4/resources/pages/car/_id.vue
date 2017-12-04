<template>
  <div>
    {{car.name}}
  </div>
</template>

<script>
import axios from '~/plugins/axios'

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
}
</script>

<style scoped>

</style>
