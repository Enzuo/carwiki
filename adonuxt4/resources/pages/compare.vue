<template>
  <div>
    <div v-for="car in cars" :key="car.id">
      {{ car.name }}
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ params, store, query }) {
    console.log(params, query);
    if(query && query.cars){
      let cars = JSON.parse(query.cars)

      let actions = []
      cars.forEach((carId) => {
        actions.push(store.dispatch('addToBasket', carId))
      })
      await Promise.all(actions)
      console.log('all cars', cars)
    }
    let cars = store.getters.carsInBasket
    return { cars }
  }
}
</script>

<style scoped>

</style>
