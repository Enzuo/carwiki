<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex sm12 md6>
        <engine-edit :engine.sync="engine"/>
      </v-flex>
      <v-flex sm12 md6>
        <engine-graph
          :engines="[engine]"
        ></engine-graph>
      </v-flex>
    </v-layout>
    <v-btn
      color="blue"
      :loading="isSaving"
      dark fab fixed bottom right
      :disabled="!shouldSave"
      @click="save"
    >
      <v-icon>save</v-icon>
    </v-btn>
  </v-container>
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
  data () {
    return {
      shouldSave : false,
      isSaving : false,
    }
  },
  async asyncData ({ params, store }) {
    let engine = null
    if(params.id){
      let { data } = await axios.get(`engines/${params.id}`)
      engine = data
    }
    return { engine }
  },
  watch: {
    engine: {
      handler : function () {
        if(this.shouldSave !== true){
          this.shouldSave = true
        }
      },
      deep: true
    },
  },
  methods: {
    async save () {
      console.log('save !')
      this.isSaving = true
      await axios.put(`engines/${this.engine.id}`,this.engine)
      this.isSaving = false
    }
  }
}
</script>

<style scoped>

</style>
