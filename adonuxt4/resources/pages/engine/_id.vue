<template>
  <div>
    {{message}} {{$route.params.id}} {{ engine }}
  </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  props: ['id','params'],
  validate : ({params}) => {
      console.log('validate params', params)
      return /^\d+$/.test(params.id) || !params.id
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
