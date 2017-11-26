<template>
  <div>
    <search-select
      @select="selectEngine"
    >
    </search-select>
    {{message}} {{$route.params.id}} {{ engine }}
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import SearchSelect from '~/components/SearchSelect'


export default {
  props: ['id','params'],
  validate : ({params}) => {
      console.log('validate params', params)
      return /^\d+$/.test(params.id) || !params.id
  },
  components : {
    SearchSelect
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
  methods : {
    selectEngine (id) {
      console.log('route re push ', id)
      this.$router.push({ path: `/engine/${id}`})
    }
  }
}
</script>

<style scoped>

</style>
