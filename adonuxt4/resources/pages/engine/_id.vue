<template>
  <v-container page>
    <div v-if="engine">
      <h1>{{engine.name}}</h1>
      <engine-graph
        :engines="[engine]"
      ></engine-graph>

      <action-buttons :actions="actions"></action-buttons>
    </div>
  </v-container>
</template>

<script>
import axios from '~/plugins/axios'
import EngineGraph from '~/components/EngineGraph'
import ActionButtons from '~/components/ActionButtons'

export default {
  props: ['id','params'],
  validate : ({params}) => {
    return /^\d+$/.test(params.id) || !params.id
  },
  components : {
    EngineGraph,
    ActionButtons,
  },
  async asyncData ({ params, store }) {
    let engine = null
    if(params.id){
      let { data } = await axios.get(`engines/${params.id}`)
      engine = data
    }
    store.commit('setCurrentEngine', params.id)
    return { engine }
  },
  computed : {
    actions : function () {
      return [
        {icon : 'edit', to : '/edit/engine/'+(this.engine ? this.engine.id : null), disabled : !this.$store.state.authUser},
      ]
    }
  }
}
</script>

<style scoped>

</style>
