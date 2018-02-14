<template>
  <div>
    <h1>Editing</h1>
    <car-view :car.sync="car" edit></car-view>
    <action-buttons :actions="actions"></action-buttons>
  </div>
</template>

<script>
import CarView from '~/components/CarView'
import ActionButtons from '~/components/ActionButtons'

export default {
  middleware : 'auth',
  validate : ({params, store}) => {
    return /^\d+$/.test(params.id) || !params.id
  },
  components : {
    CarView,
    ActionButtons
  },
  data () {
    return {
      shouldSave : false,
      isSaving : false,
    }
  },
  async asyncData ({ params, store, app, query }) {
    let car = {name : query.name, gearRatio : []}
    if(params.id){
      let { data } = await app.$axios.get(`cars/${params.id}`)
      car = data
    }
    store.commit('setCurrentCar', params.id)
    return { car }
  },
  computed : {
    actions : function () {
      return [
        {icon : 'save', click : this.save, disabled : !this.shouldSave, loading : this.isSaving }
      ]
    }
  },
  watch: {
    car: {
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
      if(this.car.id){
        await this.$axios.$put(`cars/${this.car.id}`,this.car)
      }
      else {
        this.car = await this.$axios.$post(`cars`,this.car)
        this.$store.commit('setCurrentCar', this.car.id)
      }
      this.isSaving = false
      this.shouldSave = false
    }
  },
  head () {
    return {
      title: `edit ${this.car.name}`,
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
