<template>
  <div>
    <v-container fluid>
      <v-layout row>
        <v-flex xs6 order-lg2>
          <engine-edit :engine="engine"/>
        </v-flex>
        <v-flex xs6>
          <engine-graph
            :engines="[engine]"
          ></engine-graph>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import EngineGraph from '~/components/EngineGraph'
import EngineEdit from '~/components/EngineEdit'


export default {
  validate : ({params}) => {
    return /^\d+$/.test(params.id) || !params.id
  },
  components : {
    EngineGraph,
    EngineEdit
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
