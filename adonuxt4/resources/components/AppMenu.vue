<template>
  <v-navigation-drawer permanent fixed app light :mini-variant.sync="mini">
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.native.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <v-list-tile v-for="item in items" :key="item.title" nuxt :to="item.link" >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.title }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <car-basket :cars="carBasket"></car-basket>
    </v-list>
    </v-navigation-drawer>
</template>

<script>
import CarBasket from '~/components/CarBasket'
import { mapState } from 'vuex'

export default {
  name : 'app-menu',
  components : {
    CarBasket
  },
  data : () => {
    return {
      mini: true,
      right: null
    }
  },
  computed : {
    items () {
      return [
        { title: 'Car', icon: 'directions_car', link : '/car'+this.$store.getters.currentCarUrl },
        { title: 'Engine', icon: 'power', link : '/engine'+this.$store.getters.currentEngineUrl },
        { title: 'Compare', icon: 'compare_arrows', link : '/compare'+this.$store.getters.basketUrl },
        { title: 'About', icon: 'question_answer', link : '/about' }
      ];
    },
    ...mapState([
      'carBasket'
    ])
  },
}
</script>

<style scoped>

</style>
