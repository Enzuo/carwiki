<template>
  <div>
    {{message}} {{$route.params.id}} {{ engine }}
    <div v-if="engine">
      <engine-graph
        :engines="[engine]"
      ></engine-graph>

      {{ editUrl = '/edit/engine/'+engine.id }}
      <v-btn
        color="blue"
        dark
        fab
        fixed
        bottom
        right
        :to="editUrl"
      >
        <v-icon>edit</v-icon>
      </v-btn>

    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import EngineGraph from '~/components/EngineGraph'
// import Chart from 'vue-charts/src/components/chart'


export default {
  props: ['id','params'],
  validate : ({params}) => {
    return /^\d+$/.test(params.id) || !params.id
  },
  components : {
    EngineGraph,
  },
  async asyncData ({ params, store }) {
    let engine = null
    if(params.id){
      let { data } = await axios.get(`engine/${params.id}`)
      engine = data
    }
    store.commit('setCurrentEngine', params.id)
    return { engine }
  },
  data : () => {
    return {
      message : 'hello engine'
    }
  },
}
</script>

<style scoped>

</style>
