<template>
  <v-list>
    <template v-for="car in cars">
      <v-list-tile v-bind:key="car.id">
        <v-list-tile-action>
          <v-icon :style="{ color: car.color }">directions_car</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-html="car.name"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon color="pink">remove</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
  export default {
    name : 'car-basket',
    props : ['cars'],
  }
</script>

<style scoped>

</style>
