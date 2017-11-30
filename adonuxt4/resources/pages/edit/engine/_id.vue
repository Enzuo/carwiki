<template>
  <div>
    <v-text-field
      label="Name"
      :rules="[(v) => v.length <= 25 || 'Max 25 characters']"
      :counter="25"
      v-model="engine.name"
    ></v-text-field>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import EngineGraph from '~/components/EngineGraph'

export default {
  validate : ({params}) => {
    return /^\d+$/.test(params.id) || !params.id
  },
  async asyncData ({ params, store }) {
    let engine = null
    if(params.id){
      let { data } = await axios.get(`engine/${params.id}`)
      engine = data
    }
    return { engine }
  },
}
</script>

<style scoped>

</style>
