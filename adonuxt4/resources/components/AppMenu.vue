<template>
  <v-navigation-drawer fixed app light v-model="drawer" mobile-break-point="1264" :mini-variant="mini">
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar to="/profile">
          <v-list-tile-avatar>
            <v-icon v-if="!authUser">account_circle</v-icon>
            <img v-if="authUser" :src="authUser.avatar" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-if="authUser">{{authUser.full_name}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon >
              <v-icon>chevron_right</v-icon>
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
  props : ['value'],
  data : () => {
    return {
      mini: true,
      drawer: true,
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
      'authUser',
      'carBasket'
    ]),
  },
  watch : {
    value : function (val) {
      if(this.$vuetify.breakpoint.width >= 1264 ){
        if(val){
          this.mini = false
        }
        else {
          this.mini = true
        }
        this.drawer = true
      }
      else {
        this.mini = false
        this.drawer = val
      }
    }
  }
}
</script>

<style scoped>

</style>
