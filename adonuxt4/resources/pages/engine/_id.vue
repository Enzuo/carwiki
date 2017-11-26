<template>
  <div>
    {{message}} {{$route.params.id}} {{ engine }}
    <engine-graph
      :engines="[engine]"
    ></engine-graph>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import EngineGraph from '~/components/EngineGraph'
// import Chart from 'vue-charts/src/components/chart'


export default {
  props: ['id','params'],
  validate : ({params}) => {
      console.log('validate params', params)
      return /^\d+$/.test(params.id) || !params.id
  },
  components : {
    EngineGraph,
  },
  async asyncData ({ params }) {
    let engine = null
    if(params.id){
      let { data } = await axios.get(`engine/${params.id}`)
      engine = data
    }
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
